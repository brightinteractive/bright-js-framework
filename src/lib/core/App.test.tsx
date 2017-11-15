import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { App } from './App'
import { ApplicationContext } from './ApplicationContext'
import { RouteProps } from '../../index'

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
            handler: class Handler extends React.Component<RouteProps> {
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

  it('should transition routes', () => {
    const history = createMemoryHistory()
    history.replace('/1')

    const app = mount(
      <App
        history={history}
        routes={[
          {
            path: '/1',
            handler: class Handler extends React.Component<RouteProps> {
              render() {
                return <div>1</div>
              }
            }
          },
          {
            path: '/2',
            handler: class Handler extends React.Component<RouteProps> {
              render() {
                return <div>2</div>
              }
            }
          }
        ]}
        appContext={new ApplicationContext()}
      />
    )

    history.replace('/2')
    expect(app).to.have.text('2')
  })
})