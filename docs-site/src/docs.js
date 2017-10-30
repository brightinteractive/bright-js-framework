const json = require('../docs.json')

module.exports = {
  ...json,
  children: json.children.filter(child => child.originalName.match(/index\.tsx?$/))
}
