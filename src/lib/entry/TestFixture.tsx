import * as React from 'react'
import { filter } from 'lodash'
import { mount, ReactWrapper } from 'enzyme'
import { PluginConstructor, PluginConfig } from '../core/PluginConfig'
import { ApplicationContext } from '../core/ApplicationContext'
import { ContextProvider } from '../core/ContextProvider'
import { Store } from 'redux';

export interface TestFixtureProps {
  plugins?: PluginConstructor[]
  markup: React.ReactElement<{}>
}

export class TestFixture {
  private reactWrapper: ReactWrapper
  private markup: React.ReactElement<{}>
  private appContext: ApplicationContext

  constructor({ plugins, markup }: TestFixtureProps) {
    this.appContext = new ApplicationContext(plugins)
    this.markup = markup
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

  get store(): Store<any> {
    return this.appContext.store
  }
}
