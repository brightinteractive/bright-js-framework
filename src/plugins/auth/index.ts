import {createAuthPlugin} from '../../lib/plugins/AuthPlugin/AuthPlugin'
import {PluginConstructor} from '../../index'
import {AuthClient} from './auth'

export interface AuthPluginOpts {
  /**
   * The concrete implementation to use for the underlying authentication provider
   */
  client: AuthClient
}

/**
 * Auth plugin constructor
 */
export function authPlugin(props: AuthPluginOpts): PluginConstructor {
  return createAuthPlugin(props)
}
