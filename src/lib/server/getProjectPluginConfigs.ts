import * as path from 'path'
import { uniq, fromPairs } from 'lodash'

/**
 * Convert a list of plugin filenames into plugin config objects
 */
export function getProjectPluginConfigs(paths: string[]): Record<string, {}> {
  return fromPairs(
    uniq(paths.map(normalize)).map((pathname) => [pathname, {}])
  )
}

function normalize(pathname: string) {
  return path.join(path.dirname(pathname), path.basename(pathname, path.extname(pathname)))
}
