import * as React from 'react'
import * as serializeJs from 'serialize-javascript'
import { renderToStaticMarkup } from 'react-dom/server'

export interface RenderHtmlWrapperOpts {
  config: NodeJS.ProcessEnv
}

export function renderHtmlWrapper({ config }: RenderHtmlWrapperOpts) {
  const configScript = `___process_env_config=${serializeJs(config, { isJSON: true })}`

  return '<!doctype html>' + renderToStaticMarkup(
    <html lang="en">
      <head>
        <meta charSet="utf8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: configScript }} />
        <script defer src="/bundle.js" />
      </head>
      <body>
        <div id="app" />
      </body>
    </html>
  )
}
