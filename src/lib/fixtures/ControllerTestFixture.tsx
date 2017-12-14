import * as React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { ContextProvider } from '../core/ContextProvider'
import { load } from '../core/load'
import { mountSpy } from '../plugins/ControllerMountSpyPlugin/ControllerMountSpyPlugin'
import { TestFixture, TestFixtureProps } from './TestFixture'

export interface ControllerTestFixtureProps extends TestFixtureProps {
  markup: React.ReactElement<{}>
}

export class ControllerTestFixture<Controller extends React.Component = React.Component> extends TestFixture<Controller> {
  private reactWrapper: ReactWrapper
  private markup: React.ReactElement<{}>

  static async create<Controller extends React.Component>(props: ControllerTestFixtureProps) {
    const instance = new ControllerTestFixture<Controller>(props)
    await instance.load()
    return instance
  }

  private constructor({ plugins = [], markup, ...superProps }: ControllerTestFixtureProps) {
    super({
      ...superProps,
      plugins: [
        ...plugins,
        mountSpy()
      ]
    })
    this.markup = markup
  }

  get instance(): Controller {
    return this.render().childAt(0).instance() as any
  }

  render() {
    if (!this.reactWrapper) {
      this.reactWrapper = mount(
        <ContextProvider appContext={this.appContext}>
          {this.markup}
        </ContextProvider>
      )
    }

    return this.reactWrapper.update()
  }

  waitForController(type: React.ComponentClass) {
    return this.getPlugin(mountSpy()).waitFor((controller: any) => controller.constructor === type)
  }

  unmount() {
    this.render().unmount()
  }

  private load() {
    return load(
      <ContextProvider appContext={this.appContext}>
        {this.markup}
      </ContextProvider>
    )
  }
}
