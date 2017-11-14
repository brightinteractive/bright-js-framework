import * as React from 'react'
import { History, Location } from 'history'
import { Router, RouteConfig } from './Router'
import { ContextProviderProps, ContextProvider } from './ContextProvider'

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
export class App extends ContextProvider<AppProps> {
  router = new Router(this.props.routes)
  unsubscribeHistory: () => void

  state: AppState = {
    location: this.props.history.location,
  }

  handlePageTransition: History.LocationListener = (location) => {
    this.setState({ location })
  }

  componentDidMount() {
    this.unsubscribeHistory = this.props.history.listen(this.handlePageTransition)
  }

  componentWillUnmount() {
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
