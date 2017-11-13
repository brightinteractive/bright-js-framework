import * as React from 'react'
import { CONTROLLER_CONTEXT_TYPES } from './Controller'
import { InjectionContext } from './InjectionClient'
import { ApplicationContext } from './ApplicationContext'

export interface ContextProviderProps {
  appContext: ApplicationContext
}

export class ContextProvider<Props extends ContextProviderProps = ContextProviderProps> extends React.PureComponent<Props> {
  static childContextTypes: {} = CONTROLLER_CONTEXT_TYPES

  componentWillMount() {
    this.props.appContext.plugins.forEach((plugin) => {
      if (plugin.serviceWillMount) {
        plugin.serviceWillMount()
      }
    })
  }

  componentDidMount() {
    this.props.appContext.plugins.forEach((plugin) => {
      if (plugin.serviceDidMount) {
        plugin.serviceDidMount()
      }
    })
  }

  componentWillUnmount() {
    this.props.appContext.plugins.forEach((plugin) => {
      if (plugin.serviceWillUnmount) {
        plugin.serviceWillUnmount()
      }
    })
  }

  getChildContext(): InjectionContext {
    return {
      '@appContext': this.props.appContext
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
