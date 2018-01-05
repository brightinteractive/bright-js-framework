import * as glob from 'glob'
import { runPluginLoaderHook } from '../../lib/bundler/PluginLoader'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'
import { startDevserver } from '../../lib/server/startDevServer'
import { startProductionServer } from '../../lib/server/startProductionServer'

export interface RunCommandOpts {
  devServer: boolean
  port: number
}

export const command = 'run'
export const builder = {
  'port': {
    alias: 'p',
    type: 'number',
    description: 'Port to start server on',
    default: Number(process.env.PORT || 8000),
  },
  'dev-server': {
    alias: 'd',
    type: 'boolean',
    description: 'Start in development mode',
    default: process.env.NODE_ENV !== 'production'
  }
}

export async function handler({ port, devServer }: RunCommandOpts) {
  const appConfig = getConfig()
  const plugins = {
    ...appConfig.plugins,
    ...getImplicitProjectPluginConfigurationsFromFilepaths(glob.sync(appConfig.projectPlugins))
  }

  await runPluginLoaderHook(plugins, (loader) => loader.applicationWillStart())

  if (devServer) {
    startDevserver({
      config: appConfig,
      plugins,
      port
    })
  } else {
    startProductionServer({
      config: appConfig,
      port
    })
  }
}
