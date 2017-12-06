import { Reducer } from 'redux'
import { flatMap } from 'lodash'
import { PluginConstructor } from './PluginConfig'

const DECLARED_REDUCER_KEYS = '__luminant__declaredReducerKeys'

/** Decorate a static function of a plugin as a reducer */
export function declareReducer(id: string): PropertyDecorator
export function declareReducer(id: string) {
  return (constructor: any, key: string) => {
    if (typeof constructor[key] !== 'function') {
      throw new Error(`Expected reducer declaration ${constructor.name}.${key} to be a function`)
    }

    constructor[DECLARED_REDUCER_KEYS] = constructor[DECLARED_REDUCER_KEYS] || {}
    constructor[DECLARED_REDUCER_KEYS][id] = constructor[key]
  }
}

/** Get reducer map from a list of plugins */
export function getDeclaredReducers(plugins: PluginConstructor[]): Record<string, Reducer<any>> {
  return Object.assign({}, ...flatMap(plugins, getPluginDeclaredReducers))
}

/** Get reducer map exported by a plugin */
function getPluginDeclaredReducers(constructor: PluginConstructor[]): Record<string, Reducer<any>>
function getPluginDeclaredReducers(constructor: any) {
  return constructor[DECLARED_REDUCER_KEYS] || {}
}
