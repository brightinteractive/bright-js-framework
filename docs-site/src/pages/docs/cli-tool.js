import * as React from 'react'
import { Section } from '../../components/Section'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'
import { OptionsTable, Option } from '../../components/OptionsTable'

export default () => {
  return (
    <div>
      <PageHeader>CLI Tool</PageHeader>
      <Section title="bright-js-framework run">
        <p>
          Starts a development server.
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
