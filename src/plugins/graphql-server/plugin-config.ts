import * as path from 'path'
import * as glob from 'glob'
import filewatcher = require('filewatcher')
import { introspectSchema, generate } from 'apollo-codegen'
import { findGraphQLSources } from '../../lib/plugins/GraphQLServerPlugin/loadSchema'
import { EntrypointOpts } from '../../lib/bundler/entrypointLoader'
import { PluginLoaderOpts } from '../../lib/bundler/PluginLoader'

const pluginFactory = require.resolve('../../lib/plugins/GraphQLServerPlugin/graphQLServerPluginEntry')

/**
 * Custom build function for GraphQL plugin.
 *
 * Adds GraphQL sources into the application bundle and passes them into the plugin
 * factory on load.
 */
export default function graphQlPluginConfig(opts: {}, { environment }: PluginLoaderOpts): EntrypointOpts | undefined {
  if (environment !== 'server') {
    return undefined
  }

  const topLevelModules = findGraphQLSources({
    glob: glob.sync,
    resolvePath: (pathname) => path.resolve(pathname)
  })

  if (process.env.NODE_ENV !== 'production') {
    startSchemaGenerator()
  }

  return { entry: pluginFactory, topLevelModules }

  async function startSchemaGenerator() {
    await regenerateSchemas()

    const watcher = filewatcher()
    glob.sync('src/**/*.graphql').forEach((file) => {
      watcher.add(file)
    })

    watcher.on('change', regenerateSchemas)
  }

  async function regenerateSchemas() {
    if (!topLevelModules.schemas[0]) {
      return
    }

    await introspectSchema(topLevelModules.schemas[0].typeDefs, './schema.json')

    glob.sync('src/**/queries').forEach((sourcePath) => {
      generate(
        glob.sync(`${sourcePath}/*.graphql`).map((x) => path.resolve(x)),
        path.resolve('./schema.json'),
        path.resolve(`${sourcePath}/types.ts`),
        'typescript',
        'gql',
        {
          passthroughCustomScalars: false,
          customScalarsPrefix: '',
          addTypename: false,
          namespace: '',
          operationIdsPath: null,
          generateOperationIds: false,
          mergeInFieldsFromFragmentSpreads: true
        }
      )
    })
  }
}
