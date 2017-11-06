/**
 * Bright-js-framework core API
 */

import * as React from 'react'

import { decorateRouteComponent } from './lib/core/route'
import { decorateController } from './lib/core/Controller'
import { Service as _Service, decorateServiceProperty } from './lib/core/Service'
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
export function route(path: string): ComponentDecorator<RouteProps> {
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

/**
 * Declare that a component is a controller.
 *
 * You must annotate a React Component as a controller before attaching services to it.
 * You do not need to annotate a service before attaching other services to it.
 */
export function controller(): ComponentDecorator {
  return (cls) => decorateController(cls)
}

/**
 * Attach a service to a property of a controller or other service.
 *
 * You must annotate a React Component as a controller before attaching services to it.
 * You do not need to annotate a service before attaching other services to it.
 *
 * ```
 *  @controller
 *  class Foo extends React.Component {
 *    @service(MyService)
 *    myService: MyService
 *  }
 * ```
 */
export function service(constructor: new () => Service): PropertyDecorator {
  return decorateServiceProperty(constructor)
}

/**
 * Base class for creating Services.
 *
 * Services are classes that have access to a subset of the React Component API.
 * They are owned by a parent component, and receive lifecycle events.
 *
 * @class
 */
export interface Service<State = {}> {
  /**
   * Called before a service’s parent controller mounts or before it is statically rendered.
   *
   * Corresponds to React’s componentWillMount()
   */
  serviceWillMount?: () => void

  /**
   * Called after a service’s parent controller mounts. Not called when the component is statically rendered.
   *
   * Corresponds to React’s componentDidMount()
   */
  serviceDidMount?: () => void

  /**
   * Called before a service’s parent controller unmounts. Not called when the component is statically rendered.
   *
   * Corresponds to React’s componentWillUnmount()
   */
  serviceWillUnmount?: () => void

  readonly state: State
  setState(state: Partial<State>): void
}

export const Service: new <State>() => Service<State> = _Service

export type ComponentDecorator<Props = {}> = (cls: React.ComponentClass<Props>) => void
export type PropertyDecorator = (proto: any, key: string) => any
