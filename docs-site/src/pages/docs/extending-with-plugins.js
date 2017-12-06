import * as React from 'react'
import Link from 'gatsby-link'
import {Section} from '../../components/Section'
import {PageHeader} from '../../components/Headers'
import {CodeFile} from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Using Plugins</PageHeader>
      <Section title="Introduction">
        <p>
          Previously, we looked at <Link to="/services-and-controllers">services</Link>, which allow behaviours to be extracted out of controller components and shared.
        </p>
        <p>
          Sometimes, we want to attach behavior to the <em>whole application</em>. Plugins provide a way of doing this. Some uses of Plugins are:
        </p>
        <ul>
          <li>
            When integrating an authentication provider, we might need to retrieve and validate an auth token when the application loads for the first time, before we decide what page to render.
          </li>
          <li>
            When integrating a data store such as Redux, we would need to keep a single store instance at the root of applications and allow our services and controllers access to the store.
          </li>
          <li>
            When writing a controller that interfaces with DOM APIs, we may want to use that controller in environments where the DOM does not exist. For example, a controller that reads or writes to cookies that we wish to use in a server-side-rendered application would need an abstract interface to access cookies, looking in the HTTP request in a server app, or a DOM API in the browser. It might also need a stub implementation when running in a test environment.
          </li>
          <li>
            When writing a GraphQL API for an application, we might want to add a GraphQL endpoint to our application server (assuming that we aren’t using an external GraphQL API).
          </li>
        </ul>
        <p>
          Plugins provide a simple way of achieving these tasks.
        </p>
      </Section>
      <Section title="Using plugins">
        <p>
          Plugins are picked up from the default exports of source files in a conventional directory in your project. By default, this is <code>src/plugins</code>.
        </p>
        <p>
          Sometimes, you will want to use plugins that live in external modules. Some of these may allow or require configuration. This can be done by adding the plugin, along with
          any configuration, to your <code>luminant.json</code> file. For example, here is how Luminant's GraphQL plugin is installed and configured:
        </p>
        <CodeFile path="luminant.json">
          {require('!raw!../../../../examples/graphql-client-with-external-api/luminant.json')}
        </CodeFile>
        <p>
          Some plugins provide an API to controllers. Others may have application-wide effects that do not require any usage. Consult the documentation for the specific plugin for further usage instructions.
        </p>
      </Section>
      <Section title="Writing plugins that provide injectable dependencies">
        <p>
          One usecase for plugins is to configure dependencies that are injected into controllers and services on request.
        </p>
        <p>
          Plugins that allow dependencies to be injected into components will typically provide a decorator to inject the dependency and an interface for the dependency as an API. A controller that uses a hypothetical <code>EventManager</code> plugin to dispatch events might use it as follows:
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
          <code>@exported</code> decorator.
        </p>
        <CodeFile path="src/plugins/EventManagerPlugin.ts">
          {require('raw!../../../../examples/plugin-with-injection/src/plugins/EventManagerPlugin.ts')}
        </CodeFile>
        <p>
          In this code block we have created an extremely simple event manager plugin. The event manager itself is
          just an object; what's special here is the use of the <code>@exported</code> decorator to allow
          the <code>EventManager</code> to be injected into controllers and services.
        </p>
        <p>
          The <code>@exported</code> decorator takes one parameter: a string key. This registers the value
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
      <Section title="Writing plugins that manage application state">
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
      <Section title="Distributing plugins that require configuration">
        <p>
          When a plugin is distributed as a node module, it may require configuration from the application
          it is used in (for example, a plugin implementing an authentication provider will need API keys,
          an auth endpoint, etc providing to it).
        </p>
        <p>
          If the default export of a plugin file is a factory function that returns a PluginConfig class
          (as opposed ot exporting a PluginConfig class directly), this function will receive any options
          provided to the plugin in the application’s <code>luminant.json</code>.
        </p>
        <p>
          In this (slightly contrived) example, we write a plugin designed to be distributed as a node module
          that throw an exception when the application loads. It helpfuly allows users to pass in the message
          that is thrown as a configuration value:
        </p>
        <CodeFile path="throw-error-on-load/index.ts">
          {require('raw!../../../../examples/writing-a-configurable-plugin/throw-error-on-load/index.ts')}
        </CodeFile>
        <p>
          A user of the plugin can now reference it in their <code>luminant.json</code> (in this example via a relative path.
          Typically it will be the name of a node module):
        </p>
        <CodeFile path="app/luminant.json">
          {require('!raw!../../../../examples/writing-a-configurable-plugin/app/luminant.json')}
        </CodeFile>
      </Section>
      <Section title="Writing plugins that bundle additional source files">
        <p>[TODO]</p>
        <p>Example usage in the GraphQL server:</p>
        <CodeFile path="plugin-config.ts">
          {require('!raw!../../../../src/plugins/graphql-server/plugin-config.ts')}
        </CodeFile>
        <CodeFile path="../../lib/plugins/GraphQLServerPlugin/loadSchema">
          {require('!raw!../../../../src/lib/plugins/GraphQLServerPlugin/loadSchema.ts')}
        </CodeFile>
        <CodeFile path="../../lib/plugins/GraphQLServerPlugin/graphQLServerPluginEntry">
          {require('!raw!../../../../src/lib/plugins/GraphQLServerPlugin/graphQLServerPluginEntry.ts')}
        </CodeFile>
      </Section>
    </div>
  )
}
