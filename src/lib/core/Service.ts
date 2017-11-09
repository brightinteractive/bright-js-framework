import { uniqueId } from 'lodash'
import { isController } from './Controller'
import { InjectionClient, InjectionContext } from './InjectionClient'

const SERVICE_IDENTIFIER = Symbol('isService')
const SERVICE_UID = Symbol('serviceUid')

export type ServiceConstructor<T extends Service = Service> = new(context: InjectionContext) => T

export class Service<State = any> implements InjectionClient {
  constructor(context: InjectionContext) {
    this.context = context
  }

  readonly state: State
  setState(state: Partial<State>): void {}

  context: InjectionContext
}

/**
 * Pull optional methods out into interface as Typescript complains
 * when they are overriden if defined as optional function properties.
 *
 * Due to declaration merging, this is presented to the user as a single
 * class type
 */
export interface Service {
  serviceWillMount?(): void
  serviceDidMount?(): void
  serviceWillUnmount?(): void
}

(Service.prototype as any)[SERVICE_IDENTIFIER] = true

/**
 * Return a property descriptor that instantiates a service
 */
export function decorateServiceProperty<T extends Service>(Constructor: ServiceConstructor<T>) {
  return (proto: any, key: string): any => {
    const cacheKey = Symbol(key)

    return {
      enumerable: true,
      get(this: any) {
        if (!isController(this) && !isService(this)) {
          throw new Error([
            `Services may only be attached to controllers or other services`,
            `but ${Constructor.name} is being attached to something else.`,
            `Did you forget to annotate your React Component with @controller()?`
          ].join(' '))
        }

        if (!this[cacheKey]) {
          this[cacheKey] = new Constructor(this.context)
        }

        return this[cacheKey]
      }
    }
  }
}

/**
 * Check if object has been annotated as a service
 */
export function isService(x: any): x is Service {
  return x instanceof Service
}

/**
 * Recurse through a tree of objects and return all services in the tree
 */
export function gatherServices(parent: any): Service[] {
  const services = []

  for (const key in parent) {
    if (parent[key] && isService(parent[key])) {
      services.push(parent[key])
      services.push(...gatherServices(parent[key]))
    }
  }

  return services
}

export function initializeService(service: Service): void
export function initializeService(service: any) {
  if (service[SERVICE_UID]) {
    throw new Error(`Attempt to initialize service ${service.constructor.name} twice`)
  }

  service[SERVICE_UID] = uniqueId(service.constructor.name)
}

export function getServiceUid(service: Service): string
export function getServiceUid(service: any) {
  if (!service[SERVICE_UID]) {
    throw new Error(`Attempt to use service ${service.constructor.name} before initialization`)
  }

  return service[SERVICE_UID]
}
