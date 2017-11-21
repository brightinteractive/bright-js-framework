import * as React from 'react'
import { isController } from './Controller'
import { gatherServices, Service } from './Service'

/*
* Mount a component, load its services, render, then return render output.
*/
export async function load(el: React.ReactElement<React.Props<{}>>, context: {} = {}): Promise<{} | undefined> {
  // Element is either a primitive <div> or composite type.
  //
  // If it's a primitive type, just recurse through all of its children that are elements
  // (ignoring text nodes, etc)
  if (typeof el.type === 'string') {
    return Promise.all(
      React.Children.map(el.props.children, (child) =>
        React.isValidElement(child) && load(child, context)
      ) || []
    )
  }

  // If it's a composite element then mount it and prefetch its data dependencies
  const { subtree, subcontext } = await loadComponent(el.type, el.props, context)

  // If it returns
  if (!subtree || !React.isValidElement(subtree)) {
    return
  }

  // Descend into render output of a composite element
  return load(subtree, subcontext)
}

/**
 * Mount a component, load its services, render, then return render output.
 */
export async function loadComponent(type: React.SFC | React.ComponentClass, props: {}, context: {}) {
  if (isSFC(type)) {
    return {
      subtree: type(props, context),
      subcontext: context
    }
  }

  const instance = mountComponent(type, props, context)

  // Load the services attached to this object if it's a controller
  if (isController(instance)) {
    await Promise.all(
      gatherServices(instance, { recursive: false }).map(loadService)
    )
  }

  return {
    subtree: instance.render(),
    subcontext: {
      ...context,
      ...((instance as any).getChildContext ? (instance as any).getChildContext() : {})
    }
  }
}

export async function loadService(service: Service) {
  if (service.serviceWillMount) {
    service.serviceWillMount()
  }

  if (service.serviceWillLoad) {
    await service.serviceWillLoad()
  }

  await Promise.all(
    gatherServices(service, { recursive: false }).map(loadService)
  )

  if (service.serviceDidLoad) {
    await service.serviceDidLoad()
  }
}

export function mountComponent<P>(type: React.ComponentClass<P>, props: P, context: {} = {}): React.Component<{}, {}> {
  const instance = new type(props, context)
  instance.context = context

  instance.setState = (state: any) => {
    instance.state = { ...instance.state, ...state }
  }

  if (instance.componentWillMount) {
    instance.componentWillMount()
  }

  return instance
}

export function isSFC<P>(x: React.SFC<P> | React.ClassicComponentClass<P> | React.ComponentClass<P>): x is React.SFC<P> {
  // Test for class component. Use interface conformance rather than instanceof to test.
  if (hasKeys(x.prototype, 'setState', 'render')) {
    return false
  }

  return true
}

function hasKeys<T>(x?: T, ...keys: Array<keyof T>) {
  return x && keys.every((key) => key in x)
}
