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
   * Stub all plugins of a particular type
   *
   * @param constructor Type of the plugins to stub
   * @param stubFn      Customizer function. It receives an instance of the plugin, which can be
   *                    used to customize its behavior.
   */
  stub<T extends PluginConfig>(constructor: PluginConstructor<T>, stubFn: (fn: T) => void): TestFixture
}

export const TestFixture: new (props: TestFixtureProps) => TestFixture = _TestFixture
