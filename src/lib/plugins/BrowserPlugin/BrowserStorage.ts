import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {BrowserStorageSystem} from '../../../plugins/browserstorage/index'
import {inject} from '../../../index'

export const BROWSER_STORAGE = 'browserStorage'

const LocalStorageWrapper: BrowserStorageSystem = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
  clear: (key: string) => localStorage.removeItem(key),
}

export function createBrowserStoragePlugin(): PluginConstructor {
  class BrowserStoragePlugin extends PluginConfig {
    @exportDependency(BROWSER_STORAGE)
    browserStorage = LocalStorageWrapper
  }

  return BrowserStoragePlugin
}

export function createInMemoryBrowserStoragePlugin(contents: {}): PluginConstructor {
  class BrowserStoragePlugin extends PluginConfig {
    data: Record<string, string | undefined> = { ...contents }

    @exportDependency(BROWSER_STORAGE)
    browserStorage: BrowserStorageSystem = {
      get: (key: string) => this.data[key] || null,
      set: (key: string, value: string) => {
        this.data[key] = value
      },
      clear: () => {
        this.data = {}
      }
    }
  }

  return BrowserStoragePlugin
}

export const injectBrowserStorage = inject(BROWSER_STORAGE)
