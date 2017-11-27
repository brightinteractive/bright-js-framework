import {
  authTokenActionsInjector,
  authTokenValueInjector,
  createAuthTokenPlugin,
} from '../../lib/plugins/AuthTokenPlugin/AuthTokenPlugin'
import {PluginConstructor, SelectFn} from '../../index'
import {AuthTokenState} from './auth'

/**
 * Creates the AuthToken Plugin which is used for storing the Token by an AuthService so it can be accessed later by things needing to make requests on behalf of the user.
 */
export function authTokenPlugin(): PluginConstructor {
  return createAuthTokenPlugin()
}

/**
 * Injects the actions that are available to act on the AuthTokenStore
 */
export function authTokenActions(): PropertyDecorator {
  return authTokenActionsInjector
}

/**
 * Returns the current AuthTokenState object for the application
 */
export function authTokenValue(): SelectFn<AuthTokenState> {
  return authTokenValueInjector
}
