import * as Dataloader from 'dataloader'
import { InjectionClient, InjectionContext } from '../../core/InjectionClient'

export class Connector extends InjectionClient {
  /**
   * Return a subclass of Connector capapble of performing batched requests by identity to a remote API.
   * An interface to the API is provided as the Config parameter.
   *
   * This is suited to the common case where a resource is fetched by ID. Using an identity connector
   * de-duplicates requests for the same resource over a single GraphQL request and batches requests
   * into a single network request.
   */
  static forResource<T>(Config: ResourceBatchFetcherConstructor<T>): ResourceConnectorConstructor<T> {
    class ResourceWithIdConnector extends Connector {
      loader: Dataloader<string, T | undefined>

      constructor(context: InjectionContext) {
        super(context)

        this.loader = new Dataloader(async (ids: string[]) => {
          const config = new Config(this.context)
          const resultMap = await config.getMany(ids)

          return ids.map((id) => {
            return resultMap[id]
          })
        })
      }

      getOne(id: string) {
        return this.loader.load(id)
      }

      getProperty<Key extends keyof T>(id: string, key: Key): Promise<T[Key] | undefined> {
        return this.getOne(id).then((res) => res && res[key])
      }

      getMany(ids: string[]) {
        return this.loader.loadMany(ids)
      }
    }

    return ResourceWithIdConnector
  }
}

export class ResourceBatchFetcher<T> extends InjectionClient {
  constructor(context: InjectionContext) {
    super(context)

    if (process.env.NODE_ENV !== 'production') {
      if (this.getMany === ResourceBatchFetcher.prototype.getMany) {
        throw new Error(`${this.constructor.name} must override getMany()`)
      }
    }
  }

  getMany(ids: string[]): Promise<Record<string, T>> {
    throw new Error(`${this.constructor.name} must override getMany()`)
  }
}

export type ResourceBatchFetcherConstructor<T> = new(context: InjectionContext) => ResourceBatchFetcher<T>

export interface ResourceConnector<T> extends Connector {
  getProperty<Key extends keyof T>(id: string, key: Key): Promise<T[Key] | undefined>
  getOne(id: string): Promise<T | undefined>
  getMany(ids: string[]): Promise<Array<T | undefined>>
}

export interface ResourceConnectorConstructor<T> {
  new(context: InjectionContext): ResourceConnector<T>
}

export interface ConnectorConstructor {
  new(context: InjectionContext): Connector
}