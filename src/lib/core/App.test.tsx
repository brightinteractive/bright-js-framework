import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { App } from './App'

describe('getBundleRoutes()', () => {
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
      />
    )

    expect(app).to.have.text('Hello')
  })

  it('should render null if no matched route', () => {
    const history = createMemoryHistory()
    history.replace('/')

    const app = mount(
      <App
        history={history}
        routes={[]}
      />
    )

    expect(app).to.be.empty
  })
})
