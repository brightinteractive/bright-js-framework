import * as glob from 'glob'
import * as dotenv from 'dotenv'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'
import { stage } from '../status'
import { runPluginHooks } from '../../lib/bundler/PluginLoader'

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
    await runPluginHooks('build', plugins)
  })

  function loadEnvironment() {
    dotenv.config()
  }
}
