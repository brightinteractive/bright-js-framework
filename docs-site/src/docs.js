const json = require('../docs.json')

function shouldGenerateDocumentationForModule(moduleDocs) {
  const ignoredDirs = [
    '/lib',
    '/cli'
  ]

  return !ignoredDirs.some(dir => moduleDocs.originalName.match(dir))
}

module.exports = {
  ...json,
  children: json.children.filter(shouldGenerateDocumentationForModule)
}
