import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, IdentityConfig } from '@brightinteractive/bright-js-framework/plugins/graphql/server'
import { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql/http'

/**
 * Type definition for a resource returned by the backend service.
 */
export interface UserAccount {
  id: string
  email: string
}

/**
 * Define how to fetch a batch of Users by ID.
 */
class UserAccountIdentity extends IdentityConfig<UserAccount> {
  @inject(HttpClient)
  http: HttpClient

  getMany(ids: string[]) {
    return this.http.get({
      url: {
        baseUrl: process.env.USERS_API!,
        path: '/users',
        query: {
          id: ids
        }
      }
    })
  }
}

/**
 * Connector class used by resolvers. Exposes additional methods for fetching
 * a user resource by ID
 */
export class UserAccountConnector extends Connector.withIdentity<UserAccount>(UserAccountIdentity) {
  @inject(HttpClient)
  http: HttpClient

  delete(id: string) {
    return this.http.delete({
      url: {
        baseUrl: process.env.USERS_API!,
        path: `/users/${id}`,
      }
    })
  }
}
