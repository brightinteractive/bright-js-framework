import createGraphQLPlugin from '../../lib/plugins/GraphQLPlugin/GraphQLPlugin'
import { decorateGraphQLQuery } from '../../lib/plugins/GraphQLPlugin/client/GraphQLQueryService'
import { PluginConstructor, Service } from '../../index'

export interface GraphQlPluginOpts {
  /**
   * Remote backend URL to run queries against. Defaults to `/graphql`
   */
  backendUrl?: string
}

/**
 * GraphQL plugin constructor
 */
export function graphQlPlugin(props: GraphQlPluginOpts = {}): PluginConstructor {
  return createGraphQLPlugin(props)
}

export interface GraphQLQuery<T> extends Service {
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
