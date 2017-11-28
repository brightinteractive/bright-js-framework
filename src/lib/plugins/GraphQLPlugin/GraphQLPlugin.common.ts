import { DocumentNode } from 'graphql'
import * as stableStringify from 'json-stable-stringify'
import { PluginConfig } from '../../core/PluginConfig'
import { declareReducer } from '../../core/declareReducer'
import { Selector } from '../StorePlugin/StorePlugin'
import { GraphQLError } from 'graphql/error/GraphQLError'

export interface GraphQLAction {
  type: 'graphql:error'
  query: DocumentNode
  variables: {}
  errors: GraphQLError[]
}

export interface GraphQLErrorState {
  [key: string]: GraphQLError[]
}

const ERRORS_STORES_KEY = 'graphql-errors'

export default class GraphQLPluginBase extends PluginConfig {
  static selectErrors(query: { query: DocumentNode, variables: {} }): Selector<GraphQLError[]> {
    return (store) => store[ERRORS_STORES_KEY][getQueryKey(query)] || []
  }

  @declareReducer(ERRORS_STORES_KEY)
  static updateErrorState(state: GraphQLErrorState = {}, action: GraphQLAction | { type: '' }): GraphQLErrorState {
    if (action.type === 'graphql:error') {
      return {
        ...state,
        [getQueryKey(action)]: action.errors
      }
    }

    return state
  }
}

function getQueryKey(key: { query: DocumentNode, variables: {} }) {
  const { query, variables } = key
  return stableStringify({ query, variables })
}
