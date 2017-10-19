import React from 'react'
import Link from 'gatsby-link'
import { startCase, kebabCase, flatMap, last } from 'lodash'
import { Paper, Menu, MenuItem, Divider } from 'material-ui'

const modules = require('../../docs.json').children

export default ({ pages }) => {
  return (
    <Paper style={{ minWidth: '10em', justifyContent: 'space-between' }} zDepth={2}>
      <Menu desktop>
        {
          flatMap(pages, ({ id, path }) =>
            path.startsWith('/docs') ? [
              <MenuItem key={id}>
                <Link to={path}>
                  {getPageName(path)}
                </Link>
              </MenuItem>
            ] : []
          )
        }
        <Divider />
        {
          modules.map(({ id, name }) =>
            <MenuItem key={id}>
              <Link to={`/modules/${kebabCase(name)}`}>
                {'bright-js-framework/' + JSON.parse(name)}
              </Link>
            </MenuItem>
          )
        }
      </Menu>
    </Paper>
  )
}

function getPageName(path) {
  const components = path.split('/')
  return startCase(components[components.length - 2])
}
