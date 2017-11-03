import * as React from 'react'
import { CONTROLLER_CONTEXT_TYPES } from './Controller'
import { InjectionContext } from './InjectionClient'
import { ApplicationContext } from './ApplicationContext'

export interface ContextProviderProps {
  appContext: ApplicationContext
}

export class ContextProvider<Props extends ContextProviderProps = ContextProviderProps> extends React.PureComponent<Props> {
  static childContextTypes: {} = CONTROLLER_CONTEXT_TYPES

  getChildContext(): InjectionContext {
    return {
      '@appContext': this.props.appContext
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
