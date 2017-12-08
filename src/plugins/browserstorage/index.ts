import {PluginConstructor} from '../../index'
import {
  createBrowserStoragePlugin,
  injectBrowserStorage,
} from '../../lib/plugins/BrowserPlugin/BrowserStorage'

export interface BrowserStorageSystem {
  /**
   * Gets the current value of the key from the underlying storage mechanism
   */
  get(key: string): string | null

  /**
   * Updates the value in the underlying storage mechanism
   */
  set(key: string, value: string): void

  /**
   * Removes the value (if present) associated with this key
   */
  clear(key: string): void
}

export interface BrowserStoragePluginProps {
  /**
   * The storage mechanism to be used by the plugin
   */
  underlyingStorage: BrowserStorageSystem
}

/**
 * Constructs a plugin that allows access to browser-scoped storage
 *
 * (Defaults to using localStorage if no props are provided)
 */
export default function browserStoragePlugin(): PluginConstructor {
  return createBrowserStoragePlugin()
}

/**
 * Grabs the currently-in-use browser storage mechanism
 */
export function browserStorage(): PropertyDecorator {
  return injectBrowserStorage
}