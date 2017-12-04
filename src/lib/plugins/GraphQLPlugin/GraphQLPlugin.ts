import { ApolloClient } from 'apollo-client'
import { ApolloCache } from 'apollo-cache'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { exportDependency, PluginConstructor } from '../../core/PluginConfig'
import GraphQLPluginBase, { GraphQLPluginProps } from './GraphQLPlugin.common'

export default function graphQlPlugin({ backendUrl = '/graphql' }: GraphQLPluginProps): PluginConstructor {
  class GraphQLPluginClient extends GraphQLPluginBase {
    @exportDependency(ApolloClient)
    apolloInstance = new ApolloClient({
      link: new HttpLink({ uri: backendUrl }),
      cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>
    })
  }

  return GraphQLPluginClient
}
