import * as React from 'react'
import { expect } from 'chai'
import { Router } from './Router'

describe('Router', () => {
  it('should match for route', () => {
    const match = Router.match('/', [
      {path: '/', handler: React.Component},
      {path: '/foo', handler: React.Component},
    ], 'PUSH')

    expect(match && match.handler).to.eql(React.Component)
    expect(match && match.location.pathname).to.eql('/')
  })

  it('should return undefined for no match', () => {
    const match = Router.match('/bar', [
      {path: '/', handler: React.Component},
      {path: '/foo', handler: React.Component},
    ], 'PUSH')

    expect(match && match.handler).to.be.undefined
  })

  it('should match against location objects', () => {
    const match = Router.match({ pathname: '/' }, [
      {path: '/', handler: React.Component},
      {path: '/foo', handler: React.Component},
    ], 'PUSH')

    expect(match && match.location.pathname).to.eql('/')
  })

  it('should return route param and query params when specified', () => {
    const match = Router.match('/users/foo?queryFlag=1', [
      {path: '/', handler: React.Component},
      {path: '/users/:user', handler: React.Component},
    ], 'PUSH')

    expect(match && match.pathParams.user).to.eql('foo')
    expect(match && match.queryParams.queryFlag).to.eql('1')
  })
})
