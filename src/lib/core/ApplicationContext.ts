import { Store } from 'redux'
import { createStorePlugin, getStoreFromContext } from '../plugins/StorePlugin/StorePlugin'
import { InjectionContext } from './InjectionClient'
import { PluginConstructor, ContextValueMap, getPluginCreationOrder, getExportedDependencies, PluginConfig } from './PluginConfig'

export class ApplicationContext {
  readonly injectedObjects: ContextValueMap = {}
  readonly plugins: PluginConfig[] = []

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

  private constructPlugin(PluginType: PluginConstructor) {
    const instance = new PluginType(this.appContext)
    this.plugins.push(instance)

    getExportedDependencies(PluginType).forEach(({ dependencyId, propertyKey }) => {
      this.injectedObjects[dependencyId] = (instance as any)[propertyKey]
    })
  }
}
