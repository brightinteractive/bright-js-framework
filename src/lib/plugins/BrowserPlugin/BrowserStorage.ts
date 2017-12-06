import {exportDependency, PluginConfig, PluginConstructor} from '../../core/PluginConfig'
import {BrowserStoragePluginProps, BrowserStorageSystem} from '../../../plugins/browserstorage/index'
import {inject} from '../../../index'

export const BROWSER_STORAGE = 'browserStorage'

const LocalStorageWrapper: BrowserStorageSystem = {
  get: (key: string) => localStorage.getItem(key),
  set: (key: string, value: string) => localStorage.setItem(key, value),
  clear: (key: string) => localStorage.removeItem(key),
}

export function createBrowserStoragePlugin(props: BrowserStoragePluginProps = {underlyingStorage: LocalStorageWrapper}): PluginConstructor {
  class BrowserStoragePlugin extends PluginConfig {
    @exportDependency(BROWSER_STORAGE)
    browserStorage = props.underlyingStorage
  }

  return BrowserStoragePlugin
}

export const injectBrowserStorage = inject(BROWSER_STORAGE)
