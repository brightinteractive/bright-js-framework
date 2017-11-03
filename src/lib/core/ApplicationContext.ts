import { PluginConstructor, ContextValueMap, getPluginCreationOrder, getExportedDependencies } from './PluginConfig'

export class ApplicationContext {
  readonly injectedObjects: ContextValueMap = {}

  constructor(pluginConstructors: PluginConstructor[] = []) {
    const orderedConstructors = getPluginCreationOrder(pluginConstructors)
    orderedConstructors.forEach((constructor) => this.constructPlugin(constructor))
  }

  private constructPlugin(PluginType: PluginConstructor) {
    const instance = new PluginType({
      '@appContext': this
    })

    getExportedDependencies(PluginType).forEach(({ dependencyId, propertyKey }) => {
      this.injectedObjects[dependencyId] = (instance as any)[propertyKey]
    })
  }
}
