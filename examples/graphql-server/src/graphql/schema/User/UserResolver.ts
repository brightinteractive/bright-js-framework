import { inject } from '@brightinteractive/bright-js-framework'
import { Resolver, type, resolve, queries, mutations } from '@brightinteractive/bright-js-framework/plugins/graphql-server'
import { UserMetadataConnector } from '../../connectors/UserMetadataConnector'
import { UserAccountConnector } from '../../connectors/UserAccountConnector'

@queries()
export class UserQueryResolver extends Resolver {
  @inject(UserMetadataConnector)
  metadata: UserMetadataConnector

  @resolve()
  getUser(props: { id: string }) {
    return props.id
  }

  @resolve()
  searchUser(props: { name: string }) {
    return this.metadata.findByName(props.name)
  }
}

@type('User')
export class UserResolver extends Resolver {
  @inject(UserMetadataConnector)
  metadata: UserMetadataConnector

  @inject(UserAccountConnector)
  account: UserAccountConnector

  @resolve()
  name() {
    return this.metadata.getOne(this.id).then((user) => user && user.name)
  }

  @resolve()
  email() {
    // Sugar for this.account.getOne(this.id).then((user) => user && user.email)
    return this.account.getProperty(this.id, 'email')
  }
}

@mutations()
export class UserMutationResolver extends Resolver {
  @inject(UserAccountConnector)
  account: UserAccountConnector

  @resolve()
  deleteUser(id: string) {
    this.account.delete(id)
  }
}
