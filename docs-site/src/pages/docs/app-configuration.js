import * as React from 'react'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'
import { Section } from '../../components/Section'
import { OptionsTable, Option } from '../../components/OptionsTable'

export default () => {
  return (
    <div>
      <PageHeader>App Configuration</PageHeader>
      <Section alwaysExpanded title=".bright-js-framework">
        <p>
          The <code>.bright-js-framework</code> file is a JSON file optionaly placed at your project root,
          which contains the application's main configuration.
        </p>
        <Subheader>Options</Subheader>
        <OptionsTable>
          <Option
            name="frontendEnvironment"
            type="string[]"
            description="Whitelist of environmental variables to pass through to client"
            defaultValue="Empty"
          />
        </OptionsTable>
      </Section>
    </div>
  )
}
