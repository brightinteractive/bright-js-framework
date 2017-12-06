import {PluginConfig, service} from '@brightinteractive/bright-js-framework'
import TokenInBrowserStorageService from './TokenInBrowserStorageService'

export default () => {
  class DemoAuthPlugin extends PluginConfig {
    /**
     * Created at application load time so the token is loaded from browser storage into application state
     */
    @service(TokenInBrowserStorageService)
    tokenInBrowserStorageService: TokenInBrowserStorageService
  }

  return DemoAuthPlugin
}
