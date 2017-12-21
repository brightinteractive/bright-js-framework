import { Store } from 'redux'
import { createStorePlugin, getStoreFromContext } from '../plugins/StorePlugin/StorePlugin'
import { InjectionContext } from './InjectionClient'
import { PluginConstructor, ContextValueMap, getPluginCreationOrder, getExportedDependencies, PluginConfig } from './PluginConfig'
import { gatherServices, ServiceContainer, initializeService } from './Service';

export class ApplicationContext {
  readonly plugins: PluginConfig[] = []

  private injectedObjects: ContextValueMap = new Map()
  private appContext: InjectionContext

  get store(): Store<any> {
    return getStoreFromContext(this.appContext)
  }

  constructor(pluginConstructors: PluginConstructor[] = []) {
    this.appContext = {
      '@appContext': this
    }

    const orderedConstructors = getPluginCreationOrder([
      ...pluginConstructors,
      // Special case. This plugin dependes on store reducers exported as a static
      // property of other plugin configs, but exports a dependency that others may inject
      // on construction.
      createStorePlugin(pluginConstructors)
    ])

    orderedConstructors.forEach((constructor) => this.constructPlugin(constructor))
  }

  async loadPlugins() {
    for (const plugin of this.plugins) {
      const services = [plugin, ...gatherServices(plugin)]

      await Promise.all(services.map(async (service) => {
        if (service.serviceWillLoad) {
          await service.serviceWillLoad()
        }
      }))
    }
  }

  findPluginOfType<T>(type: new (...args: any[]) => T): T {
    const match = this.plugins.find((plugin) => plugin instanceof type)
    if (!match) {
      throw new Error(`No plugin of type ${type} installed`)
    }

    return match as any
  }

  getInjectedObject(key: {}) {
    return this.injectedObjects.get(key)
  }

  injectObject(key: {}, value: {}) {
    this.injectedObjects.set(key, value)
  }

  private constructPlugin(PluginType: PluginConstructor) {
    const instance = new PluginType(this.appContext)
    this.plugins.push(instance)

    getExportedDependencies(PluginType).forEach(({ dependencyId, propertyKey }) => {
      this.injectedObjects.set(dependencyId, (instance as any)[propertyKey])
    })
  }
}
