import { Reducer } from 'redux'
import { flatMap } from 'lodash'
import { PluginConstructor } from './PluginConfig'

const DECLARED_REDUCER_KEYS = Symbol('declaredReducerKeys')

/** Decorate a static function of a plugin as a reducer */
export function declareReducer(id: string): ReducerDecorator
export function declareReducer(id: string) {
  return (ctor: any, key: string) => {
    if (typeof ctor[key] !== 'function') {
      throw new Error(`Expected reducer declaration ${ctor.name}.${key} to be a function`)
    }

    ctor[DECLARED_REDUCER_KEYS] = ctor[DECLARED_REDUCER_KEYS] || {}
    ctor[DECLARED_REDUCER_KEYS][id] = ctor[key]
  }
}

/** Get reducer map from a list of plugins */
export function getDeclaredReducers(plugins: PluginConstructor[]): Record<string, Reducer<any>> {
  return Object.assign({}, ...flatMap(plugins, getPluginDeclaredReducers))
}

/** Get reducer map exported by a plugin */
function getPluginDeclaredReducers(ctor: PluginConstructor[]): Record<string, Reducer<any>>
function getPluginDeclaredReducers(ctor: any) {
  return ctor[DECLARED_REDUCER_KEYS] || {}
}

export type ReducerDecorator = (proto: PluginConstructor, key: string) => any
