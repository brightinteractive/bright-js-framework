import * as React from 'react'
import Link from 'gatsby-link'
import {Section} from '../../components/Section'
import {PageHeader} from '../../components/Headers'
import {CodeFile} from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <Section title="Fetching Data with GraphQL">
        <p>
          First of all, we need to add the GraphQL plugin to our application’s config file:
        </p>
        <CodeFile path="src/config.ts">
          {require('!raw!../../../../examples/fetching-data-with-graphql/luminant.json')}
        </CodeFile>
        <p>
          Next, we write a query. Let’s assume for now that we have a GraphQL backend capable of
          fulfilling this query.
        </p>
        <p>
          In this example, we declare that we want to fetch the first ane last name of a specific user.
          The user’s ID is provided as a parameter to the query.
        </p>
        <CodeFile path="src/pages/UserPage/UserPage.graphql">
          {require('raw!../../../../examples/fetching-data-with-graphql/src/pages/UserPage/UserPage.graphql')}
        </CodeFile>
        <p>
          Next, let's create a page that uses this query. We use the <code>@query</code> decorator to attach
          the query to a component. This adds a service to the page that transparently handles fetching data
          before the component is rendered and reacting to changes to the underlying data.
        </p>
        <CodeFile path="src/pages/UserPage/UserPage.tsx">
          {require('raw!../../../../examples/fetching-data-with-graphql/src/pages/UserPage/UserPage.tsx')}
        </CodeFile>
        <p>
          [TODO] It is important to ensure that our component only uses properties that
          are declared in the query. Luminant will automatically generate typescript files describing the
          expected query params and the data returned from query. It is your responsibility to ensure that
          these are imported into the component and included in the type.
        </p>
      </Section>
      <Section title="How Data Fetching Works">
        <p>
          In React, we are used to reacting to component lifecycle events. Hooks such as <code>componentWillMount</code>,
          <code>componentDidMount</code> and <code>componentDidReceiveProps</code> are typically used to fetch data,
          create and update remote resources, etc.
        </p>
        <p>
          Luminant services, in addition to some having their own versions of many of these lifecycle hooks, also understand
          additional hooks. These differ from React lifecycle hooks, in that they can be asynchronous.
        </p>
        <p>
          If a service implements <code>serviceWillLoad</code> and/or <code>serviceDidLoad</code>, these will be called in
          order whenever:
        </p>
        <ul>
          <li>
            A page containing the service is visited. The page will not be rendered until all services that respond to
            loading hooks have resolved.
          </li>
          <li>
            A component containg the service is added to the page. The component will not be rendered until services
            that belong to it or child components have resolved.
          </li>
          <li>
            [TODO] The props of a component containing the service change.
          </li>
        </ul>
        <p>
          Loading hooks are called in order. A child component will not load until its parents
          have finished loading.
        </p>
        <p>
          Loading hooks on plugins are called once when the application loads. They are not called
          for subsequent page transitions. These can be useful for doing things like validating
          authentication credentials.
        </p>
        <p>
          Throwing an exception in a load hook aborts the loading process. Exceptions do not currently
          stop the application from rendering. This may change in the future.
        </p>
        <p>
          It is currently an error to read or write from a Service's state during a load hook. Fetched data
          should be written to the application's store using the dispatcher.
        </p>
        <p>
          The recommended pattern for handling non-fatal errors is to catch them as they happen, save
          them to the application's store, then re-throw when rendering. This allows users of your
          service to use React's error handling pattern (<code>componentDidCatch</code>)
        </p>
      </Section>
      <Section title="Writing a data-fetching service">
        <p>
          In this example, we.
        </p>
        <p>
          First we write a service. It needs a plugin to manage the fetched data and cache it at
          application level and a service to resolve data dependencies for annotated controllers.
        </p>
        <p>
          As described above, network and http errors are caught as they occur and then re-thrown to
          users of the component when they attempt to retrieve the data.
        </p>
        <CodeFile path="src/plugins/SimpleHttpFetcher.ts">
          {require('raw!../../../../examples/writing-a-data-fetching-service/src/plugins/SimpleHttpFetcher.ts')}
        </CodeFile>
        <p>
          This service can now be used simply to annotate components with a URL to fetch JSON data from.
        </p>
        <CodeFile path="src/pages/UserPage/UserPage.tsx">
          {require('raw!../../../../examples/writing-a-data-fetching-service/src/pages/UserPage/UserPage.tsx')}
        </CodeFile>
      </Section>
    </div>
  )
}
