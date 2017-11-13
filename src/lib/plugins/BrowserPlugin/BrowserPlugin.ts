import { History, Location } from 'history'
import { Dispatch } from 'redux'
import { PluginConfig, exportDependency, PluginConstructor } from '../../core/PluginConfig'
import { injectDependency, InjectionDecorator } from '../../core/InjectionClient'
import { declareReducer } from '../../core/declareReducer'
import { injectDispatch, Selector } from '../StorePlugin/StorePlugin'

const HISTORY = 'history'
const LOCATION = 'location'

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
export function createBrowserPlugin({ history }: BrowserPluginProps): PluginConstructor {
  class BrowserPlugin extends PluginConfig {
    @injectDispatch
    dispatch: Dispatch<TransitionAction>

    @exportDependency(HISTORY)
    history = history

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
      this.dispatch({
        type: 'browser:transition',
        payload: {
          ...location,
          action
        }
      })
    }

    /** Subscribe to page change when app loads */
    serviceDidMount() {
      history.listen(this.handlePageTransition)
    }
  }

  return BrowserPlugin
}

export const injectHistory: InjectionDecorator = injectDependency(HISTORY)
export const locationSelect: Selector<Location> = (state) => state[LOCATION]
