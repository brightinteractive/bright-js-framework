import { expect } from 'chai'
import { combinePlugins, Plugin } from './Plugin'

describe('combinePlugins()', () => {
  const reducer1: any = {}
  const reducer2: any = {}
  const middeware1: any = {}
  const middeware2: any = {}

  class Plugin1 extends Plugin {
    injectedObjects = {
      a: () => 1
    }

    storeReducers = {
      a: reducer1
    }

    storeMiddlewares = [
      middeware1
    ]
  }
  class Plugin2 extends Plugin {
    injectedObjects = {
      b: () => 2
    }

    storeReducers = {
      b: reducer2
    }

    storeMiddlewares = [
      middeware2
    ]
  }

  it('should combine injected objects', () => {
    const { injectedObjects } = combinePlugins([new Plugin1(), new Plugin2()])
    expect(injectedObjects.a()).to.eql(1)
    expect(injectedObjects.b()).to.eql(2)
  })

  it('should combine reducers', () => {
    const { storeReducers } = combinePlugins([new Plugin1(), new Plugin2()])
    expect(storeReducers.a).to.eql(reducer1)
    expect(storeReducers.b).to.eql(reducer2)
  })

  it('should combine middlewares', () => {
    const { storeMiddlewares } = combinePlugins([new Plugin1(), new Plugin2()])
    expect(storeMiddlewares).to.eql([middeware1, middeware2])
  })
})
