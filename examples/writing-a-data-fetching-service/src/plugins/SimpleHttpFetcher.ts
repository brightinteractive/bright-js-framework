import { Service, PluginConfig, service, state, select, dispatcher, Dispatcher, StateSelection } from '@brightinteractive/bright-js-framework'

// Key identifying HTTP state
const HTTP_STATE = 'http-data'

// Cached HTTP resources
type HttpState = Record<string, HttpResource>

// Action describing result of http fetch
type HttpResource
  = { status: 'error', error: Error }
  | { status: 'completed', data: any }

// Public service interface
export interface HttpGet<T> {
  readonly data: T
}

// Decorator used to install service on a controller
export function get(url: string): PropertyDecorator {
  const resourceState = (data: any): HttpState => data[HTTP_STATE][url]

  class HttpGetService extends Service implements HttpGet<any> {
    @dispatcher()
    private dispatch: Dispatcher<SimpleHttpFetcherAction>

    @select(resourceState)
    private resourceState: StateSelection<HttpResource>

    get data() {
      // Throw fetch errors when the user attempts to get the data.
      // This can be caught using React's componentWillCatch method.
      if (this.resourceState.value.status === 'error') {
        throw this.resourceState.value.error
      }

      return this.resourceState.value.data
    }

    async serviceWillLoad() {
      // Don't refetch data that is already fetched
      if (this.resourceState) {
        return
      }

      try {
        const result = await fetch(url)
        if (!result.ok) {
          throw new Error(result.statusText)
        }

        this.dispatch({
          type: 'http:fetch:completed',
          url,
          payload: await result.json()
        })

      } catch (error) {
        this.dispatch({
          type: 'http:fetch:failed',
          url,
          error
        })
      }
    }
  }

  return service(HttpGetService)
}

type SimpleHttpFetcherAction
  = { type: 'http:fetch:completed', url: string, payload: any }
  | { type: 'http:fetch:failed', url: string, error: Error }

export class SimpleHttpFetcher extends PluginConfig {
  @state(HTTP_STATE)
  static updateState(prev: HttpState = {}, action: SimpleHttpFetcherAction): HttpState {
    if (action.type === 'http:fetch:completed') {
      return {
        ...prev,
        [action.url]: {
          status: 'completed',
          data: action.payload
        }
      }
    }

    if (action.type === 'http:fetch:failed') {
      return {
        ...prev,
        [action.url]: {
          status: 'error',
          error: action.error
        }
      }
    }

    return prev
  }
}
