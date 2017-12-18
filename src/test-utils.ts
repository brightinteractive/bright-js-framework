import { PluginConfig, PluginConstructor, ServiceContext, Location, Service } from './index'
import { ControllerTestFixture as _ControllerTestFixture } from './lib/fixtures/ControllerTestFixture'
import { ServiceTestFixture as _ServiceTestFixture } from './lib/fixtures/ServiceTestFixture'

export interface TestFixtureProps {
  /** Array of plugins to provide to the test context */
  plugins?: PluginConstructor[]

  /** Location string used to match route. Defaults to '/' */
  location?: string

  /** Optional base url provided to application services. Defaults to http://localhost */
  baseUrl?: string
}

/**
 * Utility class for providing the application context to classes that require it.
 *
 * You can optionally provide an array of plugins, which should generally be stub implementations
 * of interfaces used in your applications. These can be stubbed using the `stub()` method.
 *
 * @class
 */
export interface TestFixture<Instance> {
  /** The subject of the test fixture (component, service, plugin, etc) */
  readonly instance: Instance

  /**
   * Apply a property decorator to instance and return the result of the decorated property.
   */
  apply<T>(decorator: PropertyDecorator): T

  /**
   * Get a plugin of a specified type. If it exists, it will be returned.
   * If it does not exist, an exception is thrown.
   *
   * @param constructor Type of the plugins to search for.
   */
  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T

  /** Unmount the test case */
  unmount(): void

  /** Current page location */
  location: Location
}

export interface ControllerTestFixtureProps extends TestFixtureProps {
  /** Markup to render in the specified fixture’s context */
  markup: React.ReactElement<{}>
}

/**
 * Utility class for providing the application context to a react component and mounting
 * test components using enzyme.
 *
 * @class
 */
export interface ControllerTestFixture<T> extends TestFixture<T> {
  /** Render the test case into an Enzyme wrapper suitable for performing assertions against */
  render(): any

  /**
   * Return a promise that resolves when a controller of a specific type has finished loading.
   * Useful for waiting until an async action has completed before making a test assertion.
   */
  waitForController(type: React.ComponentClass): Promise<void>
}

export function controllerTestFixture<Controller extends React.Component>(props: ControllerTestFixtureProps): Promise<ControllerTestFixture<Controller>> {
  return _ControllerTestFixture.create(props)
}

export interface ServiceTestFixtureProps<ServiceType extends Service<any>> extends TestFixtureProps {
  /** Tested service */
  service: new (context: ServiceContext, parent: {}) => ServiceType
  props?: any
}

/**
 * Utility class for providing the application context to a service, including lifecycle hooks and injecting all dependencies
 *
 * You can optionally provide an array of plugins, which should generally be stub implementations
 * of interfaces used in your applications. These can be stubbed using the `stub()` method.
 *
 * @class
 */
export interface ServiceTestFixture<ServiceType extends Service> extends TestFixture<ServiceType> {
  readonly service: ServiceType

  /**
   * Get a plugin of a specified type. If it exists, it will be returned.
   * If it does not exist, an exception is thrown.
   *
   * @param constructor Type of the plugins to search for.
   */
  getPlugin<PluginType extends PluginConfig>(constructor: PluginConstructor<PluginType>): PluginType

  /** Unmount the test case */
  unmount(): void

  /** Current page location */
  location: Location
}

export function serviceTestFixture<ServiceType extends Service>(props: ServiceTestFixtureProps<ServiceType>): Promise<ServiceTestFixture<ServiceType>> {
  return _ServiceTestFixture.create(props)
}
