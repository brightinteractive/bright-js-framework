const path = require(`path`)
const { kebabCase } = require('lodash')

exports.createPages = ({ graphql, boundActionCreators: { createPage } }) => {
  // Add a page for each documented module, passing through the documentation data generated from
  // source as a property of the page's pathContext.
  //
  // See: https://www.gatsbyjs.org/docs/creating-and-modifying-pages/

  const json = require('./docs.json')

  json.children.forEach((moduleDocJson) => {
    createPage({
      path: `/modules/${kebabCase(moduleDocJson.name)}`,
      component: path.resolve(`./src/templates/ModuleDoc.js`),
      context: {
        docs: moduleDocJson,
      },
    })
  })
}
