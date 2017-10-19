import * as React from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles'
import * as color from 'material-ui/styles/colors'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar'

import './index.css'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: color.lightBlue500
  },
  appBar: {
    height: 50,
  },
})

const TemplateWrapper = ({ children, data }) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: color.grey50 }}>
      <Helmet
        title="bright-js-framework"
      >
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Source+Code+Pro:400,700" rel="stylesheet" />
      </Helmet>
      <AppBar
        style={{ position: 'static' }}
        showMenuIconButton={false}
        title="@brightinteractive/bright-js-framework"
      />
      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <Sidebar pages={data.allSitePage.edges.map(x => x.node)} />
        <div style={{ position: 'relative', overflow: 'auto', flex: 1 }}>
          <div style={{ width: '60em', maxWidth: '100%', margin: '1em 2em' }}>
            {children()}
          </div>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
)

export default TemplateWrapper

export const query = graphql`
  query Contents {
    allSitePage {
      edges {
        node {
          id
          path
        }
      }
    }
  }
`
