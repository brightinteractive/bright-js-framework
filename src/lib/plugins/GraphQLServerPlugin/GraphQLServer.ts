import { GraphQLSchema, GraphQLFieldResolver, DocumentNode } from 'graphql'
import { flatMap, fromPairs } from 'lodash'
import { mergeSchemas, makeExecutableSchema } from 'graphql-tools'
import { GraphQLOptions } from 'apollo-server-core'
import { ApplicationContext } from '../../core/ApplicationContext'
import { getResolverTypename, getResolverProperties, ResolverConstructor, Resolver } from './Resolver'
import { ConnectorConstructor } from './Connector'
import { HttpClient } from './HttpClient'

export interface GraphQLServerProps {
  schema: Array<{ typeDefs: DocumentNode | string, resolvers: Array<typeof Resolver> }>
  connectors: ConnectorConstructor[]
}

export class GraphQLServer {
  private props: GraphQLServerProps
  readonly schema?: GraphQLSchema

  get connectors() {
    return this.props.connectors
  }

  constructor(props: GraphQLServerProps) {
    this.props = props
    this.schema = this.createSchema()
  }

  /**
   * Return an apollo-server request config function that sets up the context and resolvers
   * for handling an incoming GraphQL request.
   */
  get requestConfig() {
    const { schema, props: { connectors } } = this
    if (!schema) {
      return undefined
    }

    return (): GraphQLOptions => {
      const appContext = new ApplicationContext()
      const context = {
        '@appContext': appContext
      }

      appContext.injectObject(HttpClient, new HttpClient({ context }))
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
    const sourceSchemas = flatMap(this.props.schema, (config) => {
      const schemaModule = this.createSchemaModule(config)
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
  private createSchemaModule(config: { typeDefs: DocumentNode | string, resolvers: Array<typeof Resolver> }): GraphQLSchema | undefined {
    const resolverTypes = config.resolvers
    if (resolverTypes.length === 0) {
      return undefined
    }

    const resolvers = this.createFieldResolversForTypes(resolverTypes)

    return makeExecutableSchema({
      resolvers,
      typeDefs: config.typeDefs
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
}
