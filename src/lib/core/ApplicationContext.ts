import { PluginConstructor, ContextValueMap, getPluginCreationOrder, getExportedDependencies, PluginConfig } from './PluginConfig'

export class ApplicationContext {
  readonly injectedObjects: ContextValueMap = {}
  readonly plugins: PluginConfig[] = []

  constructor(pluginConstructors: PluginConstructor[] = []) {
    const orderedConstructors = getPluginCreationOrder(pluginConstructors)
    orderedConstructors.forEach((constructor) => this.constructPlugin(constructor))
  }

  private constructPlugin(PluginType: PluginConstructor) {
    const instance = new PluginType({
      '@appContext': this
    })
    this.plugins.push(instance)

    getExportedDependencies(PluginType).forEach(({ dependencyId, propertyKey }) => {
      this.injectedObjects[dependencyId] = (instance as any)[propertyKey]
    })
  }
}
