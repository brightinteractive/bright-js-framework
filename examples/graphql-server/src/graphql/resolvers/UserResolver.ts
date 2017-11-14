import { inject } from '@brightinteractive/bright-js-framework'
import { Resolver, type, property } from '@brightinteractive/bright-js-framework/plugins/graphql'
import { UserMetadataConnector } from '../connnectors/UserMetadataConnector'
import { UserAccountConnector } from '../connnectors/UserAccountConnector'

@type('User')
export class UserResolver extends Resolver {
  @inject(UserMetadataConnector)
  metadata: UserMetadataConnector

  @inject(UserAccountConnector)
  account: UserAccountConnector

  @property
  name() {
    return this.account.getOne(this.id).then(({ name }) => name)
  }

  @property
  email() {
    return this.account.getOne(this.id).then(({ email }) => email)
  }
}

@type('Query')
export class UserQueryResolver extends Resolver {
  @inject(UserMetadataConnector)
  account: UserMetadataConnector

  @property
  getUser(id: string) {
    return id
  }

  @property
  searchUser(props: { name: string }) {
    return this.account.findByName(props.name)
  }
}

@type('Mutation')
export class UserMutationResolver extends Resolver {
  @inject(UserAccountConnector)
  account: UserAccountConnector

  @property
  deleteUser(id: string) {
    this.account.delete(id)
  }
}
