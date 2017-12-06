import { identity, size } from 'lodash'
import { Store, createStore, combineReducers, GenericStoreEnhancer } from 'redux'
import { PluginConfig, exportDependency, PluginConstructor } from '../../core/PluginConfig'
import { injectDependency, InjectionContext } from '../../core/InjectionClient'
import { getDeclaredReducers } from '../../core/declareReducer'

const STORE = 'store'
const DISPATCH = 'dispatch'
declare const __REDUX_DEVTOOLS_EXTENSION__: (() => GenericStoreEnhancer) | undefined

export type Selector<T> = (x: any) => T

/**
 * Owns and provides access to the application's redux store.
 */
export function createStorePlugin(otherPlugins: PluginConstructor[]): PluginConstructor {
  const reducers = getDeclaredReducers(otherPlugins)

  class StorePlugin extends PluginConfig {
    /** Store instance exported for use by other services */
    @exportDependency(STORE)
    store?: Store<any> = (
      size(reducers) > 0
      ? createStore(
        combineReducers(getDeclaredReducers(otherPlugins)),
        getDevtools()
      )
      : undefined
    )

    /** Dispatch function exported for use by other services */
    @exportDependency(DISPATCH)
    dispatch = (action: any) => {
      if (this.store) {
        this.store.dispatch(action)
      }
    }
  }

  return StorePlugin
}

/** Get store from app context */
export function getStoreFromContext(ctx: InjectionContext): Store<any> {
  return ctx['@appContext'].getInjectedObject(STORE)
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

export const injectStore: PropertyDecorator = injectDependency(STORE)
export const injectDispatch: PropertyDecorator = injectDependency(DISPATCH)
