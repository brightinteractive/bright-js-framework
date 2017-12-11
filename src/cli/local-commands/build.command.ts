import * as glob from 'glob'
import * as dotenv from 'dotenv'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'
import { stage } from '../status'
import { runPluginLoaderHook } from '../../lib/bundler/PluginLoader'

export const command = 'build'
export const builder = {}

export async function handler() {
  const appConfig = getConfig()
  loadEnvironment()

  const plugins = {
    ...appConfig.plugins,
    ...getImplicitProjectPluginConfigurationsFromFilepaths(glob.sync(appConfig.projectPlugins))
  }

  await stage('Building...', async () => {
    await runPluginLoaderHook(plugins, (loader) => loader.applicationWillBuild())
  })

  function loadEnvironment() {
    dotenv.config()
  }
}
