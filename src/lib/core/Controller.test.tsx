import { expect } from 'chai'
import { spy } from 'sinon'
import { mount } from 'enzyme'
import * as React from 'react'
import { decorateController, isController } from './Controller'
import { Service, decorateServiceProperty } from './Service'

describe('Controller', () => {
  describe('isController()', () => {
    it('should return true for components marked as controllers', () => {
      @decorateController
      class TestController extends React.Component {
        render() {
          return null
        }
      }

      expect(isController(new TestController({}))).to.be.true
    })

    it('should return false for components not marked as controllers', () => {
      expect(isController(new React.Component({}))).to.be.false
    })
  })

  context('when mounted into dom', () => {
    context('and lifecycle hooks are implemented', () => {
      function setup() {
        @decorateController
        class TestController extends React.Component {
          @decorateServiceProperty(SpyService)
          myService: SpyService

          render() {
            return null
          }
        }

        const dom = mount(<TestController />)
        const controller = dom.instance() as TestController

        return { dom, service: controller.myService }
      }

      it('should call serviceWillMount() on mount', () => {
        const { service } = setup()
        expect(service.serviceWillMount).to.have.been.called
      })

      it('should call serviceDidMount() on mount', () => {
        const { service } = setup()
        expect(service.serviceDidMount).to.have.been.calledAfter(service.serviceWillMount)
      })

      it('should call serviceDidMount() on unmount', () => {
        const { dom, service } = setup()
        dom.unmount()

        expect(service.serviceWillUnmount).to.have.been.called
      })

      it('should support set and get state', () => {
        const { dom, service } = setup()

        service.setState({ foo: 1 })
        dom.update()

        expect(service.state).to.eql({ foo: 1 })
      })
    })

    it('should handle case where service does not implement lifecycle methods', () => {
      @decorateController
      class TestController extends React.Component {
        @decorateServiceProperty(Service)
        myService: Service

        render() {
          return null
        }
      }

      const dom = mount(<TestController />)
      dom.unmount()
    })
  })
})

class SpyService extends Service<any> {
  serviceWillMount = spy()
  serviceDidMount = spy()
  serviceWillUnmount = spy()
}
