import { flatMap } from 'lodash'
import { RequestHandler } from 'express'
import { Service } from './Service'
import { getRequiredDependencies, InjectionContext } from './InjectionClient'

const EXPORTED_OBJECT_KEYS = '__luminant__providedObjectKeys'
const REQUEST_HANDLERS = '__luminant__requestHandlerKeys'

export class PluginConfig<T = {}> extends Service<T> {
}

export interface DependencyExport {
  dependencyId: string
  propertyKey: string
}

export type PluginConstructor<T extends PluginConfig = PluginConfig> = new (context: InjectionContext) => T
export type ContextFactoryMap<T = any> = Record<string, () => T>
export type ContextValueMap<T = any> = Map<{}, T>

/**
 * Property decorator used to add an exported dependency declaration to a plugin.
 * Dependency metadata is added to the object's prototype.
 */
export function exportDependency(id: any): PropertyDecorator {
  return (proto: any, key) => {
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
export function getExportedDependencies(constructor: PluginConstructor): Set<DependencyExport>
export function getExportedDependencies(constructor: any): Set<DependencyExport> {
  return constructor.prototype[EXPORTED_OBJECT_KEYS] || new Set()
}

export interface RequestHandlerOpts {
  method?: 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE'
  middleware?: RequestHandler[]
}

export interface RequestHandlerConfig {
  path?: string
  method?: 'get' | 'put' | 'post' | 'patch' | 'delete'
  handlers: RequestHandler[]
}

/**
 * Property decorator used to add a request handler to a plugin.
 */
export function decorateRequestHandler(path?: string, opts: RequestHandlerOpts = {}) {
  if (opts.method && !path) {
    throw new Error(`Invalid plugin configuration. ${opts.method} request handlers must provide a path.`)
  }

  return (constructor: any, key: string) => {
    constructor[REQUEST_HANDLERS] = constructor[REQUEST_HANDLERS] || []
    constructor[REQUEST_HANDLERS].push({
      method: opts.method && opts.method.toLowerCase(),
      path,
      handlers: [
        ...(opts.middleware || []),
        constructor[key]
      ]
    })
  }
}

/**
 * Get get request handlers provided by a list of plugins.
 */
export function getRequestHandlers(constructors: PluginConstructor[]): RequestHandlerConfig[] {
  return flatMap(constructors, getPluginRequestHandlers)
}

/**
 * Get get request handlers provided by a plugin.
 */
function getPluginRequestHandlers(constructor: PluginConstructor): RequestHandlerConfig[]
function getPluginRequestHandlers(constructor: any): RequestHandlerConfig[] {
  return constructor[REQUEST_HANDLERS] || []
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
