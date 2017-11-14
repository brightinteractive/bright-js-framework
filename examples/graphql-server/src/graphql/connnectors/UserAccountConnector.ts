import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql'

export interface UserAccount {
  id: string
  email: string
}

class UserAccountIdentity {
  @inject(HttpClient)
  http: HttpClient

  getMany(ids: string[]): Promise<UserAccount[]> {
    return this.http.get({
      url: {
        baseUrl: process.env.USERS_API,
        path: '/users',
        query: {
          id: ids
        }
      }
    })
  }
}

export class UserAccountConnector extends Connector.withIdentity(UserAccountIdentity) {
  @inject(HttpClient)
  http: HttpClient

  delete(id: string) {
    return this.http.delete({
      url: {
        baseUrl: process.env.USERS_API,
        path: `/users/${id}`,
      }
    })
  }
}
