import { PluginConfig, exportDependency, PluginConstructor } from '../../core/PluginConfig'
import { memoize } from 'lodash';

export type MountSpyCondition = (x: React.Component) => boolean

export interface MountSpyObserver {
  condition: MountSpyCondition
  resolve: () => void
}

export interface ControllerMountSpyPlugin extends PluginConfig {
  waitFor(condition: MountSpyCondition): Promise<void>
}

export interface ControllerMountSpy {
  didMount(controller: React.Component): void
}

export const ControllerMountSpy = 'ControllerMountSpy'

export const mountSpy: () => PluginConstructor<ControllerMountSpyPlugin> = memoize(() => {
  class ControllerMountSpyPluginImpl extends PluginConfig implements ControllerMountSpyPluginImpl {
    private observers: MountSpyObserver[] = []

    waitFor(condition: MountSpyCondition): Promise<void> {
      return new Promise((resolve) => {
        this.observers.push({ condition, resolve })
      })
    }

    @exportDependency(ControllerMountSpy)
    mountSpy: ControllerMountSpy = {
      didMount: (controller: React.Component) => {
        this.observers.forEach((observer) => {
          if (observer.condition(controller)) {
            observer.resolve()
          }
        })
      }
    }
  }

  return ControllerMountSpyPluginImpl
})
