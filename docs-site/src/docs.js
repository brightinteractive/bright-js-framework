const path = require('path')
const json = require('../docs.json')

function shouldGenerateDocumentationForModule(moduleDocs) {
  const ignoredDirs = [
    '/lib',
    '/cli'
  ]

  const ignoredFiles = [
    /^plugin-loader\./,
  ]

  return (
    !ignoredDirs.some(dir => moduleDocs.originalName.match(dir))
    && !ignoredFiles.some(file => path.basename(moduleDocs.originalName).match(file))
  )
}

module.exports = {
  ...json,
  children: json.children.filter(shouldGenerateDocumentationForModule)
}
