import * as React from 'react'
import { Section } from '../../components/Section'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'
import { DocsTable, DocsRow, DocsCell } from '../../components/DocsTable'

export default () => {
  return (
    <div>
      <PageHeader>CLI Tool</PageHeader>
      <Section title="bright-js-framework init">
        <p>
          Initialize a new bright-js-framework project.
        </p>
        <p>
          Only available when the working directory is not within a bright-js-framework project.
        </p>
      </Section>
      <Section title="bright-js-framework run">
        <p>
          Starts a development server.
        </p>
        <p>
          Only available when the working directory is within a bright-js-framework project.
        </p>
        <Subheader>Options</Subheader>
        <OptionsTable cli>
          <Option
            flag="--port"
            type="number"
            shortcut="-p"
            description="Port to serve from"
            defaultValue={<div><code>process.env.PORT</code>, or <code>8000</code> if undefined.</div>}
          />
        </OptionsTable>
      </Section>
    </div>
  )
}

export function OptionsTable({ children }) {
  return (
    <DocsTable columns={["Flag", "Type", "Shortcut", "Description", "Default Value"]}>
      {children}
    </DocsTable>
  )
}

export function Option({ flag, type, number, shortcut, description, defaultValue }) {
  return (
    <DocsRow>
      <DocsCell>{flag}</DocsCell>
      <DocsCell>{type}</DocsCell>
      <DocsCell>{shortcut}</DocsCell>
      <DocsCell multiline>{description}</DocsCell>
      <DocsCell multiline>{defaultValue}</DocsCell>
    </DocsRow>
  )
}
