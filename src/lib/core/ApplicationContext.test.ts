import { expect } from 'chai'
import { PluginConfig, exportDependency } from './PluginConfig'
import { ApplicationContext } from './ApplicationContext'
import { declareReducer } from './declareReducer'

describe('ApplicationContext', () => {
  class MyPlugin extends PluginConfig {
    @exportDependency('myDependency')
    foo = 1

    @declareReducer('foo')
    static myReducer() {
      return null
    }
  }

  it('should return injected objects', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.getInjectedObject('myDependency')).to.eql(1)
  })

  it('should return store', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.store.dispatch).to.be.a('function')
  })

  it('should allow state to be set and get on plugins', () => {
    const ctx = new ApplicationContext([MyPlugin])
    const plugin = ctx.findPluginOfType(MyPlugin)

    plugin.setState({ foo: 1 })
    expect(plugin.state).to.eql({ foo: 1 })
  })

  describe('loading a plugin', () => {
    it('should call serviceWillLoad on plugins', async () => {
      const ctx = new ApplicationContext([MyPlugin])
      const plugin = ctx.findPluginOfType(MyPlugin)

      let loaded = false
      plugin.serviceWillLoad = function(this: MyPlugin) {
        loaded = true
      }

      await ctx.applicationWillLoad()
      expect(loaded).to.be.true
    })
  })

  describe('before application mounts', () => {
    it('should call serviceWillMount on services', () => {
      const ctx = new ApplicationContext([MyPlugin])
      const plugin = ctx.findPluginOfType(MyPlugin)

      let willMountCalled = false
      plugin.serviceWillMount = function(this: MyPlugin) {
        willMountCalled = true
      }

      ctx.applicationWillMount()
      expect(willMountCalled).to.be.true
    })
  })

  describe('after application mounts', () => {
    it('should call serviceDidMount on services', () => {
      const ctx = new ApplicationContext([MyPlugin])
      const plugin = ctx.findPluginOfType(MyPlugin)

      let mounted = false
      plugin.serviceDidMount = function(this: MyPlugin) {
        mounted = true
      }

      ctx.applicationDidMount()
      expect(mounted).to.be.true
    })
  })
})
