import * as Redux from 'redux'
import { flatMap, assign } from 'lodash'
import { Service } from './Service'

export class Plugin extends Service {
  injectedObjects: ContextFactoryMap = {}
  storeMiddlewares: Redux.Middleware[] = []
  storeReducers: Record<string, Redux.Reducer<any>> = {}
}

export type PluginConstructor = new () => Plugin
export type ContextFactoryMap<T = any> = Record<string, () => T>
export type ContextValueMap<T = any> = Record<string, T>

/**
 * Flatten an array of plugins into a single plugin
 */
export function combinePlugins(plugins: Plugin[]): Plugin {
  const combined = new Plugin()

  combined.injectedObjects = assign({}, ...plugins.map((plugin) => plugin.injectedObjects))
  combined.storeMiddlewares = flatMap(plugins, (plugin) => plugin.storeMiddlewares)
  combined.storeReducers = assign({}, ...plugins.map((plugin) => plugin.storeReducers))

  return combined
}
