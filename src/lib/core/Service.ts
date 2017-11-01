import { uniqueId } from 'lodash'
import { isController } from './Controller'

const SERVICE_IDENTIFIER = Symbol('isService')
const SERVICE_UID = Symbol('serviceUid')

export class Service<State = any> {
  serviceWillMount?: () => void
  serviceDidMount?: () => void
  serviceWillUnmount?: () => void

  readonly state: State
  setState(state: Partial<State>): void {}
}

(Service.prototype as any)[SERVICE_IDENTIFIER] = true

/**
 * Return a property descriptor that instantiates a service
 */
export function decorateServiceProperty(Constructor: new () => Service) {
  return (proto: any, key: string): any => {
    const cacheKey = Symbol(key)

    return {
      get(this: any) {
        if (!isController(this) && !isService(this)) {
          throw new Error([
            `Services may only be attached to controllers or other services`,
            `but ${Constructor.name} is being attached to something else.`,
            `Did you forget to annotate your React Component with @controller?`
          ].join(' '))
        }

        if (!this[cacheKey]) {
          this[cacheKey] = new Constructor()
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

  service[SERVICE_UID] = uniqueId(service.constructor.name || 'Service')
}

export function getServiceUid(service: Service): string
export function getServiceUid(service: any) {
  if (!service[SERVICE_UID]) {
    throw new Error(`Attempt to use service ${service.constructor.name} before initialization`)
  }

  return service[SERVICE_UID]
}
