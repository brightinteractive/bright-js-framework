import { expect } from 'chai'
import { spy } from 'sinon'
import { PluginConfig } from '../../core/PluginConfig'
import { declareReducer } from '../../core/declareReducer'
import { decorateController } from '../../core/Controller'
import * as React from 'react'
import { createSelectService, StateSelector } from './SelectService'
import { Dispatch } from 'redux'
import { injectDispatch, createStorePlugin } from './StorePlugin'
import { ControllerTestFixture } from '../../fixtures/ControllerTestFixture'
import { ServiceTestFixture } from '../../fixtures/ServiceTestFixture'
import { decorateServiceProperty } from '../../core/Service'

describe('StorePlugin', () => {
  class CounterPlugin extends PluginConfig {
    @declareReducer('counter')
    static reducer(state: number = 0, action: any) {
      if (action.type === 'increment') {
        return state + 1
      }

      return state
    }
  }

  const counter = createSelectService((state, props) => props.overrideValue || state.counter)

  @decorateController
  class CounterView extends React.PureComponent<{ overrideValue?: number }> {
    @decorateServiceProperty(counter)
    counter: StateSelector<number>

    @injectDispatch
    dispatch: Dispatch<any>

    render() {
      return <div>{this.counter.value}</div>
    }
  }

  it('should provide initial state to controllers', async () => {
    const fixture = await ControllerTestFixture.create<CounterView>({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    expect(fixture.instance.counter.value).to.eql(0)
  })

  it('should update controller state when actions are dispatched to change state', async () => {
    const fixture = await ControllerTestFixture.create<CounterView>({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    const instance = fixture.instance
    instance.dispatch({ type: 'increment' })

    expect(fixture.instance.counter.value).to.eql(1)
  })

  it('should unsubscribe from store updates when unmounted', async () => {
    const fixture = await ControllerTestFixture.create<CounterView>({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    const unsubscribe = spy()
    fixture.store.subscribe = () => unsubscribe
    fixture.render().unmount()

    expect(unsubscribe).to.have.been.calledOnce
  })

  it('should pass controller props through to selector', async () => {
    const fixture = await ControllerTestFixture.create<CounterView>({
      plugins: [CounterPlugin],
      markup: <CounterView overrideValue={123} />
    })

    expect(fixture.instance.counter.value).to.eql(123
    )
  })

  it('should use props function if provided', async () => {
    const selector = (_: {}, props: { value: number}) => props.value
    const fixture = await ServiceTestFixture.create({
      plugins: [CounterPlugin],
      service: createSelectService(selector, () => ({ value: 3 }))
    })

    expect(fixture.instance.value).to.eql(3)
  })

  it('should not create a store if no reducers are installed', () => {
    expect((createStorePlugin([]) as any).store).to.be.undefined
  })
})
