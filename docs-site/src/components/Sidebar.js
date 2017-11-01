import React from 'react'
import Link from 'gatsby-link'
import { getModuleName } from '../components/Headers'
import { startCase, kebabCase, flatMap, last } from 'lodash'
import { Paper, Menu, MenuItem, Divider } from 'material-ui'

const modules = require('../docs').children

export default ({ order }) => {
  return (
    <Paper style={{ minWidth: '10em', justifyContent: 'space-between' }} zDepth={2}>
      <Menu desktop>
        <LinkItem link="/docs/getting-started">
          Getting Started
        </LinkItem>
        <LinkItem link="/docs/app-configuration">
          App Configuration
        </LinkItem>
        <LinkItem link="/docs/services-and-controllers">
          Services and Controllers
        </LinkItem>
        <LinkItem link="/docs/cli-tool">
          CLI Tool
        </LinkItem>
        <LinkItem link="/docs/environmental-variables">
          Environmental Variables
        </LinkItem>
        <Divider />
        {
          modules.map(({ id, name }) =>
            <LinkItem key={id} link={`/modules/${kebabCase(name)}`}>
              {getModuleName(name)}
            </LinkItem>
          )
        }
      </Menu>
    </Paper>
  )
}

function LinkItem({ link, children }) {
  return (
    <MenuItem>
      <Link to={link}>
        {children}
      </Link>
    </MenuItem>
  )
}

function getPageName(path) {
  const components = path.split('/')
  return startCase(components[components.length - 2])
}
