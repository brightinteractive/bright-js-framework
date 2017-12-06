import { ApplicationContext } from './ApplicationContext'

const INJECTED_OBJECT_KEYS = '__luminant__injectedObjectKeys'

export class InjectionClient {
  context: InjectionContext

  constructor(context: InjectionContext) {
    this.context = context
  }
}

/** Shape of context passed into a controller */
export interface InjectionContext {
  '@appContext': ApplicationContext
}

export function injectDependency(id: any, opts: { optional?: boolean } = {}): PropertyDecorator {
  return (proto: any) => {
    proto[INJECTED_OBJECT_KEYS] = proto[INJECTED_OBJECT_KEYS] || new Set()
    proto[INJECTED_OBJECT_KEYS].add(id)

    return {
      get(this: InjectionClient) {
        const injectedObject = this.context['@appContext'].getInjectedObject(id)
        if (!injectedObject && !opts.optional) {
          throw new Error(`Could not find dependency ${id.name || id}. Did you forget to install a plugin?`)
        }

        return injectedObject
      }
    }
  }
}

export function getRequiredDependencies(constructor: new (...props: any[]) => InjectionClient): Set<string>
export function getRequiredDependencies(constructor: any) {
  return constructor.prototype[INJECTED_OBJECT_KEYS] || new Set()
}
