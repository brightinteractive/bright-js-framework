import * as webpack from 'webpack'
import * as devserver from 'webpack-dev-middleware'
import * as hot from 'webpack-hot-middleware'
import hotServer  = require('webpack-hot-server-middleware')
import * as express from 'express'
import * as path from 'path'
import * as glob from 'glob'
import * as dotenv from 'dotenv'
import errorOverlay = require('react-dev-utils/errorOverlayMiddleware')
import { pick } from 'lodash'
import { getWebpackConfig } from '../../lib/bundler/getWebpackConfig'
import { renderHtmlWrapper } from '../../lib/server/renderHtmlWrapper'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'

export interface RunCommandOpts {
  entry: string
  port: number
}

export const command = 'run'
export const builder = {
  port: {
    alias: 'p',
    type: 'number',
    description: 'Port to start server on',
    default: Number(process.env.PORT || 8000),
  },
}

export const enforceCustomerFacingHttps: express.RequestHandler = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''))
  }
  return next()
}

export function handler({ port }: RunCommandOpts) {
  const appConfig = getConfig()

  const isProduction = process.env.NODE_ENV === 'production'

  loadEnvironment()

  const webpackConfig = getWebpackConfig({
    pages: getEntrypointFiles(),
    plugins: {
      ...appConfig.plugins,
      ...getImplicitProjectPluginConfigurationsFromFilepaths(glob.sync(appConfig.projectPlugins))
    }
  })

  const bundler = webpack(webpackConfig)
  const app = express()

  const clientBundler = (bundler as any).compilers.find((compiler: webpack.Compiler) => compiler.name === 'client')

  if (isProduction) {
    app.use(enforceCustomerFacingHttps)
  }

  app.use(hot(clientBundler, { path: '/_hot' }))
  app.get('*', devserver(bundler, { noInfo: true, publicPath: '/' }))
  app.use(hotServer(bundler))
  app.use(errorOverlay())

  app.get('*', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(renderHtmlWrapper({ config: getFrontendEnvironment() }))
    res.end()
  })

  const server = app.listen(port, () => {
    const address = `http://localhost:${server.address().port}`
    process.stderr.write(`Development server started on ${address}\n`)
  })

  function getEntrypointFiles() {
    const filePattern = path.join('src', 'pages', '**', '*.@(t|j)s?(x)')
    return glob.sync(filePattern).map((subpath) => path.resolve(subpath))
  }

  function loadEnvironment() {
    dotenv.config()
  }

  function getFrontendEnvironment(): NodeJS.ProcessEnv {
    return pick(process.env, appConfig.frontendEnvironment)
  }
}
