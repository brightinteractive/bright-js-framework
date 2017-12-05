import {service, Service} from '@brightinteractive/bright-js-framework'
import TokenInBrowserStorageService from './TokenInBrowserStorageService'
import {authTokenActions} from '@brightinteractive/bright-js-framework/plugins/auth'
import {AuthTokenActions, Token} from '@brightinteractive/bright-js-framework/plugins/auth/auth'

export class DemoAuthService extends Service<any> {

  @authTokenActions()
  authTokenActions: AuthTokenActions

  @service(TokenInBrowserStorageService)
  tokenInBrowserStorageService: TokenInBrowserStorageService

  login(username: string, password: string) {
    if (username === 'admin' && password === 'password') {
      const tomorrow = new Date()
      tomorrow.setDate(new Date().getDate() + 1)
      this.saveAuthenticationResult({value: 'admin-token', expiresAt: tomorrow})
    }
  }

  logout() {
    this.authTokenActions.clear()
    this.tokenInBrowserStorageService.clearToken()
  }

  private saveAuthenticationResult(token: Token) {
    this.authTokenActions.update(token)
    this.tokenInBrowserStorageService.saveToken(token)
  }
}
