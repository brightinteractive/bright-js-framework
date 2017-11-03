import { expect } from 'chai'
import { Plugin, exportDependency, getPluginCreationOrder } from './Plugin'
import { injectDependency } from './InjectionClient'

describe('combinePlugins()', () => {
  // const reducer1: any = {}
  // const reducer2: any = {}
  // const middeware1: any = {}
  // const middeware2: any = {}

  // class Plugin1 extends Plugin {
  //   injectedObjects = {
  //     a: () => 1
  //   }

  //   storeReducers = {
  //     a: reducer1
  //   }

  //   storeMiddlewares = [
  //     middeware1
  //   ]
  // }
  // class Plugin2 extends Plugin {
  //   injectedObjects = {
  //     b: () => 2
  //   }

  //   storeReducers = {
  //     b: reducer2
  //   }

  //   storeMiddlewares = [
  //     middeware2
  //   ]
  // }

  // it('should combine injected objects', () => {
  //   const { injectedObjects } = combinePlugins([new Plugin1(), new Plugin2()])
  //   expect(injectedObjects.a()).to.eql(1)
  //   expect(injectedObjects.b()).to.eql(2)
  // })

  // it('should combine reducers', () => {
  //   const { storeReducers } = combinePlugins([new Plugin1(), new Plugin2()])
  //   expect(storeReducers.a).to.eql(reducer1)
  //   expect(storeReducers.b).to.eql(reducer2)
  // })

  // it('should combine middlewares', () => {
  //   const { storeMiddlewares } = combinePlugins([new Plugin1(), new Plugin2()])
  //   expect(storeMiddlewares).to.eql([middeware1, middeware2])
  // })

  describe('getPluginCreationOrder()', () => {
    it('should return plugin construction order sorted by dependency', () => {
      class A extends Plugin {
        @exportDependency('A')
        provided = 1
      }

      class B extends Plugin {
        @injectDependency('A')
        injected: number

        @exportDependency('B')
        provided = this.injected
      }

      class C extends Plugin {
        @injectDependency('B')
        injected: number
      }

      expect(getPluginCreationOrder([B, C, A])).to.eql([A, B, C])
    })

    it('should throw on cyclic dependencies', () => {
      class A extends Plugin {
        @exportDependency('A')
        provided = 1

        @injectDependency('B')
        injected: number
      }

      class B extends Plugin {
        @injectDependency('A')
        injected: number

        @exportDependency('B')
        provided = this.injected
      }

      expect(() => getPluginCreationOrder([B, A])).to.throw()
    })

    it('should throw on unsatisfied dependencies', () => {
      class A extends Plugin {
        @injectDependency('B')
        injected: number
      }

      expect(() => getPluginCreationOrder([A])).to.throw()
    })
  })
})
