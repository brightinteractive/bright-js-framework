import { expect } from 'chai'
import { mount } from 'enzyme'
import * as React from 'react'
import { decorateController, isController } from './Controller'
import { Service, decorateServiceProperty, ServiceConstructor } from './Service'
import { SpyService } from './mocks/SpyService'
import { TestFixture } from '../entry/TestFixture'

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
      async function setup(serviceConstructor: ServiceConstructor<Service> = SpyService) {
        @decorateController
        class TestController extends React.Component {
          @decorateServiceProperty(serviceConstructor)
          myService: Service

          render() {
            return null
          }
        }

        const fixture = new TestFixture({
          markup: <TestController />
        })

        await fixture.load()
        fixture.render()

        return {
          service: fixture.getInstance<TestController>().myService,
          fixture
        }
      }

      it('should call serviceWillMount() on mount', async () => {
        const { service } = await setup()
        expect(service.serviceWillMount).to.have.been.called
      })

      it('should call serviceDidMount() on mount', async () => {
        const { service } = await setup()
        expect(service.serviceDidMount).to.have.been.calledAfter(service.serviceWillMount as any)
      })

      it('should call serviceDidMount() on unmount', async () => {
        const { fixture, service } = await setup()
        fixture.unmount()

        expect(service.serviceWillUnmount).to.have.been.called
      })

      it('should support set and get state', async () => {
        const { service } = await setup()

        service.setState({ foo: 1 })

        expect(service.state).to.eql({ foo: 1 })
      })

      it('should support services having initial state', async () => {
        class SpyServiceWithInitialState extends SpyService {
          state = { foo: 1 }
        }

        const { service } = await setup(SpyServiceWithInitialState)

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
