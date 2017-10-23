import React from 'react'
import Link from 'gatsby-link'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'
import { Section } from '../../components/Section'
import { OptionsTable, Option } from '../../components/OptionsTable'

export default () => {
  return (
    <div>
      <PageHeader>Environmental Variables</PageHeader>
      <Section alwaysExpanded title=".env file">
        <p>
          Adding a <code>.env</code> file to your project root allows you to specify environmental variables
          for use in development mode.
        </p>
        <p>
          These variables are not compiled into the javascript bundle. They are returned by the server
          as part of a page request. This allows you to use the same javascript bundle on both staging and
          production servers.
        </p>
        <p>
          Environmental variables must be whitelisted before they are made available to the frontend.
          They must be specified in the <Link to="/docs/app-configuration">app config</Link> before
          they are passed from server to client.
        </p>
        <p>
          This file should be formatted as an envfile (<code>KEY=VALUE</code> lines). It should be
          added to your <code>.gitignore</code> file and not checked into source control.
        </p>
      </Section>
    </div>
  )
}
