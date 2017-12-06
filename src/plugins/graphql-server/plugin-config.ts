import * as path from 'path'
import * as glob from 'glob'
import { findGraphQLSources } from '../../lib/plugins/GraphQLServerPlugin/loadSchema'
import { EntrypointOpts } from '../../lib/bundler/entrypointLoader'

const pluginFactory = require.resolve('../../lib/plugins/GraphQLServerPlugin/graphQLServerPluginEntry')

/**
 * Custom build function for GraphQL plugin.
 *
 * Adds GraphQL sources into the application bundle and passes them into the plugin
 * factory on load.
 */
export default function graphQlPluginConfig(): EntrypointOpts {
  const topLevelModules = findGraphQLSources({
    glob: glob.sync,
    resolvePath: (pathname) => path.resolve(pathname)
  })

  return { entry: pluginFactory, topLevelModules }
}
