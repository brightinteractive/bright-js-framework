import {PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {AuthTokenActions, AuthTokenState, Token} from '../../../plugins/auth/auth'
import {Action, dispatcher, Dispatcher, exported, inject, SelectFn, state} from '../../../index'

const AUTH_TOKEN_STATE = 'authTokenValue'

const AUTH_TOKEN_ACTIONS = 'authTokenActions'

export const createAuthTokenPlugin: () => PluginConstructor = () => {
  class AuthTokenPlugin extends PluginConfig {
    @dispatcher()
    dispatch: Dispatcher

    @state(AUTH_TOKEN_STATE)
    static update(currentState: AuthTokenState = {}, action: Action) {
      if (action.type === 'authToken:update') {
        return {token: action.token}
      }

      return currentState
    }

    @exported(AUTH_TOKEN_ACTIONS)
    actions: AuthTokenActions = {
      update: (token: Token) => {
        this.dispatch({type: 'authToken:update', token})
      },
      clear: () => {
        this.dispatch({type: 'authToken:update'})
      }
    }
  }

  return AuthTokenPlugin
}

// Exported API to inject the action objects into a service or controller
export const authTokenActionsInjector = inject(AUTH_TOKEN_ACTIONS)

// Exported API to bind a selected state value into a service or controller
export const authTokenValueInjector: SelectFn<AuthTokenState> = (appState) => appState[AUTH_TOKEN_STATE]
