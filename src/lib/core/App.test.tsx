import * as React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'
import { createMemoryHistory } from 'history'
import { App, AppProps } from './App'
import { ApplicationContext } from './ApplicationContext'
import { RouteProps } from '../../index'
import { spyController } from './mocks/SpyController'
import { spyService } from './mocks/SpyService'
import { mountSpy } from './mocks/MountSpy'

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

  it('should transition routes', async () => {
    const { MountSpy, didMount } = mountSpy()

    const history = createMemoryHistory()
    history.replace('/1')

    const dom = mount<AppProps>(
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
                return <MountSpy>2</MountSpy>
              }
            }
          }
        ]}
        appContext={new ApplicationContext()}
      />
    )

    history.replace('/2')
    await didMount

    expect(dom).to.have.text('2')
  })

  it('should not render transitioned routes until data is loaded', async () => {
    const { MountSpy, didMount } = mountSpy()
    const { SpyService, serviceDidLoad } = spyService()
    const { Controller, componentDidMount } = spyController({ services: [SpyService] })

    const history = createMemoryHistory()
    history.replace('/1')

    mount<AppProps>(
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
                return <MountSpy><Controller /></MountSpy>
              }
            }
          }
        ]}
        appContext={new ApplicationContext()}
      />
    )

    history.replace('/2')
    await didMount

    expect(serviceDidLoad).to.have.been.calledBefore(componentDidMount)
  })
})
