import { ApolloClient } from 'apollo-client'
import { injectDependency } from '../../core/InjectionClient'

export function decorateGraphQLClient(): PropertyDecorator {
  return injectDependency(ApolloClient)
}
