import { expect } from 'chai'
import { PluginConfig, exportDependency, getPluginCreationOrder } from './PluginConfig'
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
})
