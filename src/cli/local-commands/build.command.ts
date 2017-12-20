import * as glob from 'glob'
import * as dotenv from 'dotenv'
import * as webpack from 'webpack'
import * as path from 'path'
import { getConfig } from '../../lib/server/getConfig'
import getImplicitProjectPluginConfigurationsFromFilepaths from '../../lib/server/getProjectPluginConfigs'
import { stage } from '../status'
import { runPluginLoaderHook } from '../../lib/bundler/PluginLoader'
import { getWebpackConfig } from '../../lib/bundler/getWebpackConfig'

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
    const compiler = webpack(getWebpackConfig({
      pages: getEntrypointFiles(),
      plugins,
      devServer: false
    }))

    await runCompiler(compiler)
  })

  function getEntrypointFiles() {
    const filePattern = path.join('src', 'pages', '**', '*.@(t|j)s?(x)')
    return glob.sync(filePattern).map((subpath) => path.resolve(subpath))
  }

  function loadEnvironment() {
    dotenv.config()
  }

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
