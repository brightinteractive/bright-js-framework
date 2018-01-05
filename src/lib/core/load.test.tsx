import * as React from 'react'
import * as PropTypes from 'prop-types'
import { expect } from 'chai'
import { load } from './load'
import { spyController } from './mocks/SpyController'
import { spyService } from './mocks/SpyService'
import { Service, decorateServiceProperty } from './Service'
import { decorateController } from './Controller'
import { ControllerTestFixture } from '../fixtures/ControllerTestFixture'

describe('load()', () => {
  it('should descend shallowly through primitive element types', async () => {
    const { Controller, componentWillMount } = spyController()

    await load(
      <div>
        <div>
          Foo
          <Controller />
        </div>
      </div>
    )

    expect(componentWillMount).to.have.been.calledOnce
  })

  it('should not call componentDidMount', async () => {
    const { Controller, componentDidMount } = spyController()

    await load(<Controller />)

    expect(componentDidMount).to.not.have.been.called
  })

  it('should descend into composite element types', async () => {
    const { Controller: ChildController, componentWillMount } = spyController()

    const { Controller: ParentController } = spyController({
      children: <ChildController />
    })

    await load(
      <ParentController />
    )

    expect(componentWillMount).to.have.been.calledOnce
  })

  it('should descend into composite element types', async () => {
    const { Controller: ChildController, componentWillMount } = spyController()

    const { Controller: ParentController } = spyController({
      children: <ChildController />
    })

    await load(
      <ParentController />
    )

    expect(componentWillMount).to.have.been.calledOnce
  })

  it('should descend into array results from components', async () => {
    class Parent extends React.Component {
      render() {
        return [<div key="a" />, <Controller key="b" />]
      }
    }

    const { Controller, componentWillMount } = spyController({
      children: <div />
    })

    await load(
      <Parent />
    )

    expect(componentWillMount).to.have.been.calledOnce
  })

  it('should descend into SFC components', async () => {
    const { Controller: ChildController, componentWillMount } = spyController()
    const Parent = () => <ChildController />

    await load(
      <Parent />
    )

    expect(componentWillMount).to.have.been.calledOnce
  })

  it('should ignore nulls', async () => {
    const Parent = () => null

    await load(
      <Parent />
    )
  })

  it('should call serviceWillMount on services', async () => {
    const { SpyService, serviceWillMount } = spyService()
    const { Controller } = spyController({
      services: [SpyService]
    })

    await load(
      <Controller />
    )

    expect(serviceWillMount).to.have.been.calledOnce
  })

  it('should call service load hooks in correct order', async () => {
    const {
      SpyService: ChildService,
      serviceWillLoad: childWillLoad,
      serviceWillMount: childWillMount
    } = spyService()

    const {
      SpyService: ParentService,
      serviceWillLoad: parentWillLoad,
      serviceWillMount: parentWillMount
    } = spyService([ChildService])

    const { Controller } = spyController({
      services: [ParentService]
    })

    await load(
      <Controller />
    )

    expect(parentWillMount).to.have.been.calledBefore(parentWillLoad)
    expect(parentWillLoad).to.have.been.calledBefore(childWillMount)
    expect(childWillMount).to.have.been.calledBefore(childWillLoad)
  })

  it('should not call serviceDidMount on services', async () => {
    const { SpyService, serviceDidMount } = spyService()
    const { Controller } = spyController({
      services: [SpyService]
    })

    await load(
      <Controller />
    )

    expect(serviceDidMount).to.not.have.been.called
  })

  it('should provide context to services', async () => {
    class MyService extends Service {
      constructor(context: any, parent: {}) {
        super(context, parent)
        expect(context).to.exist
      }
    }

    const { Controller } = spyController({
      services: [MyService]
    })

    await load(<Controller />, {
      test: true
    })
  })

  it('should add context returned by parent components to the React context', async () => {
    class Parent extends React.PureComponent {
      static childContextTypes = {
        b: PropTypes.any
      }

      getChildContext() {
        return { b: 2 }
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    class Child extends React.PureComponent {
      static contextTypes = {
        a: PropTypes.any,
        b: PropTypes.any,
      }

      constructor(props: any, context: any) {
        super(props)
        expect(context.a).to.eql(1)
        expect(context.b).to.eql(2)
      }

      componentWillMount() {
        expect(this.context.a).to.eql(1)
        expect(this.context.b).to.eql(2)
      }

      render() {
        return <div>{this.props.children}</div>
      }
    }

    await load(<Parent><Child /></Parent>, { a: 1 })
  })

  context('when controller with load hook dynamically inserted into DOM', () => {
    function setup() {
      let state = 'not-loaded'

      class MyService extends Service {
        async serviceWillLoad() {
          state = 'loaded'
        }

        get stateValue() {
          return state
        }
      }

      @decorateController
      class Child extends React.PureComponent {
        @decorateServiceProperty(MyService)
        service: MyService

        render() {
          return <div>{this.service.stateValue}</div>
        }
      }

      @decorateController
      class Parent extends React.PureComponent<{}, { child: React.ReactElement<{}> }> {
        render() {
          return this.state && this.state.child || null
        }
      }

      return { Parent, Child }
    }

    it('should not render the child initially', async () => {
      const { Parent, Child } = setup()

      const fixture = await ControllerTestFixture.create({
        markup: <Parent />
      })

      fixture.instance.setState({
        child: <Child />
      })

      expect(fixture.render().html()).to.be.null
    })

    it('should load data and render once fetched', async () => {
      const { Parent, Child } = setup()

      const fixture = await ControllerTestFixture.create({
        markup: <Parent />
      })

      fixture.instance.setState({
        child: <Child />
      })

      await fixture.waitForController(Child)
      expect(fixture.render()).to.contain(<div>loaded</div>)
    })
  })
})
