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
})
