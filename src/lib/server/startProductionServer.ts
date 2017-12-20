import * as express from 'express'
import * as path from 'path'
import { pick } from 'lodash'
import { renderHtmlWrapper } from './renderHtmlWrapper'
import { Config } from './Config'
import { enforceCustomerFacingHttps } from './enforceHttps'

export interface DevServerOpts {
  port: number
  config: Config
}

export async function startProductionServer({ port, config }: DevServerOpts) {
  const app = express()
  const pluginMiddleware = require(path.resolve('build/server/bundle.js'))

  app.use(enforceCustomerFacingHttps)
  app.use(express.static('build/public'))
  app.use(pluginMiddleware())

  app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(renderHtmlWrapper({ config: getFrontendEnvironment() }))
    res.end()
  })

  const server = app.listen(port, () => {
    process.stderr.write(`Application started on port ${server.address().port}\n`)
  })

  function getFrontendEnvironment(): NodeJS.ProcessEnv {
    return pick(process.env, config.frontendEnvironment)
  }
}
