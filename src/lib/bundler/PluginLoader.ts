import * as path from 'path'
import { map, compact } from 'lodash'
import { EntrypointOpts, entrypointLoader } from './entrypointLoader'
import { serverExtensions, clientExtensions } from './getWebpackConfig'
import { isSubclassOf } from './Entrypoint'

export interface PluginLoaderProps<Config> {
  environment: Environment
  pluginEntryModulePath: string
  pluginOptions: Config
}

export type Environment = 'client' | 'server'

export class PluginLoader<Config = {}> implements PluginLoaderProps<Config> {
  environment: Environment
  pluginEntryModulePath: string
  pluginOptions: Config

  constructor(props: PluginLoaderProps<Config>) {
    Object.assign(this, props)
  }

  configurePluginEntry(): EntrypointOpts | undefined {
    return {
      entry: defaultEntry,
      topLevelModules: { plugins: [this.pluginEntryModulePath] },
      options: this.pluginOptions
    }
  }

  async applicationWillBuild(): Promise<void> {

  }

  async applicationWillStart(): Promise<void> {

  }
}

export type PluginLoaderClass = new <T>(props: PluginLoaderProps<T>) => PluginLoader<T>

const defaultEntry = require.resolve('../entry/plugin-default')

// XXX: This is all untested. Needs a stub implementation of require.resolve to be tested in full
export function getPluginEntrypoints(pluginMap: any, environment: Environment) {
  const loaders = getPluginLoaders(pluginMap, environment)
  const entrypointConfigs = compact(loaders.map((loader) => loader.configurePluginEntry()))

  return entrypointConfigs.map(entrypointLoader)
}

// XXX: This is all untested. Needs a stub implementation of require.resolve to be tested in full
export function getPluginLoaders(pluginMap: any, environment: Environment) {
  return map(pluginMap, (config, name: string) => {
    const pluginPath = resolvePlugin(name, environment)
    const LoaderClass = getPluginLoaderClass(name, config, environment)

    return new LoaderClass({
      pluginOptions: config,
      pluginEntryModulePath: pluginPath,
      environment,
    })
  })
}

// XXX: This is all untested. Needs a stub implementation of require.resolve to be tested in full
export function runPluginLoaderHook(pluginMap: any, hook: (plugin: PluginLoader) => Promise<void>) {
  return Promise.all(getPluginLoaders(pluginMap, 'server').map(hook))
}

export function getPluginLoaderClass(pluginName: string, pluginConfig: any, environment: Environment): PluginLoaderClass {
  const pluginPath = resolvePlugin(pluginName, environment)
  const loaderPath = resolveCustomPluginLoader(pluginPath)

  if (!loaderPath) {
    return PluginLoader
  }

  const CustomLoader = require(loaderPath).default
  if (!CustomLoader || !isSubclassOf(PluginLoader)(CustomLoader)) {
    throw new Error([
      `Plugin ${pluginName} has a custom plugin config ${loaderPath}`,
      `but it does not have a subclass of PluginConfig as its default export.`,
      `Did you forget to make it the default export?`
    ].join(' '))
  }

  return CustomLoader
}

export function resolvePlugin(pluginName: string, environment: Environment) {
  if (pluginName.startsWith('.')) {
    return getPluginPath(path.join(process.cwd(), pluginName), environment)

  } else {
    return getPluginPath(path.join(process.cwd(), 'node_modules', pluginName), environment)
  }
}

function resolveCustomPluginLoader(pluginPath: string): string | undefined {
  try {
    const customLoaderPath = path.join(path.dirname(pluginPath), 'plugin-loader')
    return require.resolve(customLoaderPath)

  } catch {
    return undefined
  }
}

function getPluginPath(moduleName: string, environment: Environment) {
  return require.resolve(moduleName + getExtension(moduleName, environment))
}

function getExtension(moduleName: string, environment: Environment) {
  const extensions = environment === 'server' ? serverExtensions : clientExtensions

  return extensions.find((ext) => {
    try {
      require.resolve(moduleName + ext)
      return true

    } catch {
      return false
    }
  }) || ''
}
