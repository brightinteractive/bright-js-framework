import * as React from 'react'
import * as PropTypes from 'prop-types'

export interface Controller<Props extends object = {}, State extends object = {}> extends React.Component<Props, State> {
  context: ControllerContext
}

/** Shape of context passed into a controller */
export interface ControllerContext {
  '@injectedControllerDependencies': any
}

/** Field of a controller's context containing injected dependencies */
const INJECTED_DEPENDENCIES_KEY = '@injectedControllerDependencies'

/** Field of a controller's context types containing React context type metadata */
export const CONTROLLER_CONTEXT_TYPES = {
  [INJECTED_DEPENDENCIES_KEY]: PropTypes.any,
}

/** Prepare a component class for having services attached to it. */
export function decorateController(cls: React.ComponentClass): void {
  declareContextTypes()

  function declareContextTypes() {
    cls.contextTypes = {
      ...cls.contextTypes,
      ...CONTROLLER_CONTEXT_TYPES
    }
  }
}

/** Has this component been decorated as a controller? */
export function isController(x: React.Component): x is Controller {
  const ctor = x.constructor as React.ComponentClass
  return Boolean(ctor.contextTypes && INJECTED_DEPENDENCIES_KEY in ctor.contextTypes)
}
