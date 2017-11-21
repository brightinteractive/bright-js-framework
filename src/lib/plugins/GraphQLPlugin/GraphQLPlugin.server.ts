import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'fs'
import { RequestHandler } from 'express'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import * as bodyParser from 'body-parser'
import { PluginConfig, decorateRequestHandler } from '../../core/PluginConfig'
import { GraphQLServer } from './server/GraphQLServer'

const server = new GraphQLServer({
  readFile: (filepath) => fs.readFileSync(filepath, 'utf8'),
  resolvePath: path.resolve,
  glob: glob.sync,
  loadModule: module.require
})

const serverMiddleware = [
  bodyParser.json({ limit: 50 })
]

export default class GraphQLPlugin extends PluginConfig {
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
