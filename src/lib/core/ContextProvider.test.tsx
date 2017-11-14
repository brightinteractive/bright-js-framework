import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { ContextProvider } from './ContextProvider'
import { PluginConfig, exportDependency } from './PluginConfig'
import { ApplicationContext } from './ApplicationContext'
import { injectDependency } from './InjectionClient'
import { decorateController } from './Controller'
import { SpyService } from './mocks/SpyService';

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

  it('should call serviceWillMount() on services', () => {
    const Service = SpyService as any

    const dom = mount(
      <ContextProvider appContext={new ApplicationContext([Service])}>
        <div />
      </ContextProvider>
    )

    const instance = dom.instance() as ContextProvider
    const service = instance.props.appContext.findPluginOfType<SpyService>(Service)
    expect(service.serviceWillMount).to.have.been.calledOnce
  })

  it('should call serviceDidMount() on services', () => {
    const Service = SpyService as any

    const dom = mount(
      <ContextProvider appContext={new ApplicationContext([Service])}>
        <div />
      </ContextProvider>
    )

    const instance = dom.instance() as ContextProvider
    const service = instance.props.appContext.findPluginOfType<SpyService>(Service)
    expect(service.serviceDidMount).to.have.been.calledOnce
  })

  it('should call serviceWillUnmount() on services', () => {
    const Service = SpyService as any

    const dom = mount(
      <ContextProvider appContext={new ApplicationContext([Service])}>
        <div />
      </ContextProvider>
    )

    const instance = dom.instance() as ContextProvider
    const service = instance.props.appContext.findPluginOfType<SpyService>(Service)

    dom.unmount()
    expect(service.serviceWillUnmount).to.have.been.calledOnce
  })
})
