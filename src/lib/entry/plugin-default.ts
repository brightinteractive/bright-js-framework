import { RequireMap, RequireList } from '../bundler/Entrypoint'
import { PluginConfig } from '../core/PluginConfig'

/**
 * If a plugin doesn't specify a custom loader, we just pull the plugin file into the
 * bundle and provide it with configuration options
 */
export default function defaultPluginEntry(topLevelModules: RequireMap, opts: {}) {
  const [requirePlugin] = topLevelModules.plugins as RequireList
  const plugin = requirePlugin().default

  return {
    default: plugin.prototype instanceof PluginConfig ? plugin : plugin(opts)
  }
}
