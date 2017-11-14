const RESOLVER_TYPENAME_KEY = Symbol('ResolverType')

export function decorateResolver(typeName: string, constructor: new() => any): void
export function decorateResolver(typeName: string, constructor: any) {
  constructor[RESOLVER_TYPENAME_KEY] = typeName
}

export function isResolver(constructor: new() => any) {
  return Boolean(getResolverTypename(constructor))
}

export function getResolverTypename(constructor: new() => any): string
export function getResolverTypename(constructor: any) {
  return constructor[RESOLVER_TYPENAME_KEY]
}
