import { GraphQLSchema, GraphQLFieldResolver } from 'graphql'
import * as path from 'path'
import { flatMap, filter, fromPairs } from 'lodash'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'
import { GraphQLOptions } from 'apollo-server-core'
import { ApplicationContext } from '../../../core/ApplicationContext'
import { getResolverTypename, getResolverProperties, ResolverConstructor, isTypeResolver } from './Resolver'
import { ConnectorConstructor, Connector } from './Connector'

export interface GraphQLServerProps {
  loadModule: (moduleName: string) => any
  readFile: (path: string) => string
  resolvePath: (path: string) => any
  glob: (pattern: string) => string[]
}

export class GraphQLServer implements GraphQLServerProps {
  readonly schema: GraphQLSchema | undefined
  readonly connectors: ConnectorConstructor[]

  loadModule: (moduleName: string) => any
  readFile: (path: string) => string
  resolvePath: (path: string) => any
  glob: (pattern: string) => string[]

  constructor(props: GraphQLServerProps) {
    Object.assign(this, props)

    this.schema = this.createSchema()
    this.connectors = this.loadConnectors()
  }

  /**
   * Return an apollo-server request config function that sets up the context and resolvers
   * for handling an incoming GraphQL request.
   */
  get requestConfig() {
    const { schema, connectors } = this
    if (!schema) {
      return undefined
    }

    return (): GraphQLOptions => {
      const appContext = new ApplicationContext()
      const context = {
        '@appContext': appContext
      }

      connectors.forEach((ConnectorType) => {
        appContext.injectObject(ConnectorType, new ConnectorType(context))
      })

      return {
        schema,
        context
      }
    }
  }

  /**
   * Find all GraphQL schemas in the current project, generate an executable schema for each
   * of them, then merge the schemas together to produce the application schema.
   */
  private createSchema(): GraphQLSchema | undefined {
    const schemaFiles = this.findSchemas()
    const sourceSchemas = flatMap(schemaFiles, (file) => {
      const schemaModule = this.createSchemaModule(file)
      return schemaModule ? [schemaModule] : []
    })

    if (sourceSchemas.length === 0) {
      return undefined
    }

    return mergeSchemas({
      schemas: sourceSchemas,
    })
  }

  /**
   * Given a path to a GraphQL schema, create an executable GraphQL schema by combining it
   * with Resolvers exported from source files in the same directory (or child directories).
   */
  private createSchemaModule(schemaPath: string): GraphQLSchema | undefined {
    const resolverTypes = this.loadResolversForSchema(schemaPath)
    if (resolverTypes.length === 0) {
      return undefined
    }

    const resolvers = this.createFieldResolversForTypes(resolverTypes)

    return makeExecutableSchema({
      resolvers,
      typeDefs: this.readFile(schemaPath)
    })
  }

  /**
   * Given a list of Resolver classes, return a map of shape `{ type: { property: resolverFn } }`
   * suitable for generating an executable GraphQL schema for each type and property declared
   * using the Resolver decorator API.
   */
  private createFieldResolversForTypes(resolverTypes: ResolverConstructor[]): Record<string, Record<string, GraphQLFieldResolver<string, any>>> {
    return fromPairs(resolverTypes.map((ResolverClass) => {
      const resolveFnMap = fromPairs(Array.from(getResolverProperties(ResolverClass)).map((key) => [key, this.createFieldResolver(ResolverClass, key)]))

      return [getResolverTypename(ResolverClass), resolveFnMap]
    }))
  }

  /**
   * Given a Resolver class and a property name, return a GraphQL field resolver function that
   * resolves the property identified by `propertyName`
   */
  private createFieldResolver(ResolverClass: ResolverConstructor, propertyName: string): GraphQLFieldResolver<string, any> {
    return (id, params, context) => {
      const resolver = new ResolverClass(context, id) as any
      return resolver[propertyName](params)
    }
  }

  /** Looks up schema files from conventional location */
  private findSchemas() {
    return this.glob('src/graphql/schema/**/*.graphql')
  }

  /**
   * For a given schema filepath, extract all Resolver classes associated with a type from
   * typescript files in the same directory (or any subdirectories)
   */
  private loadResolversForSchema(schemaPath: string) {
    const modulePaths = this.glob(`${path.dirname(schemaPath)}/**/*.ts`)
    const modules = modulePaths.map((modulePath) => this.loadModule(this.resolvePath(modulePath)))

    return flatMap(modules, (moduleExports) => filter(moduleExports, isTypeResolver)) as ResolverConstructor[]
  }

  /**
   * For a given schema filepath, extract all Connector classes from typescript files in the
   * same directory (or any subdirectories)
   */
  private loadConnectors() {
    const modulePaths = this.glob('src/graphql/connectors/**/*.ts')
    const modules = modulePaths.map((modulePath) => this.loadModule(this.resolvePath(modulePath)))

    return flatMap(modules, (moduleExports) => filter(moduleExports, (moduleExport: any) => moduleExport.prototype instanceof Connector)) as ConnectorConstructor[]
  }
}
