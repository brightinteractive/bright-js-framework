import * as React from 'react'
import * as PropTypes from 'prop-types'
import { gatherServices, Service, initializeService, getServiceUid } from './Service'
import { patchMethod, patchProperty } from './util'

const IS_CONTROLLER = Symbol('isController')

export interface Controller<Props extends object = {}, State extends object = {}> extends React.Component<Props, State> {
  context: ControllerContext
}

/** Shape of context passed into a controller */
export interface ControllerContext {
  '@injectedControllerDependencies': any
}

/** Field of a controller's context containing injected dependencies */
const INJECTED_DEPENDENCIES_KEY = '@injectedControllerDependencies'

/** Field of a controller's context types containing React context type metadata */
export const CONTROLLER_CONTEXT_TYPES = {
  [INJECTED_DEPENDENCIES_KEY]: PropTypes.any,
}

/** Prepare a component class for having services attached to it. */
export function decorateController(cls: React.ComponentClass): void {
  declareIsController(cls)
  injectControllerBehavior(cls.prototype)
}

/** Has this component been decorated as a controller? */
export function isController(x: React.Component): x is Controller
export function isController(x: any) {
  return Boolean(x[IS_CONTROLLER])
}

/** Attach metadata to class prototype declaring that it is a controller */
function declareIsController(cls: any) {
  cls.prototype[IS_CONTROLLER] = true
}

/** Inject controller behavior into decorated component */
function injectControllerBehavior(proto: React.Component) {
  patchMethod(proto, 'componentWillMount', function(this: React.Component) {
    const services = gatherServices(this)
    services.forEach(initializeService)

    bindState(this, services)

    services.forEach((service) => {
      if (service.serviceWillMount) {
        service.serviceWillMount()
      }
    })
  })

  patchMethod(proto, 'componentDidMount', function(this: React.Component) {
    const services = gatherServices(this)

    services.forEach((service) => {
      if (service.serviceDidMount) {
        service.serviceDidMount()
      }
    })
  })

  patchMethod(proto, 'componentWillUnmount', function(this: React.Component) {
    const services = gatherServices(this)

    services.forEach((service) => {
      if (service.serviceWillUnmount) {
        service.serviceWillUnmount()
      }
    })
  })
}

/** Override service’s state methods to store state in controller */
function bindState(controller: React.Component, services: Service[]) {
  services.forEach((service) => {
    patchProperty(service, 'state', function(this: Service) {
      return getState(getServiceUid(this))
    })

    patchMethod(service, 'setState', function(this: Service, deltaState: any) {
      const prevState = getState(getServiceUid(this))

      controller.setState({
        [getServiceUid(this)]: {
          ...prevState,
          ...deltaState
        }
      })
    })
  })

  function getState(uid: string) {
    const controllerState: any = controller.state || {}
    return controllerState[uid] || {}
  }
}
