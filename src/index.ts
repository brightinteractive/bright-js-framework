/**
 * Bright-js-framework core API
 */

import * as React from 'react'

import { decorateRouteComponent } from './lib/core/route'
import { decorateController } from './lib/core/Controller'
import { Service as _Service, decorateServiceProperty } from './lib/core/Service'
import { Link as _Link } from './lib/components/Link'
import { PluginConfig as _PluginConfig, exportDependency } from './lib/core/PluginConfig'
import { injectDependency } from './lib/core/InjectionClient'
import { injectDispatch } from './lib/plugins/StorePlugin/StorePlugin'
import { createSelectService } from './lib/plugins/StorePlugin/SelectService'
import { declareReducer } from './lib/core/declareReducer'

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
export function route(path: string): ComponentDecorator<RouteProps<any, any>> {
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
export interface RouteProps<Params = {}, Query = {}> {
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
 * Services are unique to the controller that they are attached to.
 * This differs from dependencies injected using plugins, which are shared amongst the whole
 * application.
 *
 * ```
 *  @controller()
 *  class Foo extends React.Component {
 *    @service(MyService)
 *    myService: MyService
 *  }
 * ```
 */
export function service(constructor: ServiceConstructor): PropertyDecorator {
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

  context: ServiceContext
}

export type ServiceConstructor<State = {}> = new (context: ServiceContext) => Service<State>
export const Service: new <State>(context: ServiceContext) => Service<State> = _Service

/** Opaque object passed into service constructors */
export interface ServiceContext {
  '@appContext': any
}

/**
 * Configuration class for providing additonal features (such as data-fetching, authentication
 * providers, etc) to an application.
 *
 * Plugins declare dependencies by using the @exported decorator.
 *
 * @class
 */
export interface PluginConfig<T = {}> extends Service<T> { }
export const PluginConfig = _PluginConfig

export type PluginConstructor<T extends PluginConfig = PluginConfig> = new (context: ServiceContext) => T

/**
 * Declare that a property of a PluginConfig is available for injection into components
 * and services.
 *
 * @param id Identifier used to inject the dependency when provided to @inject decorator.
 */
export function exported(id: string): PropertyDecorator {
  return exportDependency(id)
}

/**
 * Declare that a property of a Controller, Service or PluginContext should be fulfilled
 * using dependency injection.
 *
 * Objects injected by plugins are shared between the whole application.
 * This differes from services, which are unique to each controller.
 *
 * @param id Identifier of the dependency to inject.
 */
export function inject(id: string): PropertyDecorator {
  return injectDependency(id)
}

/**
 * Object describing a mutation to the application datastore.
 */
export interface Action {
  type: string
  [key: string]: any | undefined
}

/**
 * Function describing how to select data from the application datastore.
 *
 * Passed to the @select() decorator
 */
export interface SelectFn<T> {
  (state: any): T
}

/**
 * Service created by the @select decorator containing current value of
 * an application state subscription.
 */
export interface StateSelection<T> {
  value: T
}

/** Dispatcher function injected by the @dispatcher() decorator */
export interface Dispatcher {
  (action: Action): void
}

/**
 * Declare how to manage state changes for an aspect of application state.
 *
 * State changes are managed using reducer functions, which take the previous state
 * of part of the application store and an action describing a mutation, then return
 * the next state of the store.
 *
 * State reducers are defined by decorating a static method of a plugin with a `@state()` decorator.
 *
 * ```
 *  class CounterPlugin extends PluginConfig {
 *    @state()
 *    static update(state: number = 0, action: Action) {
 *      if (action.type === 'counter:increment') {
 *        return state + 1
 *      }
 *
 *      return state
 *    }
 *  }
 * ```
 *
 * @param key Key of the application’s store to manage using the decorated function
 */
export function state(key: string): PropertyDecorator {
  return declareReducer(key)
}

/**
 * Injects a StateSelector into the component
 *
 * ```
 *  class Counter extends React.PureComponent {
 *    @select(Counter.getValue)
 *    counter: StateSelector<number>
 *
 *    render() {
 *      return <div>{this.counter.value}</div>
 *    }
 *  }
 * ```
 */
export function select<T>(selectFn: SelectFn<T>): PropertyDecorator {
  return createSelectService(selectFn)
}

/**
 * Injects the application’s action dispatcher into a controller or service
 */
export function dispatcher(): PropertyDecorator {
  return injectDispatch
}

export type ComponentDecorator<Props = {}> = (cls: React.ComponentClass<Props>) => void
export type PropertyDecorator = (proto: any, key: string) => any
