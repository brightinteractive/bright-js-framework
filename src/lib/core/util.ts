/**
 * Override an object’s method to install additional behavior
 * while preserving existing behavior
 */
export function patchMethod<T, Key extends keyof T>(object: T, method: Key, impl: T[Key]): void
export function patchMethod(object: any, method: string, impl: (this: any) => void) {
  const existingImplementation = object[method] as any
  object[method] = function() {
    if (existingImplementation) {
      existingImplementation.apply(this, arguments)
    }

    impl.apply(this, arguments)
  }
}

/**
 * Override a getter method with a method that receives the overridden getter method's
 * return value as a parameter.
 */
export function patchReturnMethod<T, Key extends keyof T, Value>(object: T, method: Key, impl: (parentValue?: Value) => Value): () => Value
export function patchReturnMethod(object: any, method: string, impl: (this: any) => void) {
  const existingImplementation = object[method] as any
  object[method] = function() {
    const prev = existingImplementation && existingImplementation.apply(this)
    return impl.call(this, prev)
  }

  return existingImplementation
}

/**
 * Define property on an object
 */
export function patchProperty<T, Key extends keyof T>(object: T, property: Key, impl: (this: T) => T[Key]): void
export function patchProperty(object: any, property: string, impl: (this: any) => any) {
  Object.defineProperty(object, property, {
    get: impl
  })
}

/**
 * Provide node require function to server-side webpack modules
 */
export function loadModule(id: string): any {
  // FIXME: Require is set as a global so that webpack-loaded plugins have access to it
  //        To be replaced with convention for allowing plugins to specify their source
  //        dependencies directly to webpack
  const g = global as any
  return g.__require(id)
}

/**
 * Asynchronously invoke a method on all provided objects, if that method exists.  Returns a Promise of all the results.
 */
export async function asyncInvokeMethodOnAllObjects<T>(objects: T[], method: (obj: T) => any, args?: any) {
  return await Promise.all(
    objects.filter(method)
      .map((object) => method(object).apply(object, args))
  )
}
