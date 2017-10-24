import * as React from 'react'
import { Location } from 'history'

import { decorateRouteComponent } from './lib/core/route'

/**
 * Declare a component as a route and associate a path with it.
 *
 * All components in your project's pages directory (by default, `src/pages`)
 * that are decorated with @route() will be served to users.
 *
 * ```
 * interface MyRouteParams {
 *   name: string
 * }
 *
 * @route('/sayHello/:name')
 * class MyRoute extends React.PureComponent<RouteProps<MyRouteParams>> {
 *   render() {
 *     return <div>Hello, {this.props.pathParams.name}</div>
 *   }
 * }
 * ```
 */
export function route(path: string): (ComponentClass: React.ComponentClass<RouteProps>) => void {
  return (ComponentClass) => {
    decorateRouteComponent(path, ComponentClass)
  }
}

/**
 * Props
 */
export interface RouteProps<Params = {}, Query = {}> {
  /** Location of the current matched route */
  location: Location

  /** Values extracted from path components */
  pathParams: Params

  /** Values extracted from url query params */
  queryParams: Query
}
