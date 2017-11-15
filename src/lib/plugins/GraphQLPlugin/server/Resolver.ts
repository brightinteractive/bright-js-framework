import { InjectionContext, InjectionClient } from '../../../core/InjectionClient'

const RESOLVER_TYPENAME_KEY = Symbol('ResolverType')
const RESOLVER_PROPERTIES_KEY = Symbol('ResolverProps')

export class Resolver extends InjectionClient {
  readonly id: string

  constructor(context: InjectionContext, id: string) {
    super(context)
    this.id = id
  }
}

export type ResolverConstructor = new(context: InjectionContext, id: string) => Resolver

export function decorateTypeResolver(typeName: string): (constructor: ResolverConstructor) => void {
  return (constructor: any) => {
    constructor[RESOLVER_TYPENAME_KEY] = typeName
  }
}

export function isTypeResolver(constructor: any) {
  return Boolean(getResolverTypename(constructor))
}

export function getResolverTypename(constructor: any) {
  return constructor[RESOLVER_TYPENAME_KEY]
}

export function decorateResolverProperty(prototype: Resolver, key: string): void
export function decorateResolverProperty(prototype: any, key: string) {
  prototype[RESOLVER_PROPERTIES_KEY] = prototype[RESOLVER_PROPERTIES_KEY] || new Set()
  prototype[RESOLVER_PROPERTIES_KEY].add(key)
}

export function getResolverProperties(constructor: ResolverConstructor): Set<string>
export function getResolverProperties(constructor: any) {
  return constructor.prototype[RESOLVER_PROPERTIES_KEY] || new Set()
}
