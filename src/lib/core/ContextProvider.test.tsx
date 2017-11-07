import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { ContextProvider } from './ContextProvider'
import { PluginConfig, exportDependency } from './PluginConfig'
import { ApplicationContext } from './ApplicationContext'
import { injectDependency } from './InjectionClient'
import { decorateController } from './Controller'

describe('ContextProvider', () => {
  it('should provide injected dependencies to controllers', () => {
    const history = createMemoryHistory()
    history.replace('/')

    class Provider extends PluginConfig {
      @exportDependency('myDependency')
      myDependency = 1
    }

    @decorateController
    class Consumer extends React.PureComponent<any> {
      @injectDependency('myDependency')
      dependency: number

      render() {
        return null
      }
    }

    const dom = mount(
      <ContextProvider appContext={new ApplicationContext([Provider])}>
        <Consumer />
      </ContextProvider>
    )

    const instance = dom.childAt(0).instance() as Consumer
    expect(instance.dependency).to.eql(1)
  })

  it('should provide injected dependencies to services', () => {
    const history = createMemoryHistory()
    history.replace('/')

    class Provider extends PluginConfig {
      @exportDependency('myDependency')
      myDependency = 1
    }

    @decorateController
    class Consumer extends React.PureComponent<any> {
      @injectDependency('myDependency')
      dependency: number

      render() {
        return null
      }
    }

    const dom = mount(
      <ContextProvider appContext={new ApplicationContext([Provider])}>
        <Consumer />
      </ContextProvider>
    )

    const instance = dom.childAt(0).instance() as Consumer
    expect(instance.dependency).to.eql(1)
  })
})
