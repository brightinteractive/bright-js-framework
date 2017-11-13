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
      <Section alwaysExpanded title="Getting page-level information">
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
          To programatically navigate:
        </p>
        <CodeFile path="src/components/ControlPanel.tsx">
          {require('raw!../../../../examples/plugin-with-injection/src/components/ControlPanel.tsx')}
        </CodeFile>
        <p>
          It is important to understand the difference between injected objects and services. Although the APIs are similar, they serve very different purposes. Objects injected by plugins are shared across the whole application. This differs from services, which are unique to each controller. So for an event system, which requires all clients to share a single underlying object, we would use a plugin to provide the event manager. For a form-binding helper, which is a piece of extracted controller logic, we would use a service.
        </p>
        <p>
          Writing a plugin entails creating a plugin configuration to export the dependencies the plugin provides.
          This is done by extending the <code>PluginConfig</code> class, and utilising the
          <code>@exportDependency</code> decorator.
        </p>
        <CodeFile path="src/plugins/EventManagerPlugin.ts">
          {require('raw!../../../../examples/plugin-with-injection/src/plugins/EventManagerPlugin.ts')}
        </CodeFile>
        <p>
          In this code block we have created an extremely simple event manager plugin. The event manager itself is
          just an object; what's special here is the use of the <code>@exportDependency</code> decorator to allow
          the <code>EventManager</code> to be injected into controllers and services.
        </p>
        <p>
          The <code>@exportDependency</code> decorator takes one parameter: a string key. This registers the value
          of the decorated property as an available dependency with the given key. Any controllers or services can
          request this dependency by providing the same key to the <code>@inject</code> decorator.
        </p>
        <p>
          To abstract the details of the key away from the users of our plugin, we've exported a decorator named
          <code>@eventManager</code>. In this case, this is simply <code>@inject</code> with a prefilled key. This
          does, however, give us (the plugin authors) the freedom to change how the clients of the plugin receive
          the EventManager. In the future, we may wish to do more than just a simple inject; we may also wish to
          utilise <code>@service</code> capabilities, for example.
        </p>
      </Section>
      <Section title="Navigating to new pages">
        <p>
          Sometimes components need to access and modify state that isn’t scoped to a particular view and is therefore not appropriate to manage using a component or service.
        </p>
        <p>
          A second function of plugins is to allow the management of application-level state, while allowing components to subscribe to state changes using the <code>@select()</code> decorator.
        </p>
        <p>
          The approach used will be familiar to you if you have used <a href="https://redux.js.org/">Redux</a> before. <em>Action</em> objects describing a state modification are dispatched, then applied to the previous state using a <em>reducer</em> function. Components subscribe to a part of the application state by applying a <em>selector</em> function to the application's state object.
        </p>
        <p>
          This structured approach to application state is helpful in large applications, as isolating state modification from the rest of the application makes state easier to reason about.
        </p>
        <p>
          In Bright-js-framework, each reducer function manages a discrete part of the application state identified by a key. Reducers are defined as static methods on plugins, decorated with <code>@state()</code>.
        </p>
        <CodeFile path="src/plugins/CounterPlugin.ts">
          {require('raw!../../../../examples/plugin-with-state/src/plugins/CounterPlugin.ts')}
        </CodeFile>
        <p>
          A component developer would then use this API as follows:
        </p>
        <CodeFile path="src/components/Counter.tsx">
          {require('raw!../../../../examples/plugin-with-state/src/components/Counter.tsx')}
        </CodeFile>
      </Section>
    </div>
  )
}
