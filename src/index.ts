/**
 * Bright-js-framework core API
 */

import * as React from 'react'

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
 * @param Params  Types of route parameters
 * @param Query   Expected types of query params object
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
 * Components of parsed page location
 */
export interface Location {
  /** Path extracted from page URL */
  pathname: string

  /** Query string extracted from page URL */
  search: string

  /** Hash string extracted from page URL */
  hash: string
}

/**
 * Drop-in replacement for HTML anchor element that makes frontend page transitions
 * instead of forcing a new page load. The accepted properties and behavior of the Link
 * element are otherwise identical to the anchor element.
 */
export const Link: React.ComponentClass<React.HTMLProps<{}>> = _Link
