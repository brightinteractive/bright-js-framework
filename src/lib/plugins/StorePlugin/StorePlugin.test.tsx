import { expect } from 'chai'
import { spy } from 'sinon'
import { PluginConfig } from '../../core/PluginConfig'
import { TestFixture } from '../../entry/TestFixture'
import { declareReducer } from '../../core/declareReducer'
import { decorateController } from '../../core/Controller'
import * as React from 'react'
import { createSelectService, StateSelector } from './SelectService'
import { Dispatch } from 'redux'
import { injectDispatch, createStorePlugin } from './StorePlugin'

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

  const counter = createSelectService((state) => state.counter)

  @decorateController
  class CounterView extends React.PureComponent {
    @counter
    counter: StateSelector<number>

    @injectDispatch
    dispatch: Dispatch<any>

    render() {
      return <div>{this.counter.value}</div>
    }
  }

  it('should provide initial state to controllers', () => {
    const fixture = new TestFixture({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    expect(fixture.getInstance<CounterView>().counter.value).to.eql(0)
  })

  it('should update controller state when actions are dispatched to change state', () => {
    const fixture = new TestFixture({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    const instance = fixture.getInstance<CounterView>()
    instance.dispatch({ type: 'increment' })

    expect(fixture.getInstance<CounterView>().counter.value).to.eql(1)
  })

  it('should unsubscribe from store updates when unmounted', () => {
    const fixture = new TestFixture({
      plugins: [CounterPlugin],
      markup: <CounterView />
    })

    const unsubscribe = spy()
    fixture.store.subscribe = () => unsubscribe

    fixture.render().unmount()

    expect(unsubscribe).to.have.been.calledOnce
  })

  it('should not create a store if no reducers are installed', () => {
    expect((createStorePlugin([]) as any).store).to.be.undefined
  })
})
