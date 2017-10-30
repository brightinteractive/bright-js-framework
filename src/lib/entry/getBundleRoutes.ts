import { flatMap } from 'lodash'
import { isRouteComponent, getRouteComponentPath } from '../core/route'
import { RouteConfig } from '../core/Router'
import { RequireList } from '../bundler/entrypointLoader'

export function getBundleRoutes(topLevelModules: RequireList): RouteConfig[] {
  return flatMap(topLevelModules, (moduleLoader) => {
    const moduleExports = moduleLoader()

    return flatMap(moduleExports, (exportedItem: any): RouteConfig[] => {
      if (isRouteComponent(exportedItem)) {
        return [{ handler: exportedItem, path: getRouteComponentPath(exportedItem) }]

      } else {
        return []
      }
    })
  })
}
