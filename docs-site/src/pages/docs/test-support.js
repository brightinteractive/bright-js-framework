import * as React from 'react'
import Link from 'gatsby-link'
import {Section} from '../../components/Section'
import {PageHeader} from '../../components/Headers'
import {CodeFile} from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Test Support</PageHeader>
      <Section alwaysExpanded title="Testing Controllers">
        <p>
          Previously, we looked at using plugins to add application-level behavior. This presents us with a problem when we come to test components that depend on plugins.
        </p>
        <p>
          Let’s take a look at the ControlPanel component that we built previously:
        </p>
        <CodeFile path="/src/components/ControlPanel.tsx">
          {require('raw!./examples/plugins/example-usage.tsx')}
        </CodeFile>
        <p>
          As a slightly contrived example of a test, let’s imagine that we want to verify that when the button is clicked, it dispatches the appropriate event.
        </p>
        <CodeFile path="/src/components/ControlPanel.test.tsx">
          {require('raw!./examples/test-support/before.tsx')}
        </CodeFile>
        <p>
          This test will throw an exception. The ControlPanel component is expecting to receive the EventManager instance from a plugin, but we haven't provided this plugin to the test case.
        </p>
        <p>
          Bright-js-framework provides the TestFixture class to help with this. Let’s rewrite this test case using the TestFixture class to provide an EventManager to the test:
        </p>
        <CodeFile path="/src/components/ControlPanel.test.tsx">
          {require('raw!./examples/test-support/after.tsx')}
        </CodeFile>
      </Section>
    </div>
  )
}
