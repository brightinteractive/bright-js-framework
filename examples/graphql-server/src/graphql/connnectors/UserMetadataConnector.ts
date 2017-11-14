import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql'

export interface UserMetadata {
  id: string
  name: string
}

export class UserMetadataConnector extends Connector {
  @inject(HttpClient)
  http: HttpClient

  findByName(name: string) {
    return this.http.get({
      url: {
        baseUrl: process.env.USERS_API,
        path: '/users/search',
        query: {
          name
        }
      }
    })
  }
}
