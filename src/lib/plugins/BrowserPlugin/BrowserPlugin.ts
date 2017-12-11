import {History, Location} from 'history'
import {Dispatch} from 'redux'
import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {injectDependency} from '../../core/InjectionClient'
import {declareReducer} from '../../core/declareReducer'
import {injectDispatch, Selector} from '../StorePlugin/StorePlugin'

const HISTORY = 'history'
const LOCATION = 'location'
const HOST = 'host'
const HOSTNAME = 'hostname'
const BASE_URL = 'baseUrl'


export interface BrowserPluginProps {
  history: History
}

export interface BrowserState extends Location {
  action: 'POP' | 'PUSH' | 'REPLACE'
}

export interface TransitionAction {
  type: 'browser:transition'
  payload: BrowserState
}

/**
 * Owns and provides access to the application's redux store.
 */
export function createBrowserPlugin({history}: BrowserPluginProps): PluginConstructor {
  class BrowserPlugin extends PluginConfig {
    @injectDispatch
    dispatch: Dispatch<TransitionAction>

    @exportDependency(HISTORY)
    history = history

    @exportDependency(HOSTNAME)
    hostname = window.location.hostname

    @exportDependency(HOST)
    host = window.location.host

    @exportDependency(BASE_URL)
    baseUrl = this.constructBaseUrl()

    constructBaseUrl(): string {
      let baseUrl = window.location.protocol + '//' + window.location.hostname
      if (window.location.port && window.location.port !== '' &&
        window.location.port !== '80' && window.location.port !== '443') {
        baseUrl += ':' + window.location.port
      }

      return baseUrl
    }

    /** Browser state reducer */
    @declareReducer(LOCATION)
    static updateLocation(state: Location = history.location, action: TransitionAction) {
      if (action.type === 'browser:transition') {
        return action.payload
      }

      return state
    }

    /** Sync the history state when a page transition occurs */
    handlePageTransition: History.LocationListener = (location, action) => {
      // XXX: This will reflect the outgoing location when the page loads.
      //      this is generally what we want to render, but some hooks
      //      might want the incoming location.
      this.dispatch({
        type: 'browser:transition',
        payload: {
          ...location,
          action
        }
      })
    }

    /** Subscribe to page change when app loads */
    serviceWillMount() {
      history.listen(this.handlePageTransition)
    }
  }

  return BrowserPlugin
}

export const injectHistory: PropertyDecorator = injectDependency(HISTORY)
export const locationSelect: Selector<Location> = (state) => state[LOCATION]
