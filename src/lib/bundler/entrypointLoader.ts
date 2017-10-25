import { LoaderContext, getOptions } from 'loader-utils'

/**
 * Loads a list of top level modules by inserting a shim module that calls a function exported by
 * an entry module with a list of functions resolving to the top level modules.
 */
export function entrypointLoader({ entry, topLevelModules }: EntrypointOpts) {
  if (topLevelModules.length === 0) {
    throw new Error('No path files specified')
  }

  // Webpack loader string identifying this module as the loader with the provided config opts
  return `${__filename}?topLevelModules[]=${topLevelModules.join('&topLevelModules[]=')}!${entry}`
}

export type RequireList = Array<() => any>

export interface EntrypointOpts {
  /**
   * Absolute path to a module that receives the entry modules and determines how
   * they are loaded.
   *
   * It should resolve to a module with a default export of type `(modules: RequireList) => void
   */
  entry: string

  /** Absolute paths to the modules we want to add to the bundle and pass into `entry` */
  topLevelModules: string[]
}

/**
 * Loader implementation
 *
 * This is invoked by webpack to cusomize how a module is loaded when the result of
 * entrypoint() is passed into webpack's list of entry loaders.
 *
 * See: https://webpack.js.org/api/loaders/
 */
export function entrypointLoaderImpl(this: LoaderContext) {
  const options = getOptions(this)
  const entry: string = this.resourcePath
  const topLevelModules: string[] = options.topLevelModules

  this.addDependency(entry)
  topLevelModules.forEach((moduleName) => {
    this.addDependency(moduleName)
  })

  return [
    `var entry = require("${entry}").default;`,
    `module.exports = entry([${topLevelModules.map(generateRequireFn)}]);`,
  ].join('\n')
}

function generateRequireFn(moduleName: string) {
  return `function () { return require("${moduleName}"); }`
}

module.exports = entrypointLoaderImpl
module.exports.entrypointLoader = entrypointLoader
