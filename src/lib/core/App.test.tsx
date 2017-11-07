import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { App } from './App'
import { PluginConfig, exportDependency } from './PluginConfig'
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
})
