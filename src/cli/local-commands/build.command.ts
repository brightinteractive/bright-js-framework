import * as glob from 'glob'
import * as webpack from 'webpack'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'
import { stage } from '../status'
import { runPluginLoaderHook } from '../../lib/bundler/PluginLoader'
import { getWebpackConfig } from '../../lib/bundler/getWebpackConfig'
import { getEntrypointFiles } from '../../lib/server/setup'

export const command = 'build'
export const builder = {}

export async function handler() {
  const appConfig = getConfig()

  const plugins = {
    ...appConfig.plugins,
    ...getImplicitProjectPluginConfigurationsFromFilepaths(glob.sync(appConfig.projectPlugins))
  }

  await stage('Building...', async () => {
    await runPluginLoaderHook(plugins, (loader) => loader.applicationWillBuild())
    const compiler = webpack(getWebpackConfig({
      pages: getEntrypointFiles(),
      plugins,
      devServer: false
    }))

    await runCompiler(compiler)
  })

  function runCompiler(wp: webpack.MultiCompiler) {
    return new Promise((resolve, reject) => {
      wp.run((error) => {
        if (error) {
          return reject(error)
        }

        resolve()
      })
    })
  }
}
