import * as tslib from 'tslib'
import { Location, createMemoryHistory, History } from 'history'
import { filter, uniqueId } from 'lodash'
import { PluginConstructor, PluginConfig } from '../core/PluginConfig'
import { ApplicationContext } from '../core/ApplicationContext'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin'
import { Store } from 'redux';

export interface TestFixtureProps {
  plugins?: PluginConstructor[]
  location?: string
  hostname?: string
  host?: string
  protocol?: string
  port?: number
}

export abstract class TestFixture<Instance> {
  readonly history: History = createMemoryHistory()
  protected appContext: ApplicationContext

  constructor({ plugins = [], location = '/' }: TestFixtureProps) {
    this.history.push(location)
    this.appContext = new ApplicationContext([
      ...plugins,
      createBrowserPlugin({ history: this.history })
    ])
  }

  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T {
    const matches = filter(this.appContext.plugins, (x) => x instanceof constructor) as T[]

    if (!matches[0]) {
      throw new Error(`Could not find installed plugin of type ${constructor.name}`)
    }

    return matches[0]
  }

  apply<T>(decorator: PropertyDecorator): T {
    const result: PropertyDescriptor = tslib.__decorate([decorator], this.instance, uniqueId('decoratedProperty'))
    if (!result || !result.get) {
      throw new Error('Invalid decorator')
    }

    return result.get.call(this.instance)
  }

  abstract get instance(): Instance

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }
}
