import {AuthTokenActions, Token} from '@brightinteractive/bright-js-framework/plugins/auth/auth'
import {authTokenActions} from '@brightinteractive/bright-js-framework/plugins/auth'
import {browserStorage, BrowserStorageSystem} from '@brightinteractive/bright-js-framework/plugins/browserstorage'
import {Service} from '@brightinteractive/bright-js-framework'

export class TokenInBrowserStorageService extends Service<any> {

    ID_TOKEN_KEY = 'demo_id_token'

    @browserStorage()
    browserStorage: BrowserStorageSystem

    @authTokenActions()
    authTokenActions: AuthTokenActions

    serviceDidMount() {
        const storedBrowserToken = this.getToken()

        if (storedBrowserToken) {
            this.authTokenActions.update(storedBrowserToken)
        }
    }

    getToken(): Token | undefined {
        const possibleToken = this.browserStorage.get(this.ID_TOKEN_KEY)

        if (possibleToken) {
            return JSON.parse(possibleToken)
        }

        return undefined
    }

    saveToken(idToken: Token) {
        this.browserStorage.set(this.ID_TOKEN_KEY, JSON.stringify(idToken))
    }

    clearToken() {
        this.browserStorage.clear(this.ID_TOKEN_KEY)
    }
}
