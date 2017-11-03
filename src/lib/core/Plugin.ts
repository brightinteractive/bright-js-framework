import { Service } from './Service'
import { getRequiredDependencies } from './InjectionClient'

const EXPORTED_OBJECT_KEYS = Symbol('providedObjectKeys')

export class Plugin extends Service {
}

export interface DependencyExport {
  dependencyId: string
  propertyKey: string
}

export type PluginConstructor = typeof Plugin
export type ContextFactoryMap<T = any> = Record<string, () => T>
export type ContextValueMap<T = any> = Record<string, T>

/**
 * Property decorator used to add an exported dependency declaration to a plugin.
 * Dependency metadata is added to the object's prototype.
 */
export function exportDependency(id: string): (proto: Plugin, key: string) => any {
  return (proto: any, key: string) => {
    proto[EXPORTED_OBJECT_KEYS] = proto[EXPORTED_OBJECT_KEYS] || new Set()
    proto[EXPORTED_OBJECT_KEYS].add({
      dependencyId: id,
      propertyKey: key,
    })
  }
}

/**
 * Get dependency metadata provided by exportDependency.
 */
export function getExportedDependencies(ctor: PluginConstructor): Set<DependencyExport>
export function getExportedDependencies(ctor: any): Set<DependencyExport> {
  return ctor.prototype[EXPORTED_OBJECT_KEYS] || new Set()
}

/**
 * Calculate the order of creation for a list of plugins required to ensure that the dependencies
 * declared by each plugin are satisified by previously constructed plugins.
 *
 * Throws if cyclic dependencies are encountered or a dependency is not satisfied.
 *
 * Performs depth-first search on dependency graph to produce topological ordering.
 * https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
 */
export function getPluginCreationOrder(plugins: PluginConstructor[]): PluginConstructor[] {
  const provideMap = new Map<string, PluginConstructor>()

  plugins.forEach((plugin) => {
    getExportedDependencies(plugin).forEach(({ dependencyId }) => {
      provideMap.set(dependencyId, plugin)
    })
  })

  const marks = new Map<PluginConstructor, 'visiting' | 'visited'>()
  const result: PluginConstructor[] = []

  const visit = (plugin: PluginConstructor) => {
    if (marks.get(plugin) === 'visited') {
      return
    }

    if (marks.get(plugin) === 'visiting') {
      throw new Error('Encountered cyclic dependency')
    }

    marks.set(plugin, 'visiting')
    getRequiredDependencies(plugin).forEach((dependencyId) => {
      const provider = provideMap.get(dependencyId)
      if (!provider) {
        throw new Error(`Cannot satisfy dependency ${dependencyId}`)
      }

      visit(provider)
    })
    marks.set(plugin, 'visited')

    result.push(plugin)
  }

  plugins.forEach(visit)
  return result
}
