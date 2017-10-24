import RouteRecognizer from 'route-recognizer'
import * as React from 'react'
import { createMemoryHistory, Action, Location, LocationDescriptor, History } from 'history'
import { RouteProps } from '../../index'

export interface RouteConfig {
  path: string
  handler: React.ComponentType<RouteProps>
}

export type Match
  = undefined
  | MatchedRoute

export interface MatchedRoute extends RouteProps<any, any> {
  handler: React.ComponentType<any>
}

export class Router {
  static match(location: LocationDescriptor, routes: RouteConfig[], action: Action): Match {
    const router = new Router(routes, createMemoryHistory())
    router.set(location, action)
    return router.route
  }

  private recognizer = createRecognizer()
  private history: History

  constructor(routes: RouteConfig[], history: History) {
    routes.forEach((route) => {
      this.recognizer.add([route])
    })

    this.history = history
  }

  get route(): Match {
    const matches = this.recognizer.recognize(this.path)
    if (!matches) {
      return undefined
    }

    const match = matches[0]

    /* istanbul ignore next */
    if (!match) {
      return undefined
    }

    const { handler, params } = match
    return {
      handler: handler as any,
      pathParams: params,
      location: this.history.location,
      queryParams: matches.queryParams || {},
    }
  }

  get path() {
    return stringifyLocation(this.history.location)
  }

  set(path: LocationDescriptor, action: Action) {
    if (action === 'PUSH') {
      this.history.push(path as any)

    } else if (action === 'POP') {
      this.history.replace(path as any)
    }
  }
}

function stringifyLocation(l: Location) {
  return (
    l.pathname
    + (l.search || '')
  )
}

function createRecognizer() {
  // Workaround for incorrect route-recognizer types
  // https://github.com/tildeio/route-recognizer/issues/136
  const RR: typeof RouteRecognizer = require('route-recognizer').default || require('route-recognizer')
  return new RR()
}
