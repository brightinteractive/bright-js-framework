import * as path from 'path'
import { uniq, fromPairs } from 'lodash'

export default function getImplicitProjectPluginConfigurationsFromFilepaths(paths: string[]): Record<string, {}> {
  return fromPairs(
    uniq(paths.map(normalizeModuleName)).map((pathname) => [pathname, {}])
  )
}

function normalizeModuleName(pathname: string) {
  return stripExtension(stripExtension(pathname))
}

function stripExtension(pathname: string) {
  return path.join(path.dirname(pathname), path.basename(pathname, path.extname(pathname)))
}
