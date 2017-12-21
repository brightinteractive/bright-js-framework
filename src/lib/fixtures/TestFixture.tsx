import * as tslib from 'tslib'
import * as url from 'url'
import { Location, createMemoryHistory, History } from 'history'
import { Store } from 'redux'
import { filter, uniqueId } from 'lodash'
import { PluginConstructor, PluginConfig } from '../core/PluginConfig'
import { ApplicationContext } from '../core/ApplicationContext'
import { createBrowserPlugin } from '../plugins/BrowserPlugin/BrowserPlugin'
import { ServiceConstructor, Service, decorateServiceProperty } from '../core/Service'
import { createSelectService, StateSelector } from '../plugins/StorePlugin/SelectService'
import { createSelectSpyService, SelectSpy } from '../plugins/StorePlugin/SelectorSpyService'

export interface TestFixtureProps {
  plugins?: PluginConstructor[]
  location?: string
  baseUrl?: string
}

export abstract class TestFixture<Instance> {
  readonly history: History = createMemoryHistory()
  protected appContext: ApplicationContext

  constructor({ plugins = [], location = '/', baseUrl = 'http://localhost' }: TestFixtureProps) {
    this.history.push(location)
    this.appContext = new ApplicationContext([
      ...plugins,
      createBrowserPlugin({
        history: this.history,
        hostInfo: url.parse(baseUrl)
      })
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

  applyService<S extends Service>(serviceType: ServiceConstructor<S>): S {
    return this.apply(decorateServiceProperty(serviceType))
  }

  applySelector<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): T {
    return this.apply<StateSelector<T>>(createSelectService(selectFn, () => props)).value
  }

  spySelector<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): T[] {
    return this.apply<SelectSpy<T>>(createSelectSpyService(selectFn, () => props)).values
  }

  nextSelectorValue<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): Promise<T> {
    return this.apply<SelectSpy<T>>(createSelectSpyService(selectFn, () => props)).nextValue()
  }

  abstract get instance(): Instance

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }
}
