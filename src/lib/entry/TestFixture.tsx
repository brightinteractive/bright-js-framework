import * as React from 'react'
import { Store } from 'redux'
import { Location, createMemoryHistory, History } from 'history'
import { filter } from 'lodash'
import { mount, ReactWrapper } from 'enzyme'
import { PluginConstructor, PluginConfig } from '../core/PluginConfig'
import { ApplicationContext } from '../core/ApplicationContext'
import { ContextProvider } from '../core/ContextProvider'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin';

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
      createBrowserPlugin({ history: this.history })
    ])
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

  stub<T extends PluginConfig>(constructor: PluginConstructor<T>, stubFn: (fn: T) => void) {
    const matches = filter(this.appContext.plugins, (x) => x instanceof constructor) as T[]
    matches.forEach(stubFn)

    return this
  }

  getInstance<T>() {
    return this.render().childAt(0).instance() as any as T
  }

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }
}
