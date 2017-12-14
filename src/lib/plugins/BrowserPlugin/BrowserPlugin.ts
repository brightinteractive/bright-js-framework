import {History, Location} from 'history'
import {Dispatch} from 'redux'
import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {injectDependency} from '../../core/InjectionClient'
import {declareReducer} from '../../core/declareReducer'
import {injectDispatch, Selector} from '../StorePlugin/StorePlugin'

export const HISTORY = 'history'
export const LOCATION = 'location'
export const HOST_INFO = 'hostinfo'

export interface HostInfo {
  hostname?: string
  host?: string
  protocol?: string
  port?: string
}

export interface BrowserPluginProps {
  history: History
  hostInfo: HostInfo
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
export function createBrowserPlugin({ history, hostInfo }: BrowserPluginProps): PluginConstructor {
  class BrowserPlugin extends PluginConfig {
    @injectDispatch
    dispatch: Dispatch<TransitionAction>

    @exportDependency(HISTORY)
    history = history

    @exportDependency(HOST_INFO)
    hostInfo = hostInfo

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
