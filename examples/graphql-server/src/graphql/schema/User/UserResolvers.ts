import { inject } from '@brightinteractive/bright-js-framework'
import { SchemaType, type, resolver, queries, mutations } from '@brightinteractive/bright-js-framework/plugins/graphql-server'
import { UserMetadataConnector } from '../../connectors/UserMetadataConnector'
import { UserAccountConnector } from '../../connectors/UserAccountConnector'

@queries()
export class UserQueries extends SchemaType {
  @inject(UserMetadataConnector)
  metadata: UserMetadataConnector

  @resolver()
  getUser(props: { id: string }) {
    return props.id
  }

  @resolver()
  searchUser(props: { name: string }) {
    return this.metadata.findByName(props.name)
  }
}

@type('User')
export class UserType extends SchemaType {
  @inject(UserMetadataConnector)
  metadata: UserMetadataConnector

  @inject(UserAccountConnector)
  account: UserAccountConnector

  @resolver()
  name() {
    return this.metadata.getOne(this.id).then((user) => user && user.name)
  }

  @resolver()
  email() {
    // Sugar for this.account.getOne(this.id).then((user) => user && user.email)
    return this.account.getProperty(this.id, 'email')
  }
}

@mutations()
export class UserMutations extends SchemaType {
  @inject(UserAccountConnector)
  account: UserAccountConnector

  @resolver()
  deleteUser(id: string) {
    this.account.delete(id)
  }
}
