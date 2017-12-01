import * as glob from 'glob'
import * as path from 'path'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloCache } from 'apollo-cache'
import { ApolloClient } from 'apollo-client'
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import { GraphQLFieldResolver, DocumentNode } from 'graphql'
import { exportDependency, PluginConstructor } from '../../core/PluginConfig'
import { getEntrypointExports, RequireList } from '../../bundler/Entrypoint'
import { GraphQLServer } from '../GraphQLServerPlugin/GraphQLServer'
import { LocalLink } from '../GraphQLPlugin/LocalLink'
import GraphQLPluginBase from '../GraphQLPlugin/GraphQLPlugin.common'
import { findGraphQLSources } from '../GraphQLServerPlugin/loadSchema'
import { isGraphQLType } from '../GraphQLServerPlugin/Resolver'

export interface GraphQlPluginProps {
  schema?: DocumentNode | string
  mocks?: GraphQlMocks
}

export type GraphQlMocks = Record<string, (id: string, params: any) => GraphQlMockType>
export type GraphQlMockType = Record<string, string | number | undefined | null | GraphQLFieldResolver<string, any>>

export function graphQlTestPlugin({ schema, mocks }: GraphQlPluginProps): PluginConstructor {
  const executableSchema = (
    schema
    ? makeExecutableSchema({ typeDefs: schema })
    : getApplicationSchema()
  )

  if (mocks && executableSchema) {
    addMockFunctionsToSchema({
      mocks,
      schema: executableSchema,
      preserveResolvers: true
    })
  }

  class GraphQLTestPlugin extends GraphQLPluginBase {
    @exportDependency(ApolloClient)
    client = executableSchema && new ApolloClient({
      cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>,
      link: new LocalLink(executableSchema, {}, {}),
    })
  }

  return GraphQLTestPlugin
}

function getApplicationSchema() {
  const { schemas } = findGraphQLSources({ glob: glob.sync, resolvePath: (pathname) => path.resolve(pathname) })
  const server = new GraphQLServer({
    connectors: [],
    schema: schemas.map(({ typeDefs, resolvers }) => ({
      typeDefs: require(typeDefs),
      resolvers: getEntrypointExports(createRequireList(resolvers), isGraphQLType)
    })),
  })

  return server.schema
}

export function createRequireList(paths: string[]): RequireList {
  return paths.map((pathname) => () => require(pathname))
}
