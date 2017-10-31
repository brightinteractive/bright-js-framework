/**
 * Bright-js-framework core API
 */

import * as React from 'react'
import { Location } from 'history'

import { decorateRouteComponent } from './lib/core/route'
import { Link as _Link } from './lib/components/Link'

/**
 * Declare a component as a route and associate a path with it.
 * All components in your project's pages directory (by default, `src/pages`)
 * that are decorated with @route will be served to users.
 *
 * ```
 *   interface MyRouteParams {
 *     name: string
 *   }
 *
 *   @route('/sayHello/:name')
 *   class MyRoute extends React.PureComponent<RouteProps<MyRouteParams>> {
 *     render() {
 *       return <div>Hello, {this.props.pathParams.name}</div>
 *     }
 *   }
 * ```
 *
 * @param path  Path pattern to serve the route from
 */
export function route(path: string): (ComponentClass: React.ComponentClass<RouteProps>) => void {
  return (ComponentClass) => {
    decorateRouteComponent(path, ComponentClass)
  }
}

/**
 * Props passed into a component annotated with @route
 *
 * @param Params  Type of route parameters (string => string map)
 * @param Query   Expected types of query params object (string => string map)
 */
export interface RouteProps<Params extends Record<string, string> = {}, Query extends Record<string, string | undefined> = {}> {
  /** Location of the current matched route */
  location: Location

  /** Values extracted from path components */
  pathParams: Params

  /** Values extracted from url query params */
  queryParams: Query
}

/**
 * Drop-in replacement for HTML anchor element that makes frontend page transitions
 * instead of forcing a new page load. The accepted properties and behavior of the Link
 * element are otherwise identical to the anchor element.
 */
export const Link: React.ComponentClass<React.HTMLProps<{}>> = _Link