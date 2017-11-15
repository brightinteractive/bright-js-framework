import RouteRecognizer from 'route-recognizer'
import * as React from 'react'
import { Location } from 'history'
import { RouteProps } from '../../index'

export interface RouteConfig {
  path: string
  handler: React.ComponentType<RouteProps>
}

export type Match
  = undefined
  | MatchedRoute

export interface MatchedRoute extends RouteProps<string, string> {
  handler: React.ComponentType<any>
}

export class Router {
  private recognizer = createRecognizer()

  constructor(routes: RouteConfig[]) {
    routes.forEach((route) => {
      this.recognizer.add([route])
    })
  }

  match(location: Location): Match {
    const path = stringifyLocation(location)
    const matches = this.recognizer.recognize(path)
    if (!matches) {
      return undefined
    }

    // RouteRecognizer allows a route's path to be split into multiple segments, each with
    // handlers at different points along the path. https://github.com/tildeio/route-recognizer
    //
    // Since we don't split our routes into segments, there will only ever be one handler.
    const match = matches[0]

    // Unclear why the typings for RouteRecognizer suggest that this may be undefined, but it never
    // appears to actually be undefined (no route match returns undefined for the whole array)
    /* istanbul ignore next */
    if (!match) {
      return undefined
    }

    const { handler, params } = match
    return {
      handler: handler as any,
      pathParams: params as Record<string, string>,
      location,
      queryParams: matches.queryParams || {},
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
