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
              First, make sure you have the bright-js-framework cli installed globally.
            </p>
            <CodeBlock language="bash">
              {`npm install -g @brightinteractive/bright-js-framework`}
            </CodeBlock>
          </li>
          <li>
            <p>
              Create a new directory for your project and initialize it.
            </p>
            <CodeBlock language="bash">
              {`mkdir my-project`}
              {`cd my-project`}
              {`bright-js-framework init`}
            </CodeBlock>
          </li>
          <li>
            <p>
              bright-js-framework includes a cli tool for starting development & production
              servers, building production asset bundles, etc.
            </p>
            <p>
              Start up a new development server:
            </p>
            <CodeBlock language="bash">
              {`bright-js-framework run`}
            </CodeBlock>
          </li>
          <li>
            <p>
              Pages are picked up from all files under the <code>src/pages</code> directory.
            </p>
            <p>
              You'll see that the skeleton project contains a couple of placeholder pages.
            </p>
            <CodeFile path="src/pages/IndexPage.tsx">
              {require('raw!../../../../examples/getting-started/src/pages/IndexPage.tsx')}
            </CodeFile>
          </li>
          <li>
            <p>
              Visit <a href="http://localhost:8000">http://localhost:8000</a> and
              verify that you can see “Hello, world!” on the page.
            </p>
          </li>
        </ol>
      </Section>
      <Section title="Routing">
        <p>
          As we saw in the previous section, pages are picked up from your app's <code>src/pages</code> directory.
          bright-js-framework provides a <code>@route</code> decorator, which is used to declare that a component should
          be used as the top-level component for a page route.
        </p>
        <p>
          Route components can be fully or partially dynamic and extract path params from sections. They also
          receive a special set of props from the page, providing the location, path params and query params:
        </p>
        <CodeFile path="src/pages/UserPage.tsx">
          {require('raw!../../../../examples/getting-started/src/pages/UserPage.tsx')}
        </CodeFile>
        <p>
          <code>*</code> can be used as a wildcard component (eg. <code>/onboarding/*</code>). It can also be used to
          produce a 404 page. The skeleton project includes an example of using this.
        </p>
        <CodeFile path="src/pages/404.tsx">
          {require('raw!../../../../examples/getting-started/src/pages/404.tsx')}
        </CodeFile>
      </Section>
    </div>
  )
}
