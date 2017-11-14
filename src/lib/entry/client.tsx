import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { App } from '../core/App'
import { RequireList, EntryOpts } from '../bundler/Entrypoint'
import { getBundleRoutes } from './getBundleRoutes'
import { ApplicationContext } from '../core/ApplicationContext'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin';

// Configuration passed from server in ‘magic’ variable
declare const ___process_env_config: NodeJS.ProcessEnv

/**
 * Client entrypoint.
 *
 * Performs initial client app setup and launches the app.
 */
export default function clientEntry(topLevelModules: RequireList, opts: EntryOpts) {
  const history = createBrowserHistory()

  restoreProcessEnv()
  renderApplication()

  /** Hydrate process.env from magic variable passed through from server */
  function restoreProcessEnv() {
    process.env = ___process_env_config
  }

  /** Construct plugin instances specified in config file */
  function getAppContext() {
    const pluginConfigs = opts.config() || []

    return new ApplicationContext([
      ...pluginConfigs,
      createBrowserPlugin({
        history
      })
    ])
  }

  /** Start the application and render into DOM  */
  function renderApplication() {
    ReactDOM.render(
      <App
        routes={getBundleRoutes(topLevelModules)}
        history={history}
        appContext={getAppContext()}
      />,
      document.getElementById('app')
    )
  }
}
