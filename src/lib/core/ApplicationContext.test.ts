import { expect } from 'chai'
import { PluginConfig, exportDependency } from './PluginConfig'
import { ApplicationContext } from './ApplicationContext'

describe('ApplicationContext', () => {
  class MyPlugin extends PluginConfig {
    @exportDependency('myDependency')
    foo = 1
  }

  it('should return injected objects', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.injectedObjects.myDependency).to.eql(1)
  })

  it('should return store', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.store.dispatch).to.be.a('function')
  })
})
