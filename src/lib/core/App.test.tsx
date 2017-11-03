import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { App } from './App'
import { Plugin, exportDependency } from './Plugin'
import { ApplicationContext } from './ApplicationContext'
import { injectDependency } from './InjectionClient'
import { decorateController } from './Controller'

describe('App', () => {
  it('should render the initially matched route', () => {
    const history = createMemoryHistory()
    history.replace('/')

    const app = mount(
      <App
        history={history}
        routes={[
          {
            path: '/',
            handler: class Handler extends React.Component<any> {
              render() {
                return <div>Hello</div>
              }
            }
          }
        ]}
        appContext={new ApplicationContext()}
      />
    )

    expect(app).to.have.text('Hello')
  })

  it('should throw if no matched route', () => {
    const history = createMemoryHistory()
    history.replace('/')

    expect(() => mount(
      <App
        history={history}
        routes={[]}
        appContext={new ApplicationContext()}
      />
    )).to.throw()
  })

  it('should provide injected dependencies to controllers', () => {
    const history = createMemoryHistory()
    history.replace('/')

    class Provider extends Plugin {
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
      <App
        history={history}
        routes={[
          { path: '/', handler: Consumer }
        ]}
        appContext={new ApplicationContext([Provider])}
      />
    )

    const instance = dom.childAt(0).instance() as Consumer
    expect(instance.dependency).to.eql(1)
  })

  it('should provide injected dependencies to services', () => {
    const history = createMemoryHistory()
    history.replace('/')

    class Provider extends Plugin {
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
      <App
        history={history}
        routes={[
          { path: '/', handler: Consumer }
        ]}
        appContext={new ApplicationContext([Provider])}
      />
    )

    const instance = dom.childAt(0).instance() as Consumer
    expect(instance.dependency).to.eql(1)
  })
})
