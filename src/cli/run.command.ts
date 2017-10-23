import * as yargs from 'yargs'
import * as webpack from 'webpack'
import * as devserver from 'webpack-dev-middleware'
import * as hot from 'webpack-hot-middleware'
import * as express from 'express'
import * as path from 'path'
import * as glob from 'glob'
import * as dotenv from 'dotenv'
import { pick } from 'lodash'
import { getWebpackConfig } from '../lib/bundler/getWebpackConfig'
import { renderHtmlWrapper } from '../lib/server/renderHtmlWrapper'
import { getConfig } from './getConfig'

const ENTRY_PATTERN = 'src/pages/**/*.@(t|j)s?(x)'

interface RunCommandOpts {
  entry: string
  port: number
}

export const runCommand: yargs.CommandModule = {
  command: 'run',

  builder: {
    port: {
      alias: 'port',
      type: 'number',
      description: 'Port to start server on',
      default: Number(process.env.PORT || 8000),
    },
  },

  handler({ port }: RunCommandOpts) {
    // Load config
    const appConfig = getConfig()

    // Load development environment
    dotenv.config()
    const frontendEnvironment: NodeJS.ProcessEnv = pick(process.env, appConfig.frontendEnvironment)

    // Get development webpack config starting from the entry files
    const entrypoints = glob.sync(ENTRY_PATTERN).map((subpath) => path.resolve(subpath))
    const webpackConfig = getWebpackConfig({
      entrypoints,
    })

    // Start server
    const bundler = webpack(webpackConfig)
    const app = express()

    // Add development middleware
    app.use(hot(bundler))
    app.use(devserver(bundler))

    app.get('*', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(renderHtmlWrapper({ config: frontendEnvironment }))
      res.end()
    })

    const server = app.listen(port, () => {
      const address = `http://localhost:${server.address().port}`
      process.stderr.write(`Development server started on ${address}\n`)
    })
  }
}
