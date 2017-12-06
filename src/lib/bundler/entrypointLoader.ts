import { LoaderContext, getOptions } from 'loader-utils'
import { mapValues, forEach, map } from 'lodash'
import { isString, isArray } from 'util'
import { Buffer } from 'buffer'

/**
 * Loads a list of top level modules by inserting a shim module that calls a function exported by
 * an entry module with a list of functions resolving to the top level modules.
 */
export function entrypointLoader({ entry, topLevelModules, options = {} }: EntrypointOpts) {
  // Webpack loader string identifying this module as the loader with the provided config opts
  return `${__filename}?config=${encodeObject({ topLevelModules, options })}!${entry}`
}

export interface EntrypointOpts {
  /**
   * Absolute path to a module that receives the entry modules and determines how
   * they are loaded.
   *
   * It should resolve to a module with a default export of type `(modules: RequireList) => void
   */
  entry: string

  /**
   * Absolute paths to the modules we want to add to the bundle and pass into `entry` grouped
   * into dependency types
   */
  topLevelModules: EntrypointModuleMap | {}

  /**
   * Arbitrary JSON options object passed into the loaded module
   */
  options?: any
}

export interface EntrypointModuleMap {
  [key: string]: string | string[] | EntrypointModuleMap
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
  const config: any = decodeObject(getOptions(this).config)
  const entry: string = this.resourcePath
  const topLevelModules = config.topLevelModules || {}
  const options = config.options || {}

  addDependencies(this, topLevelModules)

  return [
    `var entry = require("${entry}").default;`,
    `var modules = ${generateModuleMap(topLevelModules)};`,
    `var options = ${JSON.stringify(options)};`,
    `module.exports = entry(modules, options);`,
  ].join('\n')
}

function generateModuleMap(item: string | string[] | EntrypointModuleMap): string {
  if (isString(item)) {
    return generateRequireFn(item)
  }

  if (isArray(item)) {
    return generateArray(item.map(generateModuleMap))
  }

  return generateMap(
    mapValues(item, generateModuleMap)
  )
}

function addDependencies(context: LoaderContext, dependencies: any): void {
  if (typeof dependencies === 'string') {
    context.addDependency(dependencies)
    return
  }

  forEach(dependencies, (dependency) => {
    addDependencies(context, dependency)
  })
}

function generateArray(contents: string[]) {
  return `[${contents.join(',')}]`
}

function generateMap(contents: Record<string, string>) {
  return `{${map(contents, (value, key) => `"${key}": ${value}`).join(',')}}`
}

function generateRequireFn(moduleName: string) {
  return `function(){ return require("${moduleName}"); }`
}

function encodeObject(object: {}) {
  return new Buffer(JSON.stringify(object)).toString('base64')
}

function decodeObject(data: string) {
  return JSON.parse(new Buffer(data, 'base64').toString('utf8'))
}

module.exports = entrypointLoaderImpl
module.exports.entrypointLoader = entrypointLoader
