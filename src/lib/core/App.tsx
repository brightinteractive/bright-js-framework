import * as React from 'react'
import {History, Location} from 'history'
import {uniqueId} from 'lodash'
import {RouteConfig, Router} from './Router'
import {ContextProvider, ContextProviderProps} from './ContextProvider'
import {load} from './load'
import {asyncInvokeMethodOnAllObjects} from './util'

export interface AppProps extends ContextProviderProps {
  routes: RouteConfig[]
  history: History
}

export interface AppState {
  location: Location
}

export interface TransitionEnterEvent {
  incomingLocation: Location
  outgoingLocation: Location
  redirect: RedirectFunction
}

export type RedirectFunction = (l: Location) => void

/**
 * Root application container.
 */
export class App extends ContextProvider<AppProps, AppState> {
  pendingTransition?: string
  router = new Router(this.props.routes)
  unsubscribeHistory: () => void

  state: AppState = {
    location: this.props.history.location,
  }

  handlePageTransition: History.LocationListener = async (location) => {
    this.transitionToLocation(location)
  }

  async transitionToLocation(location: Location) {
    const nextRoute = this.router.match(location)
    const transitionIdentifier = uniqueId('transition:' + location.pathname)
    this.pendingTransition = transitionIdentifier

    if (nextRoute) {
      const Handler = nextRoute.handler
      await asyncInvokeMethodOnAllObjects(
        this.props.appContext.plugins,
        (plugin) => plugin.pageWillTransition,
        location
      )
      await load(<Handler/>, this.getChildContext())
    }

    if (transitionIdentifier === this.pendingTransition) {
      this.setState({location})
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.unsubscribeHistory = this.props.history.listen(this.handlePageTransition)
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.unsubscribeHistory()
  }

  render() {
    const match = this.router.match(this.state.location)

    if (match) {
      const Handler = match.handler
      return <Handler {...match} />

    } else {
      throw new Error(`You don't have a page set up to handle 404s. Add a new page with @route('*') to catch them`)
    }
  }
}
