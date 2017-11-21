import { getRequestHandlers } from '../core/PluginConfig'
import { EntryOpts, RequireList } from '../bundler/Entrypoint'
import * as express from 'express'
import { Express } from 'express-serve-static-core'

export default function serverEntry(topLevelModules: RequireList, opts: EntryOpts): () => Express {
  const app = express()

  getRequestHandlers(opts.config()).forEach((requestHandlerConfig) => {
    if (requestHandlerConfig.method) {
      if (!requestHandlerConfig.path) {
        throw new Error(`${requestHandlerConfig.method} request handler must have a path associated`)
      }

      app[requestHandlerConfig.method](requestHandlerConfig.path, ...requestHandlerConfig.handlers)

    } else {
      app.use(requestHandlerConfig.path || '/', ...requestHandlerConfig.handlers)
    }
  })

  return function serverRenderer() {
    return app
  }
}
