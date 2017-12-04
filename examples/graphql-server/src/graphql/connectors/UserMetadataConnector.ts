import { inject } from '@brightinteractive/bright-js-framework'
import { Connector, ResourceBatchFetcher } from '@brightinteractive/bright-js-framework/plugins/graphql-server'
import { HttpClient } from '@brightinteractive/bright-js-framework/plugins/graphql-server/http'

export interface UserMetadata {
  id: string
  name: string
}

class UserMetadataIdentity extends ResourceBatchFetcher<UserMetadata> {
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

export class UserMetadataConnector extends Connector.forResource<UserMetadata>(UserMetadataIdentity) {
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
