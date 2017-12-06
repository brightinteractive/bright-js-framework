import * as React from 'react'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'
import { Section } from '../../components/Section'
import { DocsTable, DocsRow, DocsCell } from '../../components/DocsTable'

export default () => {
  return (
    <div>
      <PageHeader>App Configuration</PageHeader>
      <Section alwaysExpanded title="luminant.json">
        <p>
          The <code>luminant.json</code> file is a JSON file optionally placed at your project root,
          which contains the application's build and runtime configuration.
        </p>
        <p>
          Environmental variables are substituted for words beginning with <code>$</code> in all strings.
        </p>
        <Subheader>Options</Subheader>
        <OptionsTable>
          <Option
            name="frontendEnvironment"
            type="string[]"
            description="Whitelist of environmental variable names to pass through to client"
            defaultValue="[]"
          />
          <Option
            name="plugins"
            type="object"
            description="Map of plugin module names to config values defining external plugins to install in the application."
            defaultValue="{}"
          />
          <Option
            name="projectPlugins"
            type="string"
            description="Path pattern defining where the application’s own plugins are placed. These are automatically added to the application."
            defaultValue="src/plugins/**/*.tsx?"
          />
        </OptionsTable>
      </Section>
    </div>
  )
}

export function OptionsTable({ children }) {
  return (
    <DocsTable columns={["Name", "Type", "Description", "Default Value"]}>
      {children}
    </DocsTable>
  )
}

export function Option({ name, type, description, defaultValue }) {
  return (
    <DocsRow>
      <DocsCell>{name}</DocsCell>
      <DocsCell>{type}</DocsCell>
      <DocsCell multiline>{description}</DocsCell>
      <DocsCell multiline>{defaultValue}</DocsCell>
    </DocsRow>
  )
}
