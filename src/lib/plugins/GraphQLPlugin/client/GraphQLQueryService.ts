import { DocumentNode, GraphQLError } from 'graphql'
import { ApolloClient, WatchQueryOptions, ApolloError } from 'apollo-client'
import { Subscription } from 'apollo-client/util/Observable'
import { isUndefined } from 'util'
import { Dispatch } from 'redux'
import { Service, decorateServiceProperty } from '../../../core/Service'
import { injectDependency } from '../../../core/InjectionClient'
import { createSelectService, StateSelector } from '../../StorePlugin/SelectService'
import { injectDispatch } from '../../StorePlugin/StorePlugin'
import GraphQLPlugin, { GraphQLAction } from '../GraphQLPlugin.common'

export interface GraphQLQueryService<Result> extends Service {
  readonly data: Result
  readonly optionalData: Result | undefined
}

export interface GraphQLQueryServiceState {
  data?: any
  stale?: boolean
  loading?: boolean
  errors?: GraphQLError[]
}

export function decorateGraphQLQuery(query: DocumentNode) {
  class GraphQLQueryServiceImpl<Result> extends Service<GraphQLQueryServiceState> {
    private queryObserver: Subscription

    @injectDependency(ApolloClient)
    client: ApolloClient<any>

    @createSelectService((state, props) => GraphQLPlugin.selectErrors({ variables: props, query })(state))
    errors: StateSelector<GraphQLError[]>

    @injectDispatch
    dispatch: Dispatch<GraphQLAction>

    get data(): Result {
      const data = this.optionalData
      if (!data) {
        throw new Error([
          `GraphQL data for this component is not yet available.`,
          `You should avoid calling query.data in componentWillMount, serviceWillLoad`,
          `or a constructor`
        ].join(' '))
      }

      return data
    }

    get optionalData(): Result | undefined {
      const errors = this.errors.value
      if (errors && errors.length > 0) {
        throw new ApolloError({ graphQLErrors: errors })
      }

      if (!isUndefined(this.state.data)) {
        return this.state.data
      }

      try {
        return this.client.readQuery(this.queryConfig)

      } catch {
        return undefined
      }
    }

    get stale() {
      return this.state.stale || false
    }

    get loading() {
      return this.state.loading || false
    }

    get queryConfig(): WatchQueryOptions {
      const { controllerProps: variables } = this
      return { query, variables, errorPolicy: 'all' }
    }

    serviceWillLoad(): Promise<void> {
      return new Promise((resolve) => {
        const subscription = this.client.watchQuery(this.queryConfig).subscribe({
          next: ({ errors }) => {
            if (errors && errors.length > 0) {
              this.dispatch({
                type: 'graphql:error',
                query,
                variables: this.controllerProps,
                errors
              })
            }

            subscription.unsubscribe()
            resolve()
          },
          error: (errorValue) => {
            subscription.unsubscribe()
            resolve()
          }
        })
      })
    }

    serviceDidMount() {
      this.queryObserver = this.client.watchQuery(this.queryConfig).subscribe({
        next: ({ data, loading, stale, errors }) => {
          this.setState({
            data,
            loading,
            stale,
            errors
          })
        }
      })
    }

    serviceWillUnmount() {
      this.queryObserver.unsubscribe()
    }
  }

  return decorateServiceProperty(GraphQLQueryServiceImpl)
}
