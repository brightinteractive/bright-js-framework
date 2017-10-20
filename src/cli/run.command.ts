import * as yargs from 'yargs'
import * as webpack from 'webpack'
import * as devserver from 'webpack-dev-middleware'
import * as hot from 'webpack-hot-middleware'
import * as express from 'express'
import * as path from 'path'
import * as glob from 'glob'
import { getWebpackConfig } from '../lib/bundler/getWebpackConfig'
import { renderHtmlWrapper } from '../lib/server/renderHtmlWrapper'

interface RunCommandOpts {
  entry: string
  port: number
}

export const runCommand: yargs.CommandModule = {
  command: 'run',

  builder: {
    entry: {
      alias: 'e',
      type: 'string',
      description: 'Path pattern to load pages from',
      default: './src/pages/**/*.tsx',
    },
    port: {
      alias: 'port',
      type: 'number',
      description: 'Port to start server on',
      default: Number(process.env.PORT || 8000),
    },
  },

  handler({ entry, port }: RunCommandOpts) {
    const entrypoints = glob.sync(entry).map((subpath) => path.resolve(subpath))
    const webpackConfig = getWebpackConfig({
      entrypoints,
    })

    const bundler = webpack(webpackConfig)
    const app = express()

    app.use(hot(bundler))
    app.use(devserver(bundler))

    app.get('*', (req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(renderHtmlWrapper())
      res.end()
    })

    app.listen(port)
  }
}
