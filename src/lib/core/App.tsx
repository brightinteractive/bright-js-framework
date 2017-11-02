import * as React from 'react'
import { History, Location } from 'history'
import { Router, RouteConfig } from './Router'
import { CONTROLLER_CONTEXT_TYPES, ControllerContext } from './Controller'
import { ApplicationContext } from './ApplicationContext';

export interface AppProps {
  routes: RouteConfig[]
  history: History
  appContext: ApplicationContext
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
  static childContextTypes: {} = CONTROLLER_CONTEXT_TYPES

  router = new Router(this.props.routes, this.props.history)

  state: AppState = {
    location: this.props.history.location,
  }

  getChildContext(): ControllerContext {
    return {
      '@appContext': this.props.appContext
    }
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
