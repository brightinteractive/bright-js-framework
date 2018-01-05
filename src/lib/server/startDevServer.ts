import * as webpack from 'webpack'
import * as devserver from 'webpack-dev-middleware'
import * as hot from 'webpack-hot-middleware'
import hotServer  = require('webpack-hot-server-middleware')
import * as express from 'express'
import errorOverlay = require('react-dev-utils/errorOverlayMiddleware')
import { pick } from 'lodash'
import { getWebpackConfig } from '../bundler/getWebpackConfig'
import { renderHtmlWrapper } from './renderHtmlWrapper'
import { PluginConstructor } from '../core/PluginConfig'
import { Config } from './Config'
import { getEntrypointFiles } from './setup'

export interface DevServerOpts {
  port: number
  plugins: Record<string, PluginConstructor>
  config: Config
}

export async function startDevserver({ port, plugins, config }: DevServerOpts) {
  const webpackConfig = getWebpackConfig({
    pages: getEntrypointFiles(),
    plugins,
    devServer: true
  })

  const bundler = webpack(webpackConfig)
  const app = express()

  const clientBundler = (bundler as any).compilers.find((compiler: webpack.Compiler) =>
    compiler.name === 'client'
  )

  app.use(hot(clientBundler, { path: '/_hot' }))
  app.get('*', devserver(bundler, { noInfo: true, publicPath: '/' }))
  app.use(hotServer(bundler))
  app.use(errorOverlay())

  app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(renderHtmlWrapper({ config: getFrontendEnvironment(), devserver: true }))
    res.end()
  })

  const server = app.listen(port, () => {
    const address = `http://localhost:${server.address().port}`
    process.stderr.write(`Development server started on ${address}\n`)
  })

  function getFrontendEnvironment(): NodeJS.ProcessEnv {
    return pick(process.env, config.frontendEnvironment)
  }
}
