import * as path from 'path'
import { PluginConstructor } from '../lib/core/PluginConfig'

export function loadPlugins(): PluginConstructor[] {
  try {
    return require(path.resolve('src/config.ts')).default

  } catch {
    return []
  }
}
