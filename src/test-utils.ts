import { TestFixture as _TestFixture } from './lib/entry/TestFixture'
import { PluginConfig, PluginConstructor } from './index'

export interface TestFixtureProps {
  /** Array of plugins to provide to the test context */
  plugins?: PluginConstructor[]

  /** Markup describing the component to render */
  markup: React.ReactElement<{}>
}

/**
 * Utility class for providing the application context to a react component and mounting
 * test components using enzyme.
 *
 * You can optionally provide an array of plugins, which should generally be stub implementations
 * of interfaces used in your applications. These can be stubbed using the `stub()` method.
 *
 * @class
 */
export interface TestFixture {
  /** Render the test case into an Enzyme wrapper suitable for performing assertions against */
  render(): any

  /**
   * Get a plugin of a specified type. If it exists, it will be returned.
   * If it does not exist, an exception is thrown.
   *
   * @param constructor Type of the plugins to search for.
   */
  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T

  /**
   * Get the root object rendered by the component.
   */
  getInstance<T = any>(): T

  /**
   * Return a promise that resolves when a controller of a specific type has finished loading.
   * Useful for waiting until an async action has completed before making a test assertion.
   */
  waitForController(type: React.ComponentClass): Promise<void>

  /** Unmount the test case */
  unmount(): void
}

export const TestFixture: new (props: TestFixtureProps) => TestFixture = _TestFixture
