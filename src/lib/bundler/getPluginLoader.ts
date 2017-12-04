import * as path from 'path'
import { entrypointLoader, EntrypointOpts } from './entrypointLoader'

const defaultEntry = require.resolve('../entry/default-plugin')

export function getPluginLoader(pluginConfig: any, pluginName: string) {
  const pluginPath = resolvePlugin(pluginName)
  return entrypointLoader(getCustomPluginEntry(pluginPath, pluginConfig) || getDefaultPluginEntry(pluginPath, pluginConfig))
}

export function resolvePlugin(pluginName: string) {
  if (pluginName.startsWith('.')) {
    return require.resolve(path.join(process.cwd(), pluginName))

  } else {
    return require.resolve(path.join(process.cwd(), 'node_modules', pluginName))
  }
}

function getDefaultPluginEntry(pluginPath: string, options: any): EntrypointOpts {
  return {
    entry: defaultEntry,
    topLevelModules: { plugins: [pluginPath] },
    options
  }
}

function getCustomPluginEntry(pluginPath: string, opts: any): EntrypointOpts | undefined {
  const customLoaderPath = resolveCustomPluginConfig(pluginPath)
  return customLoaderPath && require(customLoaderPath).default(opts)
}

function resolveCustomPluginConfig(pluginPath: string): string | undefined {
  try {
    const customLoaderPath = path.join(path.dirname(pluginPath), 'plugin-config')
    return require.resolve(customLoaderPath)

  } catch {
    return undefined
  }
}
