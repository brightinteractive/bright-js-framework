import { ServiceContext } from '../../index'
import {
  SchemaType as _SchemaType,
  decorateResolver,
  decorateSchemaType
} from '../../lib/plugins/GraphQLServerPlugin/Resolver'
import {
  Connector as _Connector,
  ResourceBatchFetcher as _ResourceBatchFetcher
} from '../../lib/plugins/GraphQLServerPlugin/Connector'

/**
 * Base class for implementing resolver maps.
 *
 * ResolverMaps are collections of resolver functions, each one being responsible for defining
 * how to resolve properties declared in an API’s schema.
 *
 * When a resolver function is written for a scalar property (such as a string or number), it should
 * return either the scalar value or (more typically) a Promise for the scalar value.
 *
 * When a resolver function is written for a relation to another object, it should not fetch the
 * object, but instead return a string ID for that object. This is then provided to
 * that Object's ResolverMap as its id property, which can then be used by the functions within the ResolverMap to fetch data
 * about it from backend services.
 *
 *
 * @class
 */
export interface SchemaType {
  /** ID of the object that is being resolved */
  readonly id: string
  readonly context: ServiceContext
}
export const SchemaType: new(context: ServiceContext, id: string) => SchemaType = _SchemaType

/**
 * Declare the that a resolver is used to resolve schema objects of a specific type
 * with a known ID.
 *
 * @param typeName Name of the type to resolve.
 */
export function type(typeName: string): ClassDecorator {
  return decorateSchemaType(typeName)
}

/**
 * Declare the that a ResolverMap contains functions used to resolve top-level queries (without the ID of
 * a parent object).
 */
export function queries(): ClassDecorator {
  return decorateSchemaType('Query')
}

/**
 * Declare the that a ResolverMap contains functions used to perform mutations.
 */
export function mutations(): ClassDecorator {
  return decorateSchemaType('Mutation')
}

/**
 * Declare the a method of a ResolverMap is used to resolve a type field of the same name.
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
  forResource<T>(Config: new(context: ServiceContext) => ResourceBatchFetcher<T>): new(context: ServiceContext) => ResourceWithIdConnector<T>

  new(context: ServiceContext): Connector
} = _Connector

/**
 * Base class for objects defining how to mutate and retrieve data from remote resources where
 * the resource can be uniquely identified and retrieved using a single ID.
 *
 * @class Connector.forResource
 */
export interface ResourceWithIdConnector<T> extends Connector {
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
 * Batch retriever class describing how to fetch a batch of resources by ID.
 *
 * Subclasses of ResourceBatchFetcher are a special case of connectors.
 * Although written like other connectors, they consist of a single method and are not
 * called directly from your ResolverMap.
 *
 * Instead, when you subclass ResourceWithIdConnector, your ResourceBatchFetcher subclass is
 * passed as a parameter, defining how the ResourceWithIdConnector should get a batch of resources
 * by ID.
 *
 * @class
 */
export interface ResourceBatchFetcher<T> {
  /**
   * Given a list of resource IDs, fetch an instance of each resource and return an object
   * mapping IDs to values.
   */
  getMany(ids: string[]): Promise<Record<string, T>>
}
export const ResourceBatchFetcher: new<T>(context: ServiceContext) => ResourceBatchFetcher<T> = _ResourceBatchFetcher
