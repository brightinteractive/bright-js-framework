import { ServiceContext } from '../../index'
import {
  GraphQLType as _GraphQLType,
  decorateResolver,
  decorateGraphQLType
} from '../../lib/plugins/GraphQLServerPlugin/Resolver'
import {
  Connector as _Connector,
  IdentityConfig as _IdentityConfig
} from '../../lib/plugins/GraphQLServerPlugin/Connector'

/**
 * Base class for implementing resolvers.
 *
 * Resolvers are responsible for defining how to resolve properties declared in an API’s
 * schema.
 *
 * When a resolver is written for a scalar property (such as a string or number), it should
 * return either the scalar value or (more typically) a Promise for the scalar value.
 *
 * When a resolver is written for a relation to another object, it should not fetch the
 * object, but instead return a string ID for that object. This is then provided to
 * that Object's resolver as its id property, which can then be used to fetch data
 * about it from backend services.
 *
 *
 * @class
 */
export interface GraphQLType {
  /** ID of the object that is being resolved */
  readonly id: string
  readonly context: ServiceContext
}
export const GraphQLType: new(context: ServiceContext, id: string) => GraphQLType = _GraphQLType

/**
 * Declare the that a resolver is used to resolve schema objects of a specific type
 * with a known ID.
 *
 * @param typeName Name of the type to resolve.
 */
export function type(typeName: string): ClassDecorator {
  return decorateGraphQLType(typeName)
}

/**
 * Declare the that a resolver is used to resolve top-level queries (without the ID of
 * a parent object).
 */
export function queries(): ClassDecorator {
  return decorateGraphQLType('Query')
}

/**
 * Declare the that a resolver is used to perform mutations.
 */
export function mutations(): ClassDecorator {
  return decorateGraphQLType('Mutation')
}

/**
 * Declare the a method of a resolver is used to resolve a type field of the same name.
 */
export function resolver(): MethodDecorator {
  return decorateResolver
}

/**
 * Base class for objects defining how to mutate and retrieve data from remote resources.
 *
 * Typically, these will be API clients for remote web services used to resolve
 * GraphQL requests.
 *
 * Connector instances have access to the request context, so they are able to retrive
 * authentication credentials and inject useful helper objects such as HttpClient.
 *
 * A common use case for a connector is to get a resource by id.
 * Where a resource is identified by a string id, subclassing a Connector using
 * `withIdentify` and defining how to fetch a batch of resources by id will expose additional
 * methods on your Connector subclass such as `fetchOne`, which will batch and de-duplicate
 * get requests to remote services made over a single incoming request.
 *
 * @class
 */
export interface Connector {
  readonly context: ServiceContext
}

export const Connector: {
  withIdentity<T>(Config: new(context: ServiceContext) => IdentityConfig<T>): new(context: ServiceContext) => ConnectorWithIdentity<T>

  new(context: ServiceContext): Connector
} = _Connector

/**
 * Base class for objects defining how to mutate and retrieve data from remote resources where
 * the resource can be uniquely identified and retrieved using a single ID.
 *
 * @class Connector.withIdentity
 */
export interface ConnectorWithIdentity<T> extends Connector {
  /**
   * Fetch a single instances of the connected resource by id.
   */
  getOne(id: string): Promise<T | undefined>

  /**
   * Fetch multiple single instances of the connected resource by id.
   */
  getMany(ids: string[]): Promise<Array<T | undefined>>

  /**
   * Fetch an instance of the connected resource by id and return a property of it.
   */
  getProperty<Key extends keyof T>(id: string, key: Key): Promise<T[Key] | undefined>
}

/**
 * Configuration class describing how to fetch a batch of resources by ID.
 *
 * Subclasses of IdentityConfig are a special case of connectors.
 * Although written like other connectors, they consist of a single method and are not
 * called directly from your resolvers.
 *
 * Instead, when you subclass Connector.withIdentity, your IdentityConfig subclass is
 * passed as a parameter, defining how Connector.withIdentity should get a batch of resources
 * by ID.
 *
 * @class
 */
export interface IdentityConfig<T> {
  /**
   * Given a list of resource IDs, fetch an instance of each resource and return an object
   * mapping IDs to values.
   */
  getMany(ids: string[]): Promise<Record<string, T>>
}
export const IdentityConfig: new<T>(context: ServiceContext) => IdentityConfig<T> = _IdentityConfig
