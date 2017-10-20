import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export function renderHtmlWrapper() {
  return '<!doctype html>' + renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="utf8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="/bundle.js" />
      </head>
      <body>
        <div id="app" />
      </body>
    </html>
  )
}
