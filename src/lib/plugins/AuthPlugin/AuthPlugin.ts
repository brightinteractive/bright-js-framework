import {injectDependency, InjectionDecorator} from '../../core/InjectionClient'
import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'

const AUTH_MANAGER = 'authManager'

export const injectAuth: InjectionDecorator = injectDependency(AUTH_MANAGER)

export const createAuthPlugin: (authClient: AuthClient) => PluginConstructor = (authClient: AuthClient) => {
  class AuthManagerPlugin extends PluginConfig {
    @exportDependency(AUTH_MANAGER)
    authManager = new AuthManager(authClient)
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

export interface AuthClient {
  getToken(): string | null

  logout(): void
}
