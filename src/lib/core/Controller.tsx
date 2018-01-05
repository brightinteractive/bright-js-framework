import * as React from 'react'
import { __decorate } from 'tslib'
import * as PropTypes from 'prop-types'
import { InjectionContext } from './InjectionClient'
import { LoadContext } from './load'
import { ControllerSubtreeLoadingService } from './ControllerSubtreeLoadingService'
import { gatherServices, initializeService } from './Service'
import { patchMethod, patchReturnMethod } from './util'
import { controllerSubtreeLoadingService } from './ControllerSubtreeLoadingService'
import { injectDependency } from './InjectionClient'
import { ControllerMountSpy } from '../plugins/ControllerMountSpyPlugin/ControllerMountSpyPlugin'

const IS_CONTROLLER = '__luminant__isController'

export interface Controller<Props extends object = {}, State extends { ['@subtreeLoadingState']?: 'loading' | 'mounting' } = { ['@subtreeLoadingState']?: 'loading' | 'mounting' }>
extends React.Component<Props, State> {
  context: ControllerContext
  ['@subtreeLoader']: ControllerSubtreeLoadingService
  ['@mountObserver']?: ControllerMountSpy
}

export interface ControllerContext extends InjectionContext, LoadContext {
}

export type ControllerWithContext = Controller & React.ChildContextProvider<ControllerContext>

/** Field of a controller's context types containing React context type metadata */
export const CONTROLLER_CONTEXT_TYPES = {
  '@appContext': PropTypes.any,
  '@parentHasMounted': PropTypes.bool
}

/** Field of a controller's context types containing React context type metadata */
export const CONTROLLER_CHILD_CONTEXT_TYPES = {
  '@parentHasMounted': PropTypes.bool
}

/** Prepare a component class for having services attached to it. */
export function decorateController(cls: any): void {
  declareIsController(cls)
  declareControllerContextTypes(cls)
  injectControllerBehavior(cls)
}

/** Has this component been decorated as a controller? */
export function isController(x: React.Component): x is Controller
export function isController(x: any) {
  return Boolean(x[IS_CONTROLLER])
}

/** Request controller context */
function declareControllerContextTypes(x: React.ComponentClass) {
  x.contextTypes = {
    ...x.contextTypes,
    ...CONTROLLER_CONTEXT_TYPES
  }

  x.childContextTypes = {
    ...x.childContextTypes,
    ...CONTROLLER_CHILD_CONTEXT_TYPES
  }
}

/** Attach metadata to class prototype declaring that it is a controller */
function declareIsController(cls: any) {
  cls.prototype[IS_CONTROLLER] = true
}

/** Inject controller behavior into decorated component */
export function injectControllerBehavior(ComponentClass: React.ComponentClass) {
  addBaseServices(ComponentClass)

  patchMethod(ComponentClass.prototype, 'componentWillMount', function(this: Controller) {
    const services = gatherServices(this)
    services.forEach((service) => initializeService(service, this))

    services.forEach((service) => {
      if (service.serviceWillMount) {
        service.serviceWillMount()
      }
    })
  })

  patchMethod(ComponentClass.prototype, 'componentDidMount', function(this: Controller) {
    const services = gatherServices(this)

    this['@subtreeLoader'].loadSubtreeIfNeeded(ComponentClass, this.props, () => {
      services.forEach((service) => {
        if (service.serviceDidMount) {
          service.serviceDidMount()
        }
      })

      const mountObserver = this['@mountObserver']
      if (mountObserver) {
        mountObserver.didMount(this)
      }
    })
  })

  patchMethod(ComponentClass.prototype, 'componentWillUnmount', function(this: React.Component) {
    const services = gatherServices(this)

    services.forEach((service) => {
      if (service.serviceWillUnmount) {
        service.serviceWillUnmount()
      }
    })
  })

  patchReturnMethod(ComponentClass.prototype, 'render', function(this: Controller, prev: () => React.ReactElement<{}> | null | undefined) {
    const { shouldRender } = this['@subtreeLoader']
    return shouldRender && prev() || null
  })

  patchReturnMethod(ComponentClass.prototype, 'getChildContext', function(this: Controller, prev: () => any) {
    const { childLoadContext } = this['@subtreeLoader']
    return childLoadContext && { ...prev(), ...childLoadContext } || prev() || {}
  })
}

/**
 * Some of the core controller behavior is extracted out into services to keep
 * injectControllerBehavior cleaner.
 *
 * Here, we decorate the controller with built-in services that implement this
 * behaviour.
 */
function addBaseServices(ComponentClass: React.ComponentClass) {
  __decorate(
    [controllerSubtreeLoadingService()],
    ComponentClass.prototype,
    '@subtreeLoader',
    undefined
  )

  __decorate(
    [injectDependency(ControllerMountSpy, { optional: true })],
    ComponentClass.prototype,
    '@mountObserver',
    undefined
  )
}
