import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloCache } from 'apollo-cache'
import { ApolloClient } from 'apollo-client'
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools'
import { GraphQLFieldResolver, DocumentNode } from 'graphql'
import { exportDependency, PluginConstructor } from '../../core/PluginConfig'
import { GraphQLServer } from './server/GraphQLServer'
import { LocalLink } from './client/LocalLink'
import GraphQLPluginBase from './GraphQLPlugin.common'

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
  const server = new GraphQLServer({
    loadResolvers: false,
    readFile: (filepath) => fs.readFileSync(filepath, 'utf8'),
    resolvePath: path.resolve,
    glob: glob.sync,
    loadModule: require
  })

  return server.schema
}
