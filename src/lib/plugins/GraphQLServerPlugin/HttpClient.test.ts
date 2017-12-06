import { spy, match } from 'sinon'
import { expect } from 'chai'
import { Response } from 'node-fetch'
import { HttpClient, HttpMethod, BodyType } from './HttpClient'
import { ApplicationContext } from '../../core/ApplicationContext'

describe('HttpClient', () => {
  it('should get json', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    expect(await client.get({ url: 'http://foo.com' })).to.eql(true)
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasHeader('Accept', 'application/json')
        .and(hasMethod('GET'))
    )
  })

  it('should put json', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    const body = 1

    expect(await client.put({ url: 'http://foo.com', body })).to.eql(true)
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasHeader('Accept', 'application/json')
        .and(hasHeader('Content-Type', 'application/json'))
        .and(hasMethod('PUT'))
        .and(hasBody(JSON.stringify(body)))
    )
  })

  it('should post json', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    const body = 1

    expect(await client.post({ url: 'http://foo.com', body })).to.eql(true)
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasHeader('Accept', 'application/json')
        .and(hasHeader('Content-Type', 'application/json'))
        .and(hasMethod('POST'))
        .and(hasBody(JSON.stringify(body)))
    )
  })

  it('should patch json', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    const body = 1

    expect(await client.patch({ url: 'http://foo.com', body })).to.eql(true)
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasHeader('Accept', 'application/json')
        .and(hasHeader('Content-Type', 'application/json'))
        .and(hasMethod('PATCH'))
        .and(hasBody(JSON.stringify(body)))
    )
  })

  it('should delete', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    expect(await client.delete({ url: 'http://foo.com' })).to.be.undefined
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasMethod('DELETE')
    )
  })

  it('should perform HEAD call', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    expect(await client.head({ url: 'http://foo.com' })).to.be.undefined
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasMethod('HEAD')
    )
  })

  it('should perform OPTIONS call', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    expect(await client.options({ url: 'http://foo.com' })).to.eql(true)
    expect(fetch).to.have.been.calledWithMatch(
      match('http://foo.com'),
      hasHeader('Accept', 'application/json')
        .and(hasMethod('OPTIONS'))
    )
  })

  context('with FormData request type', () => {
    const methods: Array<'put' | 'post' | 'patch'> = ['put', 'post', 'patch']

    methods.forEach((method) => {
      it(`should ${method} form data`, async () => {
        const fetch = mockFetch(200, JSON.stringify(true))
        const client = createClient(fetch)

        const body = { username: 'me', password: 'football' }

        expect(await client[method]({ url: 'http://foo.com', body, bodyType: BodyType.FormData })).to.eql(true)
        expect(fetch).to.have.been.calledWithMatch(
          'http://foo.com',
          hasBodyFormDataField('username', 'me')
            .and(hasBodyFormDataField('password', 'football'))
            .and(hasHeader('Content-Type', 'application/x-www-form-urlencoded')),
        )
      })
    })
  })

  it('should allow url to be provided as an object without query', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    await client.request('GET', {
      url: {
        baseUrl: 'http://foo.com/api',
        path: '/users/me',
      }
    })

    expect(fetch).to.have.been.calledWith('http://foo.com/api/users/me')
  })

  it('should allow url to be provided as an object with query', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    await client.request('GET', {
      url: {
        baseUrl: 'http://foo.com/api',
        path: '/users/me',
        query: {
          flag: 'yes'
        }
      }
    })

    expect(fetch).to.have.been.calledWith('http://foo.com/api/users/me?flag=yes')
  })

  it('should allow url to be provided as an object with list as query', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    await client.request('GET', {
      url: {
        baseUrl: 'http://foo.com/api',
        path: '/users/me',
        query: {
          list: [1, 2, 3]
        }
      }
    })

    expect(fetch).to.have.been.calledWith('http://foo.com/api/users/me?list=1&list=2&list=3')
  })

  it('should give presidence to explicitly provided headers', async () => {
    const fetch = mockFetch(200, JSON.stringify(true))
    const client = createClient(fetch)

    await client.request('GET', {
      bodyType: BodyType.Json,
      url: {
        baseUrl: 'http://foo.com/api',
        path: '/users/me'
      },
      headers: {
        'Content-Type': 'application/json+foo'
      }
    })

    expect(fetch).to.have.been.calledWithMatch(
      match.any,
      hasHeader('Content-Type', 'application/json+foo')
    )
  })

  it('should throw on http error', async () => {
    const fetch = mockFetch(404, undefined)
    const client = createClient(fetch)

    return expect(client.request('GET', { url: 'http://foo.com/api' })).to.eventually.be.rejectedWith(/404/)
  })
})

function createClient(fetchFn: any) {
  return new HttpClient({ fetchFn, context: { '@appContext': new ApplicationContext() } })
}

function mockFetch(status: number, body: any) {
  return spy(() => {
    const response = new Response(body, {
      status
    })
    return Promise.resolve(response)
  })
}

function hasHeader(name: string, value: string) {
  return match.has('headers', match((values: string[][]) => values.some(([n, v]) => n === name && v === value), `with ${name}=${value}`))
}

function hasMethod(name: HttpMethod) {
  return match.has('method', name)
}

function hasBody(body: {}) {
  return match.has('body', match.same(body))
}

function hasBodyFormDataField(name: string, value: string) {
  return match.has(
    'body', match((form: FormData) => form.get(name) === value, `formData(${name}=${value})`)
  )
}
