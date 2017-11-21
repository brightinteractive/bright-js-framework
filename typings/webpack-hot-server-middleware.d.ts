declare module 'webpack-hot-server-middleware' {
  import { NextHandleFunction } from 'connect'
  import { MultiCompiler } from 'webpack'

  function WebpackHotMiddleware(compiler: MultiCompiler): NextHandleFunction

  export = WebpackHotMiddleware
}
