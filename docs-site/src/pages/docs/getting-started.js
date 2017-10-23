import * as React from 'react'
import { Section } from '../../components/Section'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Getting Started</PageHeader>
      <Section title="Installation">
        <ol>
          <li>
            <p>
              Initialize a new npm project.
            </p>
            <CodeBlock language="bash">
              $ npm init
            </CodeBlock>
          </li>
          <li>
            <p>
              Install bright-js-framework and React.
            </p>
            <CodeBlock language="bash">
              $ npm install react @brightinteractive/bright-js-framework
            </CodeBlock>
          </li>
          <li>
            <p>
              bright-js-framework includes a cli tool for starting development & production
              servers, building production asset bundles, etc.
            </p>
            <p>
              Your app's start script just needs to call through to this:
            </p>
            <CodeFile path="package.json">
              {require('raw!./examples/getting-started/package')}
            </CodeFile>
          </li>
          <li>
            <p>
              Pages are picked up from all files under the <code>src/pages</code> directory.
            </p>
            <p>
              Add a new source file for the app.
            </p>
            <CodeFile path="src/pages/index.tsx">
              {require('raw!./examples/getting-started/index.tsx')}
            </CodeFile>
          </li>
          <li>
            Start the development server.
            <CodeBlock language="bash">
              $ npm start
            </CodeBlock>
          </li>
          <li>
            <p>
              Visit <a href="http://localhost:8000">http://localhost:8000</a> and
              verify that you can see “Hello, world!” in the console.
            </p>
          </li>
        </ol>
      </Section>
    </div>
  )
}
