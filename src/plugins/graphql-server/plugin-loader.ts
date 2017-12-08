import * as path from 'path'
import * as glob from 'glob'
import filewatcher = require('filewatcher')
import { introspectSchema, generate } from 'apollo-codegen'
import { findGraphQLSources } from '../../lib/plugins/GraphQLServerPlugin/loadSchema'
import { EntrypointOpts } from '../../lib/bundler/entrypointLoader'
import { PluginLoader } from '../../lib/bundler/PluginLoader'

const pluginFactory = require.resolve('../../lib/plugins/GraphQLServerPlugin/graphQLServerPluginEntry')

export default class GraphQLPluginLoader extends PluginLoader {
  private topLevelModules = findGraphQLSources({
    glob: glob.sync,
    resolvePath: (pathname) => path.resolve(pathname)
  })

  /**
   * Adds GraphQL sources into the application bundle.
   */
  configurePluginEntry(): EntrypointOpts | undefined {
    if (this.environment !== 'server') {
      return undefined
    }

    return {
      entry: pluginFactory,
      topLevelModules: this.topLevelModules
    }
  }

  /**
   * Generate schema types on build.
   */
  async applicationWillBuild() {
    await this.generateQueryTypes()
  }

  /**
   * Server hook. Generate schema types on run and start filewatcher.
   */
  async applicationWillStart() {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    await this.generateQueryTypes()

    const watcher = filewatcher()
    glob.sync('src/**/*.graphql').forEach((file) => {
      watcher.add(file)
    })

    watcher.on('change', () => this.generateQueryTypes())
  }

  /**
   * Generate typescript interfaces from GraphQL queries.
   */
  private async generateQueryTypes() {
    const { schemas } = this.topLevelModules
    if (!schemas[0]) {
      return
    }

    await introspectSchema(schemas[0].typeDefs, './schema.json')

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
