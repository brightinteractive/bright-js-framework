import { expect } from 'chai'
import { spy } from 'sinon'
import { mount } from 'enzyme'
import * as React from 'react'
import { decorateController, isController } from './Controller'
import { Service } from './Service'

describe('Controller', () => {
  describe('isController()', () => {
    it('should return true for components marked as controllers', () => {
      expect(isController(new TestController({}))).to.be.true
    })

    it('should return false for components not marked as controllers', () => {
      expect(isController(new React.Component({}))).to.be.false
    })
  })

  context('when mounted into dom', () => {
    it('should call serviceWillMount() on mount', () => {
      const service = new SpyService()
      mount(<TestController services={[service]} />)

      expect(service.serviceWillMount).to.have.been.called
    })

    it('should call serviceDidMount() on mount', () => {
      const service = new SpyService()
      mount(<TestController services={[service]} />)

      expect(service.serviceDidMount).to.have.been.calledAfter(service.serviceWillMount)
    })

    it('should call serviceDidMount() on unmount', () => {
      const service = new SpyService()
      const dom = mount(<TestController services={[service]} />)
      dom.unmount()

      expect(service.serviceWillUnmount).to.have.been.called
    })

    it('should support set and get state', () => {
      const service = new SpyService()
      const dom = mount(<TestController services={[service]} />)
      service.setState({ foo: 1 })

      dom.update()

      expect(service.state).to.eql({ foo: 1 })
    })
  })
})

@decorateController
class TestController extends React.PureComponent<{ services?: Service[] }> {
  constructor(props: any) {
    super(props)

    if (this.props.services) {
      this.props.services.forEach((service, i) => {
        (this as any)[i] = service
      })
    }
  }

  render() {
    if (!this.props.children) {
      return null
    }

    return React.Children.only(this.props.children)
  }
}

class SpyService extends Service<any> {
  serviceWillMount = spy()
  serviceDidMount = spy()
  serviceWillUnmount = spy()
}
