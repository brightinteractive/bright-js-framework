import * as React from 'react'
import Link from 'gatsby-link'
import {Section} from '../../components/Section'
import {PageHeader} from '../../components/Headers'
import {CodeFile} from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Writing GraphQL APIs</PageHeader>
      <Section title="Introduction">
        <p>
          Bright-js-framework allows your application to declare data dependencies on components using GraphQL queries.
        </p>
        <p>
          Unless are writing your app against an existing GraphQL API, you will probably need to write one.
          Fortunately, bright-js-framework makes it extremely easy to write and host a GraphQL backend.
        </p>
        <p>
          In this page, we assume that you have some existing familiarity with GraphQL — at least from the perspective
          of writing GraphQL queries. If you don’t, please refer to <a href="http://graphql.org/learn/">http://graphql.org/learn/
          </a> for an overview.
        </p>
      </Section>
      <Section title="GraphQL in bright-js-framework">
        <p>
          GraphQL APIs within bright-js-framework are written using three parts:
          <ul>
            <li><em>Schema:</em> Schemas are written in a <code>.graphql</code>
            schema definition file. They define the GraphQL types, queries and mutations for a particular object.</li>
            <li><em>SchemaType:</em> SchemaTypes are objects written as <code>.ts</code> files. They contain a set of resolver functions
            for a specific type from the schema. Each <code>@resolver</code> decorated function within a
            SchemaType is equivalent to a GraphQL resolver. As an example, a UserSchemaType would contain resolver functions
            for the users forname, surname, email etc. There are three arguments normally passed to a GraphQL resolver: args, obj and context.
            Two of these are member varibables within the SchemaType object (obj and context), the final one (args) is still passed to the
            individual <code>@resolver</code> decorated functions.</li>
            <li><em>Connector:</em> Connectors are <code>.ts</code> files. Connectors provide implementations for data
            retrievals that are used by resolver funtions in SchemaTypes (i.e. a UserSchemaType will resolve a users forename by
            making a call to UserConnector.getUser() and returning the forename property).</li>
          </ul>
        </p>
        </Section>
        <Section title="Example GraphQL Implementation">
        <p>
          First of all, we need to add the GraphQL plugin to our application’s config file:
        </p>
        <CodeFile path="src/config.ts">
          {require('!raw!../../../../examples/graphql-server/luminant.json')}
        </CodeFile>
        <p>
          Next, we’ll add a new type to our GraphQL API. As described, when we write GraphQL APIs with bright-js-framework,
          we separate our schema definitions from our <em>resolvers</em> by writing the Schema in a <code>.graphql</code>
          schema definition file. This makes it easy to get a high-level overview of a schema by looking at its
          schema file. It also means that breaking changes to APIs can easily be identified by looking at the
          Schema file.
        </p>
        <p>
          Bright-js-framework encourages you to split your API into modules. This makes it easy to navigate around
          your API schema and implementation. Any directory with a <code>.graphql</code> file in it is considered
          a module. SchemaType implementations are picked up from any file in the same directory. In this example,
          we’ve created the <code>User</code> directory, which contains the schema definition for the <code>User</code>
          type and its SchemaType.
        </p>
        <CodeFile path="src/graphql/schema/User/User.graphql">
          {require('raw!../../../../examples/graphql-server/src/graphql/schema/User/User.graphql')}
        </CodeFile>
        <p>
          For each type in our schema, we create a subclass of SchemaType and use the <code>@type</code>,
          <code>@queries</code> and <code>@mutations</code> decorators to associate the resolvers within the SchemaType
          with the schema type they resolve.
        </p>
        <p>
          The Query and Mutation types are special top-level types that are not associated with any data.
          (in object-oriented terms they are more like free functions than classes). These are accessible
          in the top-level of a GraphQL query or mutation. We declare them using the  <code>@queries</code>
          and <code>@mutations</code> decorators.
        </p>
        <p>
          When a resolver within a SchemaType is written for a scalar property (i.e. a string for a users forename), it
          should return either the scalar value or (more typically) a Promise for the scalar value.
        </p>
        <p>
          When a resolver within a SchemaType is written for a relation to another object, it should not fetch the object,
          but instead return a string ID for that object. This is then provided to that Object's SchemaType
          as its <code>id</code> property, which can then be used to fetch data about it from backend services.
          This is important, as it avoids coupling a resolver to a specific backend service, allowing data from
          multiple backend services to be presented to the frontend as a single type.
        </p>
        <p>
          In this example, let's assume that the GraphQL User type presented to our frontend is implemented by two
          different backend services. We have an authentication service that stores the user's account details
          and a metadata service that stores additional metadata. You can see that we have injected some
          data connectors. We'll come back to those later. In the meantime, observe the way that an object's
          properties are resolved — a request to fetch the user each time a property of the user is resolved.
        </p>
        <CodeFile path="src/graphql/schema/User/UserResolvers.ts">
          {require('raw!../../../../examples/graphql-server/src/graphql/schema/User/UserResolvers.ts')}
        </CodeFile>
        <p>
          Next, we’ll implement the connector to the user account backend service. Connectors are picked up
          automatically from the filesystem by the GraphQL server. You access them using the <code>@inject</code>
          decorator. A single instance of each connector is used across a single incoming request. This allows
          the connector to batch and de-duplicate outgoing requests:
        </p>
        <CodeFile path="src/graphql/connectors/UserAccountConnector.ts">
          {require('raw!../../../../examples/graphql-server/src/graphql/connectors/UserAccountConnector.ts')}
        </CodeFile>
        <p>
          You might at this point be wondering why this connector is split into two classes. And where the
          <code>getOne</code> and <code>getProperty</code> methods went.
        </p>
        <p>
          To understand this, it's important to understand the different types of outgoing request we are likely
          to want to make. Broadly speaking, we can distinguish between <strong>search</strong> requests (find by
          name, etc) <strong>get</strong> requests (get by ID) and <strong>mutation</strong> requests (create, update,
          delete).
        </p>
        <p>
          In a typical query, get by ID will be by far the most commonly made of these. For scalability, it is critical
          that these are batched into as few outgoing requests as possible. Otherwise when fetching a list of users,
          we might end up making 100 requests to a backend service when we could have made a single one (which would have
          typically be implemented using a fast <code>SELECT * WHERE ID IN (...)</code>—type query.
        </p>
        <p>
          Subclassing <code>Connector.forResource</code> and providing to it a special connector that defines
          how to fetch a batch of resources by ID makes it extremely easy to avoid this scenario. The base class returned
          from this method implements methods to get one or many resources by ID, with batching and de-duplication
          transparently handled.
        </p>
        <p>
          When we <em>search</em> for external resources, batching and de-duplication are much less important.
          When we <em>mutate</em> an external resource, batching and de-duplication might be undesirable. In these
          cases, methods should be implemented on your <code>Connector</code> subclass. These will be called
          directly from your resolver and will not be batched or de-duplicated.
        </p>
        <p>
          You may occasionally write connectors to external services where you do not need to get by ID.
          In these cases, you can simply subclass <code>Connector</code> directly.
        </p>
        <p>
          To wrap up the example, let’s implement the metadata connector referenced in our resolver.
        </p>
        <CodeFile path="src/graphql/connectors/UserMetadataConnector.ts">
          {require('raw!../../../../examples/graphql-server/src/graphql/connectors/UserMetadataConnector.ts')}
        </CodeFile>
      </Section>
      <Section title="Writing GraphQL mutations">
        <p>
          Annotate a property with the <code>@mutation</code> decorator and pass in the mutation query.
          This will install a GraphQLMutation service that can be used to perform mutations and [TOOO]
          track the progress of the mutation.
        </p>
      </Section>
      <Section title="Using GraphQL outside of components">
        <p>
          In general, you should use either @query or @mutation to interact with GraphQL APIs.
          However in some plugins and services, it may be necessary to perform queries and mutations
          with an imperative API.
        </p>
        <p>
          Annotate a property with the <code>@graphQLClient</code> decorator to attach a GraphQLClient
          object that can be used to perform imperative queries and mutation.
        </p>
      </Section>
      <Section title="Debugging a GraphQL server">
        <p>
          When your GraphQL server is running in development mode, a <a href="https://github.com/graphql/graphiql">
          GraphiQL</a> UI is available. This is useful for debugging resolvers, running manual queries against
          your backend and exploring your API.
        </p>
        <p>
          This is served from <code>/graphql-ui</code> whenever your app is run in development.
        </p>
      </Section>
      <Section title="Hosting the GraphQL server separately to the frontend">
        <p>
          In certain applications, it is convenient to host your GraphQL API on the same server that serves the
          frontend. This can also be faster in some cases (for example, server-rendered pages do not need the
          extra layer of indirection introduced by an intermediate GraphQL server between it and the backend
          services).
        </p>
        <p>
          In other cases, it makes more sense you host your GraphQL API seperately to the frontend. By default,
          the former approach is used. Any resolvers in your repository will automatically be served from the same
          server as the frontend. Queries made from your frontend will automatically be made against this server.
        </p>
        <p>
          To host the API seperately, simply create a seperate Bright-js-framework project with no pages, ensure that
          the GraphQL plugin is included in its configuration file and write your resolvers as usual. Provide the URL of the
          its GraphQL endpoint (<code>https://my-backend.com/graphql)</code> to your frontend as a configuration option:
        </p>
        <CodeFile path="src/graphql/config.ts">
          {require('!raw!../../../../examples/graphql-client-with-external-api/luminant.json')}
        </CodeFile>
      </Section>
    </div>
  )
}
