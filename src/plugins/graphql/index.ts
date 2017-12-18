import { PluginConstructor } from '../../index'
import _createGraphQLPlugin from '../../lib/plugins/GraphQLPlugin/GraphQLPlugin'
import { decorateGraphQLQuery } from '../../lib/plugins/GraphQLPlugin/GraphQLQueryService'
import { decorateGraphQLMutation } from '../../lib/plugins/GraphQLPlugin/GraphQLMutationService';
import { decorateGraphQLClient } from '../../lib/plugins/GraphQLPlugin/GraphQLClientService'

export interface GraphQlPluginOpts {
  /**
   * Remote backend URL to run queries against. Defaults to `/graphql`
   */
  backendUrl?: string
}

export default function createGraphQLPlugin(props: GraphQlPluginOpts): PluginConstructor {
  return _createGraphQLPlugin(props)
}

export interface GraphQLQuery<T> {
  /**
   * Current selected data for the query.
   *
   * This should not be called in componentWillMount or a constructor, as the data will
   * not yet be available. This will throw an exception.
   */
  readonly data: T
}

export interface GraphQLQueryOpts {
  /**
   * Function mapping from the controller or service that a query is added to to an object
   * containing props for the query.
   *
   * By default, the query will use any relevant props provided to the parent, however you
   * may wish to take props from other services or perform some kind of calculation or remapping
   * on them.
   */
  props?: (parent: any) => {}
}

/**
 * Decorate a controller or service property to add a GraphQL data dependency.
 *
 * The data will be installed on the property as type GraphQLQuery.
 */
export function query(queryDoc: any, opts?: GraphQLQueryOpts): PropertyDecorator {
  return decorateGraphQLQuery(queryDoc, opts)
}

export interface GraphQLMutation<Variables, Result = {}> {
  /**
   * Perform the mutation.
   */
  perform(variables: Variables): Promise<GraphQLResult<Result>>
}

/**
 * Decorate a controller or service property to add a GraphQL mutation.
 */
export function mutation(mutationDoc: any): PropertyDecorator {
  return decorateGraphQLMutation(mutationDoc)
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

  performMutation<Variables, Result = {}>(queryDoc: any, variables: Variables): Promise<GraphQLResult<Result>>
}

/**
 * Install a GraphQL client.
 *
 * In general, you should use either @query or @mutation to interact with GraphQL APIs.
 * However in some plugins and services, it may be necessary to perform queries and mutations
 * with an imperative API.
 */
export function graphQLClient(): PropertyDecorator {
  return decorateGraphQLClient()
}

/**
 * Result of a GraphQL mutation
 */
export type GraphQLResult<T>
  = { status: 'succeeded', data: T }
  | { status: 'failed', errors: Error[] }
