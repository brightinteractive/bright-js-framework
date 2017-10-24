import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { App } from '../core/App'
import { RequireList } from '../bundler/entrypointLoader'
import { getBundleRoutes } from './getBundleRoutes'

// Configuration passed from server in ‘magic’ variable
declare const ___process_env_config: NodeJS.ProcessEnv

/**
 * Client entrypoint.
 *
 * Performs initial client app setup and launches the app.
 */
export default function clientEntry(topLevelModules: RequireList) {
  restoreProcessEnv()
  renderApplication()

  function restoreProcessEnv() {
    process.env = ___process_env_config
  }

  function renderApplication() {
    ReactDOM.render(
      <App
        routes={getBundleRoutes(topLevelModules)}
        history={createBrowserHistory()}
      />,
      document.getElementById('app')
    )
  }
}
