import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { memoize } from 'lodash'
import { createBrowserHistory } from 'history'
import { ApplicationContext } from '../core/ApplicationContext'
import { App } from '../core/App'
import { load } from '../core/load'
import { RequireList, EntryOpts } from '../bundler/Entrypoint'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin'
import { getBundleRoutes } from './getBundleRoutes'

// Configuration passed from server in ‘magic’ variable
declare const ___process_env_config: NodeJS.ProcessEnv

/**
 * Client entrypoint.
 *
 * Performs initial client app setup and launches the app.
 */
export default async function clientEntry(topLevelModules: RequireList, opts: EntryOpts) {
  /** Hydrate process.env from magic variable passed through from server */
  function restoreProcessEnv() {
    process.env = ___process_env_config
  }

  /** Construct plugin instances specified in config file */
  const getAppContext = memoize(() => {
    const pluginConfigs = opts.config() || []

    return new ApplicationContext([
      ...pluginConfigs,
      createBrowserPlugin({
        history: getHistory()
      })
    ])
  })

  /** Shared browser history instance */
  const getHistory = memoize(() => createBrowserHistory())

  /** Render the root app component */
  const renderApp = memoize(() => (
    <App
      routes={getBundleRoutes(topLevelModules)}
      history={getHistory()}
      appContext={getAppContext()}
    />
  ))

  /** Fetch data required for the first render before loading */
  function prefetchData() {
    return load(renderApp())
  }

  /** Start the application and render into DOM  */
  function run() {
    ReactDOM.render(renderApp(), document.getElementById('app'))
  }

  restoreProcessEnv()
  await prefetchData()
  run()
}
