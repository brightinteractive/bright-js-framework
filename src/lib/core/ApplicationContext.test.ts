import { expect } from 'chai'
import { uniqueId } from 'lodash'
import { Plugin } from './Plugin'
import { ApplicationContext } from './ApplicationContext'

describe('ApplicationContext', () => {
  class MyPlugin extends Plugin {
    injectedObjects = {
      object: () => uniqueId('injected')
    }

    storeReducers = {
      value: (state = 0, action: any) => {
        if (action.type === 'set-value') {
          return action.value

        } else {
          return state
        }
      }
    }

    storeMiddlewares = [
      () => (next: any) => (action: any) => {
        if (action.type === 'to-infinity')  {
          return next({ type: 'set-value', value: Infinity })

        } else {
          return next(action)
        }
      }
    ]
  }

  it('should return injected objects', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.injectedObjects.object).to.include('injected')
  })

  it('should memoize construction of injected objects', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.injectedObjects.object).to.eql(ctx.injectedObjects.object)
  })

  it('should apply reducers to store', () => {
    const ctx = new ApplicationContext([MyPlugin])

    ctx.store.dispatch({ type: 'set-value', value: 5 })
    expect(ctx.store.getState().value).to.eql(5)
  })

  it('should apply middlewares to store', () => {
    const ctx = new ApplicationContext([MyPlugin])

    ctx.store.dispatch({ type: 'to-infinity' })
    expect(ctx.store.getState().value).to.eql(Infinity)
  })
})
