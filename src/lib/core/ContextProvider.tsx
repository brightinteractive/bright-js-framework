import * as React from 'react'
import {CONTROLLER_CONTEXT_TYPES, ControllerContext} from './Controller'
import {ApplicationContext} from './ApplicationContext'
import {PluginConfig} from './PluginConfig'

export interface ContextProviderProps {
  appContext: ApplicationContext
}

export interface ContextProviderState {
  mounted?: boolean
}

export class ContextProvider<
  Props extends ContextProviderProps = ContextProviderProps,
  State = {}
> extends React.PureComponent<Props, ContextProviderState & State> {
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

    this.setState({ mounted: true })
  }

  componentWillUnmount() {
    this.props.appContext.plugins.forEach((plugin) => {
      if (plugin.serviceWillUnmount) {
        plugin.serviceWillUnmount()
      }
    })
  }

  getChildContext(): ControllerContext {
    return {
      '@appContext': this.props.appContext,
      '@parentHasMounted': this.state && this.state.mounted
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }

  protected invokeOnAllPlugins(pluginFunctionProvider: (plugin: PluginConfig) => any, args?: any) {
    this.props.appContext.plugins.forEach((plugin) => {
      if (pluginFunctionProvider(plugin)) {
        pluginFunctionProvider(plugin)(args)
      }
    })
  }
}
