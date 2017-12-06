import { ApolloLink, Observable, Operation, NextLink } from 'apollo-link'
import { execute, GraphQLSchema } from 'graphql'

/**
 * This allows an apollo client to communicate with resolvers in the same process
 * (rather than over http). It is useful for monolithic server-side apps and also
 * testing a page against a stubbed backend.
 *
 * Vendored from https://github.com/apollographql/apollo-link/issues/158
 * until it's either merged into apollo-link or hosted as its own npm package.
 */

/* istanbul ignore next */
export class LocalLink extends ApolloLink {
  schema: GraphQLSchema
  context: {}
  rootValue: {}

  constructor(schema: GraphQLSchema, context: {}, rootValue: {}) {
    super()

    this.schema = schema
    this.context = context
    this.rootValue = rootValue
  }

  request(operation: Operation, forward?: NextLink) {
    const { schema, rootValue, context } = this
    const { query, variables, operationName } = operation

    return new Observable((observer) => {
      let canceled = false

      execute(schema, query, rootValue, context, variables, operationName)
        .then((result) => {
          if (canceled) {
            return
          }

          // we have data and can send it to back up the link chain
          observer.next(result)
          observer.complete()
          return result
        })
        .catch((err) => {
          if (canceled) {
            return
          }

          observer.error(err)
        })

      return () => {
        canceled = true
      }
    })
  }
}
