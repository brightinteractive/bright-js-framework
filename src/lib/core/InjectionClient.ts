import { ApplicationContext } from './ApplicationContext'

const INJECTED_OBJECT_KEYS = Symbol('injectedObjectKeys')

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

export function injectDependency(id: string): InjectionDecorator
export function injectDependency(id: string) {
  return (proto: any) => {
    proto[INJECTED_OBJECT_KEYS] = proto[INJECTED_OBJECT_KEYS] || new Set()
    proto[INJECTED_OBJECT_KEYS].add(id)

    return {
      get(this: InjectionClient) {
        return this.context['@appContext'].getInjectedObject(id)
      }
    }
  }
}

export function getRequiredDependencies(constructor: new (...props: any[]) => InjectionClient): Set<string>
export function getRequiredDependencies(constructor: any) {
  return constructor.prototype[INJECTED_OBJECT_KEYS] || new Set()
}

export type InjectionDecorator = (proto: InjectionClient, key: string) => any
