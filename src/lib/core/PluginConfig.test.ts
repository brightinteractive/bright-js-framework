import { expect } from 'chai'
import { PluginConfig, exportDependency, getPluginCreationOrder, decorateRequestHandler, getRequestHandlers } from './PluginConfig'
import { injectDependency } from './InjectionClient'

describe('Plugin', () => {
  describe('getPluginCreationOrder()', () => {
    it('should return plugin construction order sorted by dependency', () => {
      class A extends PluginConfig {
        @exportDependency('A')
        provided = 1
      }

      class B extends PluginConfig {
        @injectDependency('A')
        injected: number

        @exportDependency('B')
        provided = this.injected
      }

      class C extends PluginConfig {
        @injectDependency('B')
        injected: number
      }

      expect(getPluginCreationOrder([B, C, A])).to.eql([A, B, C])
    })

    it('should throw on cyclic dependencies', () => {
      class A extends PluginConfig {
        @exportDependency('A')
        provided = 1

        @injectDependency('B')
        injected: number
      }

      class B extends PluginConfig {
        @injectDependency('A')
        injected: number

        @exportDependency('B')
        provided = this.injected
      }

      expect(() => getPluginCreationOrder([B, A])).to.throw()
    })

    it('should throw on unsatisfied dependencies', () => {
      class A extends PluginConfig {
        @injectDependency('B')
        injected: number
      }

      expect(() => getPluginCreationOrder([A])).to.throw()
    })
  })

  describe('decorateRequestHandler', () => {
    const aMiddleware = () => {}

    it('should throw on invalid route', () => {
      expect(() => {
        decorateRequestHandler(undefined, { method: 'GET' })
      }).to.throw
    })

    it('should add route handler to request handlers', () => {
      class MyPlugin extends PluginConfig {
        @decorateRequestHandler('/foo', { method: 'GET', middleware: [aMiddleware] })
        static myRequestHandler() { }
      }

      expect(getRequestHandlers([MyPlugin])).to.eql([
        {
          path: '/foo',
          method: 'get',
          handlers: [aMiddleware, MyPlugin.myRequestHandler]
        }
      ])
    })

    it('should add middlewares to request handler list', () => {
      class MyPlugin extends PluginConfig {
        @decorateRequestHandler()
        static myRequestHandler() { }
      }

      expect(getRequestHandlers([MyPlugin])).to.eql([
        {
          handlers: [MyPlugin.myRequestHandler],
          method: undefined,
          path: undefined
        }
      ])
    })
  })
})
