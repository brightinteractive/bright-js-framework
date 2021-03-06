import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, ResourceBatchFetcher, KeyValuePairs } from '@brightinteractive/bright-js-framework/plugins/graphql-server'
import { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql-server/http'

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
class UserAccountFetcher extends ResourceBatchFetcher<string, UserAccount> {
  @inject(HttpClient)
  http: HttpClient

  getMany(ids: string[]) {
    return this.http.get<KeyValuePairs<string, UserAccount>>({
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
 * Connector class used by ResolverMap. Exposes additional methods for fetching
 * a user resource by ID
 */
export class UserAccountConnector extends Connector.forResource<string, UserAccount>(UserAccountFetcher) {
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
