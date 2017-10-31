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
 * Define property on an object
 */
export function patchProperty<T, Key extends keyof T>(object: T, property: Key, impl: (this: T) => T[Key]): void
export function patchProperty(object: any, property: string, impl: (this: any) => any) {
  Object.defineProperty(object, property, {
    get: impl
  })
}
