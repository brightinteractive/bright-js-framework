import { PluginConfig } from '@brightinteractive/bright-js-framework'

export interface ThrowErrorOnLoadPluginOptions {
  message: string
}

export default function createThrowErrorOnLoadPlugin({ message }: ThrowErrorOnLoadPluginOptions) {
  class ThrowErrorOnLoadPlugin extends PluginConfig {
    serviceWillMount() {
      throw new Error(message)
    }
  }

  return ThrowErrorOnLoadPlugin
}
