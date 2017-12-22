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

  abstract get instance(): Instance

  get location(): Location {
    return this.history.location
  }

  get store(): Store<any> {
    return this.appContext.store
  }

  getPlugin<T extends PluginConfig>(constructor: PluginConstructor<T>): T {
    const matches = filter(this.appContext.plugins, (x) => x instanceof constructor) as T[]

    if (!matches[0]) {
      throw new Error(`Could not find installed plugin of type ${constructor.name}`)
    }

    return matches[0]
  }

  async apply<T>(decorator: PropertyDecorator): Promise<T> {
    const result: PropertyDescriptor = tslib.__decorate([decorator], this.instance, uniqueId('decoratedProperty'))
    if (!result || !result.get) {
      throw new Error('Invalid decorator')
    }

    const value = result.get.call(this.instance)

    if (value instanceof Service) {
      await this.initializeService(value)
    }

    return value
  }

  applyService<S extends Service>(serviceType: ServiceConstructor<S>): Promise<S> {
    return this.apply(decorateServiceProperty(serviceType))
  }

  async applySelector<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): Promise<T> {
    const selector = await this.apply<StateSelector<T>>(createSelectService(selectFn, () => props))
    return selector.value
  }

  async spySelector<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): Promise<T[]> {
    const spy = await this.apply<SelectSpy<T>>(createSelectSpyService(selectFn, () => props))
    return spy.values
  }

  async nextValueOf<T, Props>(selectFn: (x: any, props?: Props) => T, props?: Props): Promise<T> {
    const spy = await this.apply<SelectSpy<T>>(createSelectSpyService(selectFn, () => props))
    return spy.nextValue()
  }

  private async initializeService(service: Service) {
    if (service.serviceWillMount) {
      service.serviceWillMount()
    }

    if (service.serviceWillLoad) {
      await service.serviceWillLoad()
    }

    if (service.serviceDidMount) {
      service.serviceDidMount()
    }
  }
}
