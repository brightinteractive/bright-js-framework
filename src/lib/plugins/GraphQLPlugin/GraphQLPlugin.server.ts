import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import { RequestHandler } from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import * as bodyParser from 'body-parser'
import { decorateRequestHandler } from '../../core/PluginConfig'
import { loadModule } from '../../core/util'
import { GraphQLServer } from './server/GraphQLServer'
import GraphQLPluginBase from './GraphQLPlugin.common'

const server = new GraphQLServer({
  readFile: (filepath) => fs.readFileSync(filepath, 'utf8'),
  resolvePath: path.resolve,
  glob: glob.sync,
  loadModule,
  loadResolvers: true
})

const serverMiddleware = [
  bodyParser.json()
]

export default function graphQlPlugin() {
  return GraphQLPluginServer
}

export class GraphQLPluginServer extends GraphQLPluginBase {
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
