import { InjectionContext, InjectionClient } from '../../core/InjectionClient'

const RESOLVER_TYPENAME_KEY = '__luminant__ResolverType'
const RESOLVER_PROPERTIES_KEY = '__luminant__ResolverProps'

export class GraphQLType extends InjectionClient {
  readonly id: string

  constructor(context: InjectionContext, id: string) {
    super(context)
    this.id = id
  }
}

export type ResolverConstructor = new(context: InjectionContext, id: string) => GraphQLType

export function decorateGraphQLType(typeName: string): ClassDecorator {
  return (constructor: any) => {
    constructor[RESOLVER_TYPENAME_KEY] = typeName
  }
}

export function isGraphQLType(constructor: any): constructor is typeof GraphQLType {
  return Boolean(getGraphQLTypename(constructor))
}

export function getGraphQLTypename(constructor: any) {
  return constructor[RESOLVER_TYPENAME_KEY]
}

export function decorateResolver(prototype: any, key: string | symbol) {
  prototype[RESOLVER_PROPERTIES_KEY] = prototype[RESOLVER_PROPERTIES_KEY] || new Set()
  prototype[RESOLVER_PROPERTIES_KEY].add(key)
}

export function getResolvers(constructor: ResolverConstructor): Set<string>
export function getResolvers(constructor: any) {
  return constructor.prototype[RESOLVER_PROPERTIES_KEY] || new Set()
}
