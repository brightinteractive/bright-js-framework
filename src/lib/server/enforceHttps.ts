import * as express from 'express'

export const enforceCustomerFacingHttps: express.RequestHandler = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, ['https://', req.get('Host'), req.url].join(''))
  }
  return next()
}
