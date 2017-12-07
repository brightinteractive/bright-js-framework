import * as path from 'path'
import { map, compact } from 'lodash'
import { entrypointLoader, EntrypointOpts } from './entrypointLoader'
import { serverExtensions, clientExtensions } from './getWebpackConfig'

export interface PluginLoaderOpts {
  environment: 'client' | 'server'
}

const defaultEntry = require.resolve('../entry/plugin-default')

// XXX: This is all untested. Needs a stub implementation of require.resolve to be tested in full
export function getPluginLoaders(pluginMap: any, opts: PluginLoaderOpts) {
  return compact(map(pluginMap, (config, name: string) => getPluginLoader(name, config, opts)))
}

// XXX: This is all untested. Needs a stub implementation of require.resolve to be tested in full
export function runPluginHooks(hook: string, pluginMap: any) {
  Promise.all(compact(map(pluginMap, (config, name: string) => runHook(hook, name, config))))
}

function runHook(hook: string, pluginName: string, pluginConfig: any) {
  const pluginPath = resolvePlugin(pluginName, { environment: 'server' })
  const customLoaderPath = pluginPath && resolveCustomPluginConfig(pluginPath)

  if (customLoaderPath) {
    const hookFn = require(customLoaderPath)[hook]
    if (hookFn) {
      return hookFn()
    }
  }
}

export function getPluginLoader(pluginName: string, pluginConfig: any, opts: PluginLoaderOpts) {
  const pluginPath = resolvePlugin(pluginName, opts)
  return entrypointLoader(getCustomPluginEntry(pluginPath, pluginConfig, opts) || getDefaultPluginEntry(pluginPath, pluginConfig))
}

export function resolvePlugin(pluginName: string, opts: PluginLoaderOpts) {
  if (pluginName.startsWith('.')) {
    return getPluginPath(path.join(process.cwd(), pluginName), opts)

  } else {
    return getPluginPath(path.join(process.cwd(), 'node_modules', pluginName), opts)
  }
}

function getDefaultPluginEntry(pluginPath: string, options: any): EntrypointOpts {
  return {
    entry: defaultEntry,
    topLevelModules: { plugins: [pluginPath] },
    options
  }
}

function getCustomPluginEntry(pluginPath: string, opts: any, loaderOpts: PluginLoaderOpts): EntrypointOpts | undefined {
  const customLoaderPath = resolveCustomPluginConfig(pluginPath)
  return customLoaderPath && require(customLoaderPath).default(opts, loaderOpts)
}

function resolveCustomPluginConfig(pluginPath: string): string | undefined {
  try {
    const customLoaderPath = path.join(path.dirname(pluginPath), 'plugin-config')
    return require.resolve(customLoaderPath)

  } catch {
    return undefined
  }
}

function getPluginPath(moduleName: string, opts: PluginLoaderOpts) {
  return require.resolve(moduleName + getExtension(moduleName, opts))
}

function getExtension(moduleName: string, opts: PluginLoaderOpts) {
  const extensions = opts.environment === 'server' ? serverExtensions : clientExtensions

  return extensions.find((ext) => {
    try {
      require.resolve(moduleName + ext)
      return true

    } catch {
      return false
    }
  }) || ''
}
