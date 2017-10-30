const SERVICE_IDENTIFIER = Symbol('isService')

export class Service {

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
