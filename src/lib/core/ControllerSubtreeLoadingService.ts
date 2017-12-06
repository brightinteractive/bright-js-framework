import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Service, decorateServiceProperty } from './Service'
import { InjectionContext } from './InjectionClient'
import { LoadContext, load } from './load'

export interface ControllerSubtreeLoadingState {
  dynamicLoadState?: 'loading' | 'mounting-subtree' | 'mounted'
}

export interface ControllerSubtreeLoadingService extends Service {
  readonly childLoadContext?: LoadContext
  readonly shouldRender: boolean

  loadSubtreeIfNeeded(controller: React.ComponentClass, props: React.Props<{}>, cb: () => void): void
}

/**
 * When a controller is added into the DOM, data for it and its descendents may not yet be
 * available.
 *
 * This service exists to ensure that:
 *
 *  * On insertion into the virtual DOM, the data dependencies of a controller and its
 *    descendents are resolved.
 *
 *  * On insertion into the virtual DOM, a controller is not actually mounted and rendered
 *    onscreen until the data that it and its descendents depend on has been fetched.
 *
 *  * The load is not triggered recursively on each descendent controller. Since the load
 *    process recurses down the component tree itself, it only needs to be triggered on the
 *    root inserted controller.
 */
export function controllerSubtreeLoadingService(): PropertyDecorator {
  class ControllerSubtreeLoadingServiceImpl extends Service<ControllerSubtreeLoadingState> implements ControllerSubtreeLoadingService {
    /** Context types provided to controllers to indicate whether or not they need to load on mount */
    static loadContextTypes: Record<keyof LoadContext, PropTypes.Validator<{}>> = {
      '@parentHasMounted': PropTypes.bool
    }

    context: InjectionContext & LoadContext

    state: ControllerSubtreeLoadingState = {
      dynamicLoadState: this.context['@parentHasMounted'] ? 'loading' : undefined
    }

    get childLoadContext(): LoadContext | undefined {
      // If this controller is being loaded by something else, don’t do anything.
      if (!this.context['@parentHasMounted']) {
        return undefined
      }

      // Inform children that they don’t need to load themselves because this controller
      // has taken responsibility for loading them.
      if (this.state.dynamicLoadState === 'loading' || this.state.dynamicLoadState === 'mounting-subtree') {
        return { '@parentHasMounted': false }
      }

      // Inform any new descendents that they will need to load
      return { '@parentHasMounted': true }
    }

    /**
     * Should this controller (and its children) load data on mount.
     * If the parent has not yet mounted, it means we’re in the loading phase, so we render.
     */
    get shouldRender() {
      // This avoids recursively triggering the load process
      if (!this.context['@parentHasMounted']) {
        return true
      }

      return this.state.dynamicLoadState !== 'loading'
    }

    async loadSubtreeIfNeeded(controller: React.ComponentClass, props: React.Props<{}>, cb: () => void) {
      // This avoids recursively triggering the load process
      if (!this.context['@parentHasMounted']) {
        return cb()
      }

      this.setState({ dynamicLoadState: 'loading' })

      await load(React.createElement(controller, props))

      // Mount all descendents, then reqlinquish responsibility for loading descendents.
      this.setState({ dynamicLoadState: 'mounting-subtree' }, () => {
        this.setState({ dynamicLoadState: 'mounted' })
        cb()
      })
    }
  }

  return decorateServiceProperty(ControllerSubtreeLoadingServiceImpl)
}
