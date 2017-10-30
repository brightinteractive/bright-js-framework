import * as React from 'react'
import { History, Location } from 'history'
import { Router, RouteConfig } from './Router'

export interface AppProps {
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
export class App extends React.PureComponent<AppProps> {
  router = new Router(this.props.routes, this.props.history)

  state: AppState = {
    location: this.props.history.location,
  }

  render() {
    const { route } = this.router

    if (route) {
      const Handler = route.handler
      return <Handler {...route} />

    } else {
      throw new Error(`You don't have a page set up to handle 404s. Add a new page with @route('*') to catch them`)
    }
  }
}
