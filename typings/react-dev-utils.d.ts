declare module 'react-dev-utils/errorOverlayMiddleware' {
  import { RequestHandler } from 'express'
  function middleware(): RequestHandler

  export = middleware
}
