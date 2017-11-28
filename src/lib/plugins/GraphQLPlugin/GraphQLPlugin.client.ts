import { ApolloClient } from 'apollo-client'
import { ApolloCache } from 'apollo-cache'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { exportDependency } from '../../core/PluginConfig'
import GraphQLPluginBase from './GraphQLPlugin.common'

export default class GraphQLPlugin extends GraphQLPluginBase {
  @exportDependency(ApolloClient)
  apolloInstance = new ApolloClient({
    link: new HttpLink({ }),
    cache: new InMemoryCache() as ApolloCache<NormalizedCacheObject>
  })
}
