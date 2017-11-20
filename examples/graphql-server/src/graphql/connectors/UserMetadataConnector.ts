import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, IdentityConfig } from '@brightinteractive/bright-js-framework/plugins/graphql/server'
import { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql/http'

export interface UserMetadata {
  id: string
  name: string
}

class UserMetadataIdentity extends IdentityConfig<UserMetadata> {
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

export class UserMetadataConnector extends Connector.withIdentity<UserMetadata>(UserMetadataIdentity) {
  @inject(HttpClient)
  http: HttpClient

  findByName(name: string) {
    return this.http.get({
      url: {
        baseUrl: process.env.USERS_API!,
        path: '/users/search',
        query: {
          name
        }
      }
    })
  }
}
