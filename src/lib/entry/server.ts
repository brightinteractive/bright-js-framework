import 'ts-node/register'
import 'colors'
import * as express from 'express'
import { Express } from 'express-serve-static-core'
import { getRequestHandlers } from '../core/PluginConfig'
import { RequireList } from '../bundler/Entrypoint'

export default function serverEntry(opts: { plugins: RequireList }): (require: NodeRequire) => Express {
  return function serverRenderer() {
    const app = express()
    const pluginConfigs = opts.plugins.map((loadPlugin) => loadPlugin())

    getRequestHandlers(pluginConfigs).forEach((requestHandlerConfig) => {
      if (requestHandlerConfig.method) {
        if (!requestHandlerConfig.path) {
          throw new Error(`${requestHandlerConfig.method} request handler must have a path associated`)
        }

        app[requestHandlerConfig.method](requestHandlerConfig.path, ...requestHandlerConfig.handlers)

      } else {
        app.use(requestHandlerConfig.path || '/', ...requestHandlerConfig.handlers)
      }
    })

    return app
  }
}
