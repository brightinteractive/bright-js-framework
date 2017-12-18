import 'isomorphic-fetch'
import { forEach } from 'lodash'
import * as qs from 'querystring'
import { InjectionContext, InjectionClient } from '../../core/InjectionClient'

export class HttpError implements Error {
  readonly status: number

  constructor(status: number) {
    this.status = status
  }

  get message() {
    return `Http ${this.status}`
  }

  get name() {
    return 'HTTPError'
  }
}

export type HttpMethod = 'GET' | 'PUT' | 'PATCH' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD'

export interface FetchUrl {
  baseUrl: string
  path: string
  query?: {}
}

export interface RequestOpts {
  url: string | FetchUrl
  body?: any
  headers?: Record<string, string>
  responseType?: ResponseType
  bodyType?: BodyType
}

export interface ResponseType {
  headers: Record<string, string>
  convert: (x: Response) => Promise<any> | undefined
}

export interface BodyType {
  headers: Record<string, string>
  convert: (x: any) => any
}

export const BodyType = {
  FormData: {
    convert: (body: Record<string, string>) => {
      const form = new FormData()
      forEach(body, (value, key) => {
        form.append(key, value)
      })
      return form
    },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  },
  Json: {
    convert: JSON.stringify,
    headers: { 'Content-Type': 'application/json' }
  },
  Empty: {
    convert: () => undefined,
    headers: {}
  }
}

export const ResponseType = {
  Json: {
    convert: (x: Response) => x.json(),
    headers: { Accept: 'application/json' }
  },
  Empty: {
    convert: () => undefined,
    headers: {}
  }
}

export interface HttpClientProps {
  fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
  context: InjectionContext
}

export class HttpClient extends InjectionClient {
  private fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>

  constructor({ fetchFn = fetch, context }: HttpClientProps) {
    super(context)
    this.fetch = fetchFn
  }

  async request(method: HttpMethod, opts: RequestOpts) {
    const { headers, body, bodyType = BodyType.Empty, responseType = ResponseType.Empty } = opts
    const res = await this.fetch(formatUrl(opts.url), {
      method,
      body: bodyType.convert(body),
      headers: {
        ...bodyType.headers,
        ...responseType.headers,
        ...(headers || {}),
      } as any
    })

    if (!res.ok) {
      throw new HttpError(res.status)
    }

    return responseType.convert(res)
  }

  get(opts: RequestOpts) {
    return this.request('GET', {
      bodyType: BodyType.Empty,
      responseType: ResponseType.Json,
      ...opts
    })
  }

  put(opts: RequestOpts) {
    return this.request('PUT', {
      bodyType: BodyType.Json,
      responseType: ResponseType.Json,
      ...opts
    })
  }

  post(opts: RequestOpts) {
    return this.request('POST', {
      bodyType: BodyType.Json,
      responseType: ResponseType.Json,
      ...opts
    })
  }

  patch(opts: RequestOpts) {
    return this.request('PATCH', {
      bodyType: BodyType.Json,
      responseType: ResponseType.Json,
      ...opts
    })
  }

  delete(opts: RequestOpts) {
    return this.request('DELETE', {
      bodyType: BodyType.Empty,
      responseType: ResponseType.Empty,
      ...opts
    })
  }

  options(opts: RequestOpts) {
    return this.request('OPTIONS', {
      bodyType: BodyType.Empty,
      responseType: ResponseType.Json,
      ...opts
    })
  }

  head(opts: RequestOpts) {
    return this.request('HEAD', {
      bodyType: BodyType.Empty,
      responseType: ResponseType.Empty,
      ...opts
    })
  }
}

function formatUrl(url: FetchUrl | string) {
  if (typeof url === 'string') {
    return url
  }

  return `${url.baseUrl}${url.path}${url.query ? '?' + qs.stringify(url.query) : ''}`
}
