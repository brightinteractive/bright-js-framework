import * as React from 'react'
import { uniqueId } from 'lodash'
import { spy, SinonSpy } from 'sinon'
import { ServiceConstructor, decorateServiceProperty } from '../Service'
import { decorateController } from '../Controller'

export interface SpyControllerProps {
  services?: ServiceConstructor[]
  children?: React.ReactNode
}

export interface SpyControllerResult {
  componentWillMount: SinonSpy
  componentDidMount: SinonSpy
  Controller: React.ComponentClass<{}>
}

export function spyController({ services = [], children }: SpyControllerProps = {}): SpyControllerResult {
  @decorateController
  class Controller extends React.PureComponent {
    render() {
      return <div>{this.props.children || children}</div>
    }
  }

  const componentWillMount = spy()
  const componentDidMount = spy()

  Controller.prototype.componentWillMount = componentWillMount
  Controller.prototype.componentDidMount = componentDidMount

  attachServices(services, Controller.prototype)

  return { Controller, componentWillMount, componentDidMount }
}

export function attachServices(services: ServiceConstructor[], prototype: any) {
  services.forEach((service) => {
    const key = uniqueId('service')
    const prop = decorateServiceProperty(service)(prototype, key)
    if (prop) {
      Object.defineProperty(prototype, key, prop)
    }
  })
}
