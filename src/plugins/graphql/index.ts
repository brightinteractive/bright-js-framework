import GraphQLPlugin from '../../lib/plugins/GraphQLPlugin/GraphQLPlugin'
import { PluginConstructor } from '../../index'

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
  return GraphQLPlugin
}
