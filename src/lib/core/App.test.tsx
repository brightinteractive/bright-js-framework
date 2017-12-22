import * as React from 'react'
import {ReactNode} from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {createMemoryHistory} from 'history'
import {App, AppProps} from './App'
import {ApplicationContext} from './ApplicationContext'
import {RouteProps} from '../../index'
import {spyController} from './mocks/SpyController'
import {spyService} from './mocks/SpyService'
import {mountSpy} from './mocks/MountSpy'
import {RouteConfig} from './Router'
import {spyPlugin} from './mocks/SpyPlugin'

describe('App', () => {
  function givenHistoryStartingAt(startPath = '/') {
    const history = createMemoryHistory()
    history.replace(startPath)
    return history
  }

  interface AppOpts {
    historyStartPath?: string
    routes?: RouteConfig[]
    appContext?: ApplicationContext
  }

  function givenAnApp({historyStartPath = '/', routes = [], appContext = new ApplicationContext()}: AppOpts = {}) {
    const history = givenHistoryStartingAt(historyStartPath)

    return (
      <App
        history={history}
        routes={routes}
        appContext={appContext}
      />
    )
  }

  function handlerRendering(toRender: ReactNode = <div/>) {
    return class Handler extends React.Component<RouteProps> {
      render() {
        return toRender
      }
    }
  }

  it('should render the initially matched route', () => {
    const app = givenAnApp({
      routes: [
        {
          path: '/',
          handler: handlerRendering(<div>Hello</div>)
        }
      ]
    })

    const mountedApp = mount(app)

    expect(mountedApp).to.have.text('Hello')
  })

  it('should throw if no matched route', () => {
    const app = givenAnApp()

    expect(() => mount(app)).to.throw()
  })

  it('should transition routes', async () => {
    const {MountSpy, didMount} = mountSpy()

    const mountedApp = mount<AppProps>(
      givenAnApp({
          historyStartPath: '/1',
          routes: [
            {
              path: '/1',
              handler: handlerRendering(<div>1</div>)
            },
            {
              path: '/2',
              handler: handlerRendering(<MountSpy>2</MountSpy>)
            }
          ]
        }
      )
    )

    mountedApp.props().history.replace('/2')
    await didMount

    expect(mountedApp).to.have.text('2')
  })

  it('should not render transitioned routes until data is loaded', async () => {
    const {MountSpy, didMount} = mountSpy()
    const {SpyService, serviceWillLoad} = spyService()
    const {Controller, componentDidMount} = spyController({services: [SpyService]})

    const mountedApp = mount<AppProps>(
      givenAnApp({
          historyStartPath: '/1',
          routes: [
            {
              path: '/1',
              handler: handlerRendering(<div>1</div>)
            },
            {
              path: '/2',
              handler: handlerRendering(<MountSpy><Controller/></MountSpy>)
            }
          ]
        }
      )
    )

    mountedApp.props().history.replace('/2')
    await didMount

    expect(serviceWillLoad).to.have.been.calledBefore(componentDidMount)
  })

  it('calls pageWillTransition on all plugins before next route is loaded', () => {
    const {SpyPlugin, pageWillTransition} = spyPlugin()
    const app = givenAnApp({
      routes: [
        {
          path: '/',
          handler: handlerRendering()
        },
        {
          path: '/1',
          handler: handlerRendering()
        }
      ],
      appContext: new ApplicationContext([SpyPlugin])
    })
    const mountedApp = mount(app)

    mountedApp.props().history.replace('/1')

    expect(pageWillTransition).to.have.been.calledWithMatch({pathname: '/1'})
  })
})
