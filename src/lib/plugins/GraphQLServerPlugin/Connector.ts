import * as Dataloader from 'dataloader'
import * as stableStringify from 'json-stable-stringify'
import {InjectionClient, InjectionContext} from '../../core/InjectionClient'
import {keyBy} from 'lodash'

export function orderListById<IdType, Value>(unorderedResultList: KeyValuePairs<IdType, Value>, ids: IdType[]): Value[] {
  const mapOfStableIdToIndexedPairs = keyBy(unorderedResultList, ([item]) => stableStringify(item))

  return ids.map((id) => {
    const keyValuePair = mapOfStableIdToIndexedPairs[stableStringify(id)]
    return keyValuePair[1]
  })
}

export class Connector extends InjectionClient {
  /**
   * Return a subclass of Connector capable of performing batched requests by identity to a remote API.
   * An interface to the API is provided as the Config parameter.
   *
   * This is suited to the common case where a resource is fetched by ID. Using an identity connector
   * de-duplicates requests for the same resource over a single GraphQL request and batches requests
   * into a single network request.
   */
  static forResource<IdType, Value>(Config: ResourceBatchFetcherConstructor<IdType, Value>): ResourceConnectorConstructor<IdType, Value> {
    class ResourceWithIdConnector extends Connector {
      loader: Dataloader<IdType, Value | undefined>

      constructor(context: InjectionContext) {
        super(context)

        this.loader = new Dataloader<IdType, Value>(async (ids: IdType[]) => {
          const config = new Config(this.context)
          const unorderedResultList = await config.getMany(ids)

          return orderListById(unorderedResultList, ids)
        })
      }

      getOne(id: IdType) {
        return this.loader.load(id)
      }

      getProperty<Key extends keyof Value>(id: IdType, key: Key): Promise<Value[Key] | undefined> {
        return this.getOne(id).then((res) => res && res[key])
      }

      getMany(ids: IdType[]) {
        return this.loader.loadMany(ids)
      }
    }

    return ResourceWithIdConnector
  }
}

export type KeyValuePair<Id, Value> = [Id, Value]

export type KeyValuePairs<Id, Value> = Array<KeyValuePair<Id, Value>>

export class ResourceBatchFetcher<Id, Value> extends InjectionClient {
  constructor(context: InjectionContext) {
    super(context)

    if (process.env.NODE_ENV !== 'production') {
      if (this.getMany === ResourceBatchFetcher.prototype.getMany) {
        throw new Error(`${this.constructor.name} must override getMany()`)
      }
    }
  }

  getMany(ids: Id[]): Promise<KeyValuePairs<Id, Value>> {
    throw new Error(`${this.constructor.name} must override getMany()`)
  }
}

export type ResourceBatchFetcherConstructor<Id, Value> = new(context: InjectionContext) => ResourceBatchFetcher<Id, Value>

export interface ResourceConnector<IdType, Value> extends Connector {
  getProperty<Key extends keyof Value>(id: IdType, key: Key): Promise<Value[Key] | undefined>

  getOne(id: IdType): Promise<Value | undefined>

  getMany(ids: IdType[]): Promise<Array<Value | undefined>>
}

export interface ResourceConnectorConstructor<IdType, Value> {
  new(context: InjectionContext): ResourceConnector<IdType, Value>
}

export interface ConnectorConstructor {
  new(context: InjectionContext): Connector
}
