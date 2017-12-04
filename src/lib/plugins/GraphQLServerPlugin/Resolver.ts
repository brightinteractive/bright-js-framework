import { InjectionContext, InjectionClient } from '../../core/InjectionClient'

const GRAPHQL_TYPENAME_KEY = '__luminant__ResolverType'
const RESOLVER_METHODS_KEY = '__luminant__ResolverProps'

export class SchemaType extends InjectionClient {
  readonly id: string

  constructor(context: InjectionContext, id: string) {
    super(context)
    this.id = id
  }
}

export type ResolverConstructor = new(context: InjectionContext, id: string) => SchemaType

export function decorateSchemaType(typeName: string): ClassDecorator {
  return (constructor: any) => {
    constructor[GRAPHQL_TYPENAME_KEY] = typeName
  }
}

export function isSchemaType(constructor: any): constructor is typeof SchemaType {
  return Boolean(getSchemaTypename(constructor))
}

export function getSchemaTypename(constructor: any) {
  return constructor[GRAPHQL_TYPENAME_KEY]
}

export function decorateResolver(prototype: any, key: string | symbol) {
  prototype[RESOLVER_METHODS_KEY] = prototype[RESOLVER_METHODS_KEY] || new Set()
  prototype[RESOLVER_METHODS_KEY].add(key)
}

export function getResolvers(constructor: ResolverConstructor): Set<string>
export function getResolvers(constructor: any) {
  return constructor.prototype[RESOLVER_METHODS_KEY] || new Set()
}
