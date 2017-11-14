import * as React from 'react'
import Link from 'gatsby-link'
import {Section} from '../../components/Section'
import {PageHeader} from '../../components/Headers'
import {CodeFile} from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Interacting with the Browser</PageHeader>
      <Section title="Introduction">
        <p>
          Components of your application are likely to need to interact with Browser APIs.
          Performing page transitons, reading and writing to cookies, opening and closing windows and getting information about the current location all require interaction with the DOM. React abstracts over some, but not all, of these APIs.
        </p>
        <p>
          This is a problem when we want to render controller components on the server or test them in a nodejs environment. If a controller needs to read and write to cookies, this requires it to interact with the DOM in the browser, or to interact with the http request and response on the server. In test environments, we would want an in-memory cookie store that the test can easily manipulate and check.
        </p>
        <p>
          To solve this problem, Bright-js-framework provides an abstraction around these APIs that handles different environments for you.
        </p>
      </Section>
      <Section title="Getting page-level information">
        <p>
          Bright-js-framework includes a number of state selectors that return information about browser state. You can use them like any other state selector.
        </p>
        <CodeFile path="src/pages/IndexPage.tsx">
          {require('raw!../../../../examples/interacting-with-the-browser/src/components/LocationDisplay.tsx')}
        </CodeFile>
        <p>
          Check the API reference for a full list of page selectors and information about the data they return.
        </p>
      </Section>
      <Section title="Performing page-level actions">
        <p>
          In addition to getting information about page state, we might want to perform actions in a cross-environment way. Bright-js-framework provides a number of action services for this purpose.
        </p>
        <p>
          The <code>BrowserActions</code> servuce provides a collection of methods to change the browser state and perform other actions that are outside the scope of React itself.
          In this example, we use it to programatically navigate to another location:
        </p>
        <CodeFile path="src/components/LocationChange.tsx">
          {require('raw!../../../../examples/interacting-with-the-browser/src/components/LocationChange.tsx')}
        </CodeFile>
        <p>
          Check the API documentation of BrowserActions for more examples.
        </p>
      </Section>
    </div>
  )
}
