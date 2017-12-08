import createGraphQLPlugin from '../../lib/plugins/GraphQLPlugin/GraphQLPlugin'
import { decorateGraphQLQuery } from '../../lib/plugins/GraphQLPlugin/GraphQLQueryService'

export interface GraphQlPluginOpts {
  /**
   * Remote backend URL to run queries against. Defaults to `/graphql`
   */
  backendUrl?: string
}

export default createGraphQLPlugin

export interface GraphQLQuery<T> {
  /**
   * Current selected data for the query.
   *
   * This should not be called in componentWillMount or a constructor, as the data will
   * not yet be available. This will throw an exception.
   */
  readonly data: T
}

/**
 * Decorate a controller or service property to add a GraphQL data dependency.
 *
 * The data will be installed on the property as type GraphQLQuery.
 */
export function query(queryDoc: any): PropertyDecorator {
  return decorateGraphQLQuery(queryDoc)
}

export interface GraphQLMutation<T> {
  /**
   * Perform the mutation.
   */
  perform(variables: T): Promise<void>
}

/**
 * Decorate a controller or service property to add a GraphQL mutation.
 */
export function mutation(queryDoc: any): PropertyDecorator {
  return decorateGraphQLMutation(queryDoc)
}

/**
 * GraphQL client injectable into services.
 *
 * In general, you should use either @query or @mutation to interact with GraphQL APIs.
 * However in some plugins and services, it may be necessary to perform queries and mutations
 * with an imperative API.
 */
export interface GraphQLClient {
  query<Result, Variables>(queryDoc: any, variables: Variables): Promise<Result>
  query<Result>(queryDoc: any): Promise<Result>

  performMutation<Variables, Result = {}>(queryDoc: any, variables: Variables): Promise<Result>
}

/**
 * Install a GraphQL client.
 *
 * In general, you should use either @query or @mutation to interact with GraphQL APIs.
 * However in some plugins and services, it may be necessary to perform queries and mutations
 * with an imperative API.
 */
export function graphQLClient(): PropertyDecorator {
  return injectGraphQLClient()
}
