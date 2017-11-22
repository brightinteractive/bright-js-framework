declare module 'webpack-hot-server-middleware' {
  import { NextHandleFunction } from 'connect'
  import { MultiCompiler } from 'webpack'

  interface HotMiddlewareOpts {
    serverRendererOptions: {}
  }

  function WebpackHotMiddleware(compiler: MultiCompiler, opts?: HotMiddlewareOpts): NextHandleFunction

  export = WebpackHotMiddleware
}
