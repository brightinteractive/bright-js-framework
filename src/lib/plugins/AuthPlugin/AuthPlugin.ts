import {injectDependency, InjectionDecorator} from '../../core/InjectionClient'
import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {AuthClient} from '../../../plugins/auth/auth'
import {AuthPluginOpts} from '../../../plugins/auth/index'

const AUTH_MANAGER = 'authManager'

export const injectAuth: InjectionDecorator = injectDependency(AUTH_MANAGER)

export const createAuthPlugin: (authPluginOpts: AuthPluginOpts) => PluginConstructor = (authPluginOpts: AuthPluginOpts) => {
  class AuthManagerPlugin extends PluginConfig {
    @exportDependency(AUTH_MANAGER)
    authManager = new AuthManager(authPluginOpts.client)
  }

  return AuthManagerPlugin
}

export class AuthManager {

  client: AuthClient

  constructor(client: AuthClient) {
    this.client = client
  }

  getToken() {
    return this.client.getToken()
  }

  logout() {
    return this.client.logout()
  }
}
