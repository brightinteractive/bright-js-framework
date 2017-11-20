import { graphQlPlugin } from '@brightinteractive/bright-js-framework/plugins/graphql'

export default [
  graphQlPlugin({ backendUrl: process.env.BACKEND_URL })
]
