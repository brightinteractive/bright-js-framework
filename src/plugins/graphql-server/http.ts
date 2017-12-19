import {
  HttpClient as _HttpClient,
  HttpError as _HttpError,
  ResponseType as _ResponseType,
  BodyType as _BodyType,
} from '../../lib/plugins/GraphQLServerPlugin/HttpClient'

/**
 * HTTP client for use in GraphQL connectors.
 *
 * A single HTTP client is shared between resolvers in a GraphQL requests.
 * You can inject the HTTP client into a connector with the @inject decorator:
 *
 * ```
 *  class UserConnector extends Connector {
 *    @inject(HttpClient)
 *    httpClient: HttpClient
 *
 *    async delete(id: string) {
 *      await this.httpClient.delete({
 *        baseUrl: process.env.USERS_API,
 *        subpath: `/users/${id}`
 *      })
 *    }
 *  }
 * ```
 *
 * @class
 */
export interface HttpClient {
  /**
   * Performs an HTTP GET request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to JSON response type
   */
  get<T = {}>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP PUT request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to JSON request and response types
   */
  put<T = {}>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP POST request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to JSON request and response types
   */
  post<T = {}>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP PATCH request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to JSON request and response types
   */
  patch<T = {}>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP DELETE request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to empty request and response types
   */
  delete<T = undefined>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP OPTIONS request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to empty request type and JSON response type
   */
  options<T = undefined>(opts: RequestOpts): Promise<T>

  /**
   * Performs an HTTP HEAD request and returns the response.
   *
   * Throws an HttpError if the response status code is >= 400.
   * Defaults to empty request and response types
   */
  head<T = undefined>(opts: RequestOpts): Promise<T>
}
export const HttpClient: {} = _HttpClient

/**
 * Object describing the status code of a failed HTTP request.
 *
 * @class
 */
export interface HttpError extends Error {
  /** Status code returned by the request */
  readonly status: number
}
export const HttpError: new(status: number, method: string, url: string) => HttpError = _HttpError

/**
 * Convenience interface for passing URL components to an http request.
 */
export interface FetchUrl {
  /**
   * First portion of the URL
   *
   * This is generally extracted from an environmental variable. For example,
   * `'http://api.my-domain.com'` or `process.env.API_HOST`
   */
  baseUrl: string

  /** Second portion of the URL (eg: `'/users'`) */
  path: string

  /** Query params appended to the URL */
  query?: Record<string, string | string[]>
}

export interface RequestOpts {
  /** Request URL */
  url: string | FetchUrl

  /** Request body. Headers and serialization are defined by `responseType` */
  body?: any

  /**
   * Any additional headers to add to the Request.
   *
   * You generally won’t need to include `Authorization`, `Accept` or `Content-Type`
   * as they are provided by other request options.
   */
  headers?: Record<string, string>

  /**
   * Object describing headers and deserialization functions for the response body.
   */
  responseType?: ResponseType

  /**
   * Object describing headers and serialization functions for the request body.
   */
  bodyType?: BodyType
}

/**
 * Object describing headers and deserialization functions for the response body.
 */
export interface ResponseType {
  /** Any additional headers to set on the request (eg: `Accept`) */
  headers: Record<string, string>

  /** Function from a `fetch()` response to a promise containing deserialized data */
  convert: (x: Response) => Promise<any> | undefined
}

/**
 * Built-in response types.
 */
export const ResponseType: {
  /**
   * JSON response type. Default for GET, PUT, POST and PATCH requests.
   *
   * Sets `Accept: application/json` on the request and deserializes the
   * response body from JSON
   */
  Json: ResponseType,

  /**
   * Empty response type. Default for DELETE requests.
   *
   * Omits `Accept` headers from the request and ignores the response body.
   */
  Empty: ResponseType,
} = _ResponseType

/**
 * Object describing headers and serialization functions for the request body.
 */
export interface BodyType {
  /** Any additional headers to set on the request (eg: `Content-Type`) */
  headers: Record<string, string>

  /** Serialization function for the request body */
  convert: (x: any) => any
}

export const BodyType: {
  /**
   * FormData request body.
   *
   * Sets `Content-Type: application/x-www-form-urlencoded` on the request
   * and encodes the request body object as url-encoded form data.
   */
  FormData: BodyType,

  /**
   * JSON request body. Default for PUT, POST and PATCH requests.
   *
   * Sets `Content-Type: application/json` on the request and serializes the
   * request body object to JSON.
   */
  Json: BodyType,

  /**
   * JSON request body. Default for GET and DELETE requests.
   *
   * Sets `Content-Type: application/json` on the request and serializes the
   * request body object to JSON.
   */
  Empty: BodyType,
} = _BodyType
