import * as React from 'react'
import { Section } from '../../components/Section'
import { PageHeader, Subheader } from '../../components/Headers'
import { CodeBlock, CodeFile } from '../../components/CodeBlock'

export default () => {
  return (
    <div>
      <PageHeader>Services and Controllers</PageHeader>
      <Section title="Introduction">
        <p>
          In React, we are used to thinking about applications as a tree of components.
        </p>
        <p>
          We tend to think of two types of components. 'Controller' components are responsible for fetching data, holding state, connecting to global state, firing off side effects, long-running operations and navigation. 'View' components are largely stateless, with their props passed in by their parent controller.
        </p>
        <p>
          This is nice as it keeps our view components nice and simple and makes them easy to reuse and test. Unfortunately, writing clean, testable controllers is much more difficult. Keeping controller code modular and reusable is also hard.
        </p>
        <p>
          In other frameworks, we might extract a concern out of a large class into separate utility classes. This is difficult in React because of the way that state is required to be owned by a component. These concerns might also need to respond to component lifecycle events or interact with API clients that live in the React context.
        </p>
        <p>
          Bright-js-framework makes it very easy to extract logic out of controllers by introducing the concept of a <em>Service</em>. Services are classes that have access to a subset of the React Component API. They are owned by a parent component, and receive lifecycle events. We'll look at an example of how they can be used in the next section.
        </p>
      </Section>
      <Section title="Extracting logic from Controllers">
        <p>
            Let's imagine a simple todo list component. In this example, we've split the presentational logic out into the <code>TodoListView</code> component, leaving <code>TodoList</code> to manage the state it presents.  We've excluded the <code>TodoListView</code> source code for brevity (there's nothing special about it), but it can be viewed in the <a href ="https://github.com/brightinteractive/bright-js-framework/tree/master/examples/extracting-services-from-controllers/src/components">examples folder on Github</a>.
        </p>
        <CodeFile path="src/components/TodoList.before.tsx">
          {require('raw!../../../../examples/extracting-services-from-controllers/src/components/TodoList.before.tsx')}
        </CodeFile>
        <p>
          At the moment, it isn't a huge component, but we can imagine that as requirements evolve (for example, if we start adding persistence, search and other features) it might become unwieldy. We might want to use the same update logic in different view contexts, without having to duplicate this logic amongst multiple components.
        </p>
        <p>
          In this example, we will split the list state management concern out into a separate class, leaving the <code>TodoList</code> as a simple component that wires this up to <code>TodoListView</code>.
        </p>
        <p>
          First, we create a new Service class that contains the state management logic extracted from <code>TodoList</code>:
        </p>
        <CodeFile path="src/services/ListService.tsx">
          {require('raw!../../../../examples/extracting-services-from-controllers/src/services/ListService.tsx')}
        </CodeFile>
        <p>
          Next, we annotate the controller with the <code>@controller</code> decorator and replace the state management logic with an instance of our new service. Adding the <code>@controller</code> decorator is important, as otherwise the service won’t be connected to the controller’s state and lifecycle events.
        </p>
        <CodeFile path="src/components/TodoList.after.tsx">
          {require('raw!../../../../examples/extracting-services-from-controllers/src/components/TodoList.after.tsx')}
        </CodeFile>
        <p>
          The behaviour of this component is identical to the original one, but its implementation is much simpler. Our <code>ListService</code> class is now able to store state, which acts as if it were state of <code>TodoList</code>. Controllers are re-rendered whenever the state of a constituent service changes.
        </p>
      </Section>
    </div>
  )
}
