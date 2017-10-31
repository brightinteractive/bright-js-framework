import { uniqueId } from "lodash";

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
 * Mark an existing object as a service
 */
export function makeService<T>(x: T): T & Service {
  (x as any)[SERVICE_IDENTIFIER] = true
  return x as any
}

/**
 * Check if object has been annotated as a service
 */
export function isService(x: any): x is Service {
  return Boolean(x[SERVICE_IDENTIFIER])
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
