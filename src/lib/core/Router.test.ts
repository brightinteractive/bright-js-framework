import * as React from 'react'
import { createMemoryHistory } from 'history'
import { expect } from 'chai'
import { Router, RouteConfig } from './Router'

describe('Router', () => {
  it('should match for route', () => {
    const match = matchRoute('/', [
      { path: '/', handler: React.Component },
      { path: '/foo', handler: React.Component },
    ], 'PUSH')

    expect(match && match.handler).to.eql(React.Component)
    expect(match && match.location.pathname).to.eql('/')
  })

  it('should return undefined for no match', () => {
    const match = matchRoute('/bar', [
      { path: '/', handler: React.Component },
      { path: '/foo', handler: React.Component },
    ], 'PUSH')

    expect(match && match.handler).to.be.undefined
  })

  it('should return route param and query params when specified', () => {
    const match = matchRoute('/users/foo?queryFlag=1', [
      { path: '/', handler: React.Component },
      { path: '/users/:user', handler: React.Component },
    ], 'PUSH')

    expect(match && match.pathParams.user).to.eql('foo')
    expect(match && match.queryParams.queryFlag).to.eql('1')
  })
})

function matchRoute(path: string, routes: RouteConfig[], action: 'PUSH' | 'REPLACE') {
  const history = createMemoryHistory()
  history.push(path)

  const router = new Router(routes)
  return router.match(history.location)
}
