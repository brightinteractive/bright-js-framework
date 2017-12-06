import { RequestHandler } from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import * as bodyParser from 'body-parser'
import { PluginConfig, decorateRequestHandler, PluginConstructor } from '../../core/PluginConfig'
import { RequireList, isSubclassOf, getEntrypointExports, RequireFn } from '../../bundler/Entrypoint'
import { Connector } from './Connector'
import { GraphQLServer } from './GraphQLServer'
import { isSchemaType } from './Resolver'

const serverMiddleware = [
  bodyParser.json()
]

export interface GraphQLPluginOpts {
  connectors: RequireList
  schemas: Array<{ typeDefs: RequireFn, resolvers: RequireList}>
}

export default function graphQLServerPluginEntry({ connectors, schemas }: GraphQLPluginOpts): PluginConstructor {
  const server = new GraphQLServer({
    connectors: getEntrypointExports(connectors, isSubclassOf(Connector)),
    schema: schemas.map(({ typeDefs, resolvers }) => ({
      typeDefs: typeDefs(),
      resolvers: getEntrypointExports(resolvers, isSchemaType)
    })),
  })

  class GraphQLServerPlugin extends PluginConfig {
    @decorateRequestHandler('/graphql', { method: 'POST', middleware: serverMiddleware })
    static handleGraphQLRequest?: RequestHandler = createServer()

    @decorateRequestHandler('/graphql-ui', { method: 'GET' })
    static handleGraphQLUIRequest?: RequestHandler = createUI()
  }

  function createServer() {
    return server.requestConfig && graphqlExpress(server.requestConfig)
  }

  function createUI() {
    if (process.env.NODE_ENV === 'production') {
      return undefined
    }

    return graphiqlExpress({
      endpointURL: '/graphql'
    })
  }

  return GraphQLServerPlugin
}
