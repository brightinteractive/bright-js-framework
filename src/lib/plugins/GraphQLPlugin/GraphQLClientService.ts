import { ApolloClient } from 'apollo-client'
import { Service, decorateServiceProperty } from '../../core/Service'
import { injectDependency } from '../../core/InjectionClient'
import { GraphQLClient } from '../../../plugins/graphql'

export function decorateGraphQLClient(): PropertyDecorator {
  class GraphQLMutationService extends Service implements GraphQLClient {
    @injectDependency(ApolloClient)
    private client: ApolloClient<any>

    query<Result, Variables>(query: any, variables: Variables): Promise<GraphQLResult<Result>>
    query<Result>(query: any): Promise<Result>
    async query(query: any, variables?: any) {
      try {
        const { data, errors } = await this.client.query({
          query,
          variables
        })

        if (data) {
          return { status: 'succeeded', data }
        }

        return { status: 'failed', errors: errors || [] }

      } catch (error) {
        return { status: 'failed', errors: [error] }
      }
    }

    async performMutation<Variables, Result = {}>(mutation: any, variables: Variables): Promise<GraphQLResult<Result>> {
      try {
        const { data, errors } = await this.client.mutate({
          mutation,
          variables
        })

        if (data) {
          return { status: 'succeeded', data: data as any }
        }

        return { status: 'failed', errors: errors || [] }

      } catch (error) {
        return { status: 'failed', errors: [error] }
      }
    }
  }

  return decorateServiceProperty(GraphQLMutationService)
}

export type GraphQLResult<T>
= { status: 'succeeded', data: T }
| { status: 'failed', errors: Error[] }
