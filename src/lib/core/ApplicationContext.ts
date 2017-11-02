import * as Redux from 'redux'
import { identity, constant, mapValues, memoize, isEmpty } from 'lodash'
import { PluginConstructor, Plugin, combinePlugins, ContextValueMap, ContextFactoryMap } from './Plugin'

export class ApplicationContext {
  readonly store: Redux.Store<any>
  readonly injectedObjects: ContextValueMap

  constructor(pluginConstructors: PluginConstructor[] = []) {
    const plugins = pluginConstructors.map((Constructor) => new Constructor())
    const plugin = combinePlugins(plugins)

    this.injectedObjects = createContextValueMap(plugin.injectedObjects)
    this.store = createStoreInstance(plugin)
  }
}

/**
 * Given a map of factory functions for injected objects, return an object mapping keys
 * to lazily constructed objects suitable for passing down the React context tree to
 * controllers and services.
 *
 * Specifying dependencies as memoized factory functions rather than raw objects is important,
 * as it allows plugins to depend on other plugins for dependencies.
 */
export function createContextValueMap(factories: ContextFactoryMap): ContextValueMap {
  return Object.defineProperties({}, mapValues(factories, (factory) => ({
    get: memoize(factory)
  })))
}

export function createStoreInstance(plugin: Plugin) {
  const reducer = isEmpty(plugin.storeReducers) ? constant({}) : Redux.combineReducers(plugin.storeReducers)
  const middleware = Redux.applyMiddleware(...plugin.storeMiddlewares)

  return Redux.createStore(reducer, Redux.compose(middleware, getDevtools()))
}

/**
 * Return redux devtools if the chrome extension is installed and we aren't
 * running in production
 */
function getDevtools() {
  if (process.env.NODE_ENV === 'production') {
    return identity
  }

  return (
    typeof __REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? __REDUX_DEVTOOLS_EXTENSION__()
    : identity
  )
}

declare const __REDUX_DEVTOOLS_EXTENSION__: (() => Redux.GenericStoreEnhancer) | undefined
