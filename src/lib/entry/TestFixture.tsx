import * as React from 'react'
import { Store } from 'redux'
import { Location, createMemoryHistory, History } from 'history'
import { filter } from 'lodash'
import { mount, ReactWrapper } from 'enzyme'
import { PluginConstructor, PluginConfig } from '../core/PluginConfig'
import { ApplicationContext } from '../core/ApplicationContext'
import { ContextProvider } from '../core/ContextProvider'
import { load } from '../core/load'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin'
import { mountSpy } from '../plugins/ControllerMountSpyPlugin/ControllerMountSpyPlugin'

export interface TestFixtureProps {
  plugins?: PluginConstructor[]
  location?: string
  markup: React.ReactElement<{}>
}

export class TestFixture {
  readonly history: History = createMemoryHistory()
  private reactWrapper: ReactWrapper
  private markup: React.ReactElement<{}>
  private appContext: ApplicationContext

  constructor({ plugins = [], markup, location = '/' }: TestFixtureProps) {
    this.history.push(location)
    this.markup = markup
    this.appContext = new ApplicationContext([
      ...plugins,
      mountSpy(),
      createBrowserPlugin({ history: this.history })
    ])
  }

  load() {
    return load(
      <ContextProvider appContext={this.appContext}>
        {this.markup}
      </ContextProvider>
    )
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

  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T {
    const matches = filter(this.appContext.plugins, (x) => x instanceof constructor) as T[]

    if (!matches[0]) {
      throw new Error(`Could not find installed plugin of type ${constructor.name}`)
    }

    return matches[0]
  }

  getInstance<T = any>(): T {
    return this.render().childAt(0).instance() as any
  }

  waitForController(type: React.ComponentClass) {
    return this.getPlugin(mountSpy()).waitFor((controller: any) => controller.constructor === type)
  }

  unmount() {
    this.render().unmount()
  }

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }
}
