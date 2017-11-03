import { expect } from 'chai'
import { Plugin, exportDependency } from './Plugin'
import { ApplicationContext } from './ApplicationContext'

describe('ApplicationContext', () => {
  class MyPlugin extends Plugin {
    @exportDependency('myDependency')
    foo = 1
  }

  it('should return injected objects', () => {
    const ctx = new ApplicationContext([MyPlugin])
    expect(ctx.injectedObjects.myDependency).to.eql(1)
  })
})
