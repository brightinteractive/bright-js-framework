import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {memoize} from 'lodash'
import {createBrowserHistory} from 'history'
import {ApplicationContext} from '../core/ApplicationContext'
import {App} from '../core/App'
import {load} from '../core/load'
import {getEntrypointDefaultExports, getEntrypointExports, isSubclassOf, RequireList} from '../bundler/Entrypoint'
import {createBrowserPlugin} from '../plugins/BrowserPlugin/BrowserPlugin'
import {PluginConfig} from '../core/PluginConfig'
import {getRouteComponentPath, isRouteComponent} from '../core/route'
import {RouteConfig} from '../core/Router'

// Configuration passed from server in ‘magic’ variable
declare const ___process_env_config: NodeJS.ProcessEnv

/**
 * Client entrypoint.
 *
 * Performs initial client app setup and launches the app.
 */
export default async function clientEntry(modules: { pages: RequireList, plugins: RequireList }) {
  /** Hydrate process.env from magic variable passed through from server */
  function restoreProcessEnv() {
    process.env = ___process_env_config
  }

  /** Construct plugin instances specified in config file */
  const getAppContext = memoize(() => {
    const pluginConfigs = getEntrypointDefaultExports(modules.plugins, isSubclassOf(PluginConfig))

    return new ApplicationContext([
      ...pluginConfigs,
      createBrowserPlugin({
        history: getHistory(),
        hostInfo: window.location
      })
    ])
  })

  /** Shared browser history instance */
  const getHistory = memoize(() => createBrowserHistory())

  /** Render the root app component */
  const renderApp = memoize(() => (
    <App
      routes={getRoutes()}
      history={getHistory()}
      appContext={getAppContext()}
    />
  ))

  /** Get bundled routes and return configuration array for the router */
  function getRoutes(): RouteConfig[] {
    const routeComponents = getEntrypointExports(modules.pages, isRouteComponent)

    return routeComponents.map((Component) => ({
      handler: Component,
      path: getRouteComponentPath(Component)
    }))
  }

  restoreProcessEnv()

  getAppContext().applicationWillMount()
  await getAppContext().applicationWillLoad()
  await load(renderApp())

  ReactDOM.render(renderApp(), document.getElementById('app'))

  getAppContext().applicationDidMount()
}
