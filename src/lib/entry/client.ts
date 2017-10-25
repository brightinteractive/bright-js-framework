import { RequireList } from '../bundler/entrypointLoader'

declare const ___process_env_config: NodeJS.ProcessEnv

/**
 * Just load the top level modules for now.
 *
 * [todo]: Extract routes, add to page router and match the current path.
 */
export default function clientEntry(topLevelModules: RequireList) {
  // Restore process.env before loading client modules
  process.env = ___process_env_config

  topLevelModules.forEach((topLevelModule) => {
    topLevelModule()
  })
}
