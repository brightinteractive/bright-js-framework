import { uniqueId } from 'lodash'
import { isController } from './Controller'
import { InjectionClient, InjectionContext } from './InjectionClient'
import { patchProperty, patchMethod } from './util'

const SERVICE_IDENTIFIER = '__luminant__isService'
const SERVICE_UID = '__luminant__serviceUid'

export type ServiceConstructor<T extends Service = Service> = new(context: InjectionContext, parent: {}) => T

export class ServiceContainer<Props = {}, State = {}> {
  props: Props
  state: State

  setState(nextState: Partial<State>, nextFn?: () => void): void {
    this.state = { ...this.state as any, ...nextState as any}

    if (nextFn) {
      nextFn()
    }
  }
}

export class Service<State = any> implements InjectionClient {
  constructor(context: InjectionContext, parent: {}) {
    this.context = context
    this.parent = parent
  }

  readonly controllerProps: {}
  readonly parent: {}

  state: State
  setState(state: Partial<State>, nextFn?: () => void): void {}

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
  serviceWillLoad?(): void | Promise<any>
  serviceWillUnmount?(): void
}

(Service.prototype as any)[SERVICE_IDENTIFIER] = true

const SERVICES = '__luminant__services'

/**
 * Return a property descriptor that instantiates a service
 */
export function decorateServiceProperty<T extends Service>(Constructor: ServiceConstructor<T>): PropertyDecorator {
  return (proto: any, key: string | symbol): any => {
    const cacheKey = Symbol(key.toString())

    proto[SERVICES] = proto[SERVICES] || []
    proto[SERVICES].push(key)

    return {
      get(this: any) {
        if (!isController(this) && !isService(this)) {
          throw new Error([
            `Services may only be attached to controllers or other services`,
            `but ${Constructor.name} is being attached to something else.`,
            `Did you forget to annotate your React Component with @controller()?`
          ].join(' '))
        }

        if (!this[cacheKey]) {
          this[cacheKey] = new Constructor(this.context, this)
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
export function gatherServices(parent: any, opts: { recursive?: boolean } = {}): Service[] {
  const { recursive = true } = opts
  const services: Service[] = []

  const serviceKeys = parent[SERVICES] || []

  serviceKeys.forEach((key: string) => {
    if (parent[key] && isService(parent[key])) {
      services.push(parent[key])

      if (recursive) {
        services.push(...gatherServices(parent[key]))
      }
    }
  })

  return services
}

export function initializeService(service: Service, container: ServiceContainer): void
export function initializeService(service: any, container: ServiceContainer) {
  if (service[SERVICE_UID]) {
    throw new Error(`Attempt to initialize service ${service.constructor.name} twice`)
  }

  service[SERVICE_UID] = uniqueId(service.constructor.name)

  bindProps(container, service)
  bindState(container, service)
}

export function getServiceUid(service: Service): string
export function getServiceUid(service: any) {
  if (!service[SERVICE_UID]) {
    throw new Error(`Attempt to use service ${service.constructor.name} before initialization`)
  }

  return service[SERVICE_UID]
}

/** Override service’s state methods to store state in controller */
export function bindState(controller: ServiceContainer, service: Service) {
  controller.setState({[getServiceUid(service)]: service.state})

  patchProperty(service, 'state', function(this: Service) {
    return getState(getServiceUid(this))
  })

  patchMethod(service, 'setState', function(this: Service, deltaState: any, cb: () => void) {
    const prevState = getState(getServiceUid(this))

    controller.setState({
      [getServiceUid(this)]: {
        ...prevState,
        ...deltaState
      }
    }, cb)
  })

  function getState(uid: string) {
    const controllerState: any = controller.state || {}
    return controllerState[uid] || {}
  }
}

/** Override service’s props to take props from controller */
export function bindProps(controller: ServiceContainer, service: Service) {
  patchProperty(service, 'controllerProps', function(this: Service) {
    return controller.props
  })
}
