import { expect } from 'chai'
import * as React from 'react'
import { mount } from 'enzyme'
import { Service, isService, decorateServiceProperty } from './Service'
import { decorateController } from './Controller'
import { ApplicationContext } from './ApplicationContext'
import { PluginConfig, exportDependency } from './PluginConfig'
import { ContextProvider } from './ContextProvider'
import { injectDependency } from './InjectionClient'

describe('Service', () => {
  describe('isService()', () => {
    it('should return true for instances of Service subclass', () => {
      class MyService extends Service {}
      const myService = new MyService(anyContext(), {})

      expect(isService(myService)).to.be.true
    })

    it('should return false for other objects', () => {
      const myService = {}

      expect(isService(myService)).to.be.false
    })
  })

  describe('decorateServiceProperty()', () => {
    it('should instantiate service when attached to controller', () => {
      @decorateController
      class Parent extends React.Component {
        @decorateServiceProperty(Service)
        service: Service
      }

      expect(new Parent({}).service).to.be.instanceOf(Service)
    })

    it('should attach parent when creating service', () => {
      class Parent extends Service {
        @decorateServiceProperty(Service)
        service: Service
      }

      expect(new Parent(anyContext(), {}).service.parent).to.be.instanceOf(Parent)
    })

    it('should throw error when attached to non-controller class', () => {
      expect(() => {
        class Parent extends React.Component {
          @decorateServiceProperty(Service)
          service: Service
        }

        return new Parent({}).service
      }).to.throw()
    })
  })

  describe('injectDependency', () => {
    it('should inject the dependency', () => {
      class MyService extends Service {
        @injectDependency('myDependency')
        myDependency: number
      }

      @decorateController
      class Controller extends React.Component {
        @decorateServiceProperty(MyService)
        service: MyService

        render() {
          return null
        }
      }

      class Provider extends PluginConfig {
        @exportDependency('myDependency')
        dep = 1
      }

      const dom = mount(
        <ContextProvider appContext={new ApplicationContext([Provider])}>
          <Controller />
        </ContextProvider>
      )

      const controller = dom.childAt(0).instance() as Controller
      expect(controller.service.myDependency).to.eql(1)
    })
  })
})

function anyContext() {
  return { '@appContext': new ApplicationContext() }
}
