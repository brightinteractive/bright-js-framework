import { ApplicationContext } from './ApplicationContext'

const INJECTED_OBJECT_KEYS = Symbol('injectedObjectKeys')

export interface InjectionClient {
  context: InjectionContext
}

/** Shape of context passed into a controller */
export interface InjectionContext {
  '@appContext': ApplicationContext
}

export function injectDependency(id: string): (proto: InjectionClient, key: string) => any
export function injectDependency(id: string) {
  return (proto: any) => {
    proto[INJECTED_OBJECT_KEYS] = proto[INJECTED_OBJECT_KEYS] || new Set()
    proto[INJECTED_OBJECT_KEYS].add(id)

    return {
      get(this: InjectionClient) {
        return this.context['@appContext'].injectedObjects[id]
      }
    }
  }
}

export function getRequiredDependencies(ctor: new (...props: any[]) => InjectionClient): Set<string>
export function getRequiredDependencies(ctor: any) {
  return ctor.prototype[INJECTED_OBJECT_KEYS] || new Set()
}
