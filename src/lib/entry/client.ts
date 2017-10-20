import { RequireList } from '../bundler/entrypointLoader'

/**
 * Just load the top level modules for now.
 *
 * [todo]: Extract routes, add to page router and match the current path.
 */
export default function clientEntry(topLevelModules: RequireList) {
  topLevelModules.forEach((topLevelModule) => {
    topLevelModule()
  })
}
