import { DocumentNode } from 'graphql'
import { Service, decorateServiceProperty } from '../../core/Service'
import { GraphQLMutation, GraphQLClient } from '../../../plugins/graphql/index'
import { decorateGraphQLClient } from './GraphQLClientService'

export function decorateGraphQLMutation(mutation: DocumentNode): PropertyDecorator {
  class GraphQLMutationService extends Service implements GraphQLMutation<any> {
    @decorateGraphQLClient()
    private client: GraphQLClient

    async perform(variables: any) {
      return this.client.performMutation(mutation, variables)
    }
  }

  return decorateServiceProperty(GraphQLMutationService)
}
