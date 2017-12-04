import { flatMap } from 'lodash'

export type Entrypoint = (modules: RequireMap, opts: any) => void

export type RequireFn = () => any
export type RequireList = RequireFn[]

export interface RequireMap {
  [key: string]: string | RequireList | RequireMap
}

export function getEntrypointDefaultExports<T>(topLevelModules: RequireList, predicate: (x: {}) => x is T): T[] {
  return flatMap(topLevelModules, (moduleLoader) => {
    const moduleExport = moduleLoader().default
    return moduleExport && predicate(moduleExport) ? [moduleExport] : []
  })
}

export function getEntrypointExports<T>(topLevelModules: RequireList, predicate: (x: {}) => x is T): T[] {
  return flatMap(topLevelModules, (moduleLoader) => {
    const moduleExports = moduleLoader()
    return flatMap(moduleExports, (x) => predicate(x) ? [x] : [])
  })
}

export function isSubclassOf<T extends Function>(superclass: T) {
  return (x: any): x is T => x.prototype === superclass.prototype || x.prototype instanceof superclass
}
