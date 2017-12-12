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
  hostname?: string
  host?: string
  port?: number
  protocol?: string
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
export function createBrowserPlugin(
  {
    history,
    hostname = window.location.hostname,
    host = window.location.host,
    port = window.location.port,
    protocol = window.location.protocol
  }: BrowserPluginProps): PluginConstructor {
  class BrowserPlugin extends PluginConfig {
    @injectDispatch
    dispatch: Dispatch<TransitionAction>

    @exportDependency(HISTORY)
    history = history

    @exportDependency(HOSTNAME)
    hostname = hostname

    @exportDependency(HOST)
    host = host

    @exportDependency(BASE_URL)
    baseUrl = this.constructBaseUrl()

    constructBaseUrl(): string {
      let baseUrl = protocol + '//' + hostname
      if (this.portIsNotHttpOrHttps()) {
        baseUrl += ':' + port
      }

      return baseUrl
    }

    private portIsNotHttpOrHttps() {
      return port && port !== '' && port !== '80' && port !== '443'
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
