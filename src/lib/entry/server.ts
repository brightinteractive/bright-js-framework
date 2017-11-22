import 'ts-node/register'
import 'colors'
import * as express from 'express'
import { Express } from 'express-serve-static-core'
import { getRequestHandlers } from '../core/PluginConfig'
import { EntryOpts, RequireList } from '../bundler/Entrypoint'

export default function serverEntry(topLevelModules: RequireList, opts: EntryOpts): (require: NodeRequire) => Express {
  return function serverRenderer({ nodeRequire }: any) {
    const app = express()

    // [HACK] Set require as a global so that plugins have access to it
    // To be replaced with convention for allowing plugins to specify their source dependencies
    // directly to webpack
    const g = global as any
    g.__require = nodeRequire

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

    return app
  }
}
