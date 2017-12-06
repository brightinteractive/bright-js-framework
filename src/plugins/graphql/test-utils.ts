import { PluginConstructor } from '../../index'
import { graphQlTestPlugin as graphQlTestPlugin_ } from '../../lib/plugins/GraphQLPlugin/GraphQLTestPlugin'

export interface GraphQlTestPluginProps {
  /**
   * Schema to run queries against.
   *
   * If not provided, will use your application’s graphql schema.
   */
  schema?: any

  /**
   * Mock resolvers to run queries against.
   *
   * You do not always need to provide mocks. If not provided, the test resolver will use an arbitrary
   * (but stable) value of the correct type.
   *
   * If provided, you do not need to mock every type in your schema, or even every field in a type. Only
   * mock the mutations you need to spy on and the resolvers that you want to assert a particular value
   * for.
   */
  mocks?: { [key: string]: GraphQlMockTypeDefinition }
}

/**
 * Create test GraphQlPlugin suitable for using in test cases.
 */
export function graphQLTestPlugin(props: GraphQlTestPluginProps): PluginConstructor {
  return graphQlTestPlugin_(props)
}

/**
 * Mock implementation of a GraphQL type.
 *
 * Should return a GraphQLPrimitiveValue for primitive types (eg. if you want to change the default value for Int)
 * and a GraphQlMockObjectTypeDefinition for object types.
 */
export interface GraphQlMockTypeDefinition {
  (id: string, params: any): GraphQlMockObjectTypeDefinition
}

export type GraphQLPrimitiveValue
  = string
  | number
  | undefined
  | null

/**
 * Mock implementation of a GraphQL object type.
 *
 * Mapping from object fields to GraphQL mock values.
 */
export interface GraphQlMockObjectTypeDefinition {
  [key: string]: GraphQLPrimitiveValue | GraphQlMockTypeDefinition
}
