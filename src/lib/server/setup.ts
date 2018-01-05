import * as path from 'path'
import * as glob from 'glob'

export function getEntrypointFiles() {
  const filePattern = 'src/pages/**/*.@(t|j)s?(x)'
  return glob.sync(filePattern).map((subpath) => path.resolve(subpath))
}
