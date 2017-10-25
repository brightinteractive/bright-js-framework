import * as React from 'react'
import { expect } from 'chai'
import { decorateRouteComponent, isRouteComponent, getRouteComponentPath } from './route'

describe('isRouteComponent()', () => {
  it('should return true for decorated component', () => {
    class MyRoute extends React.Component { }

    decorateRouteComponent('/foo', MyRoute)
    expect(isRouteComponent(MyRoute)).to.be.true
  })

  it('should return false for non-decorated component', () => {
    class MyRoute extends React.Component { }
    expect(isRouteComponent(MyRoute)).to.be.false
  })
})

describe('getRouteComponentPath()', () => {
  it('should return route path', () => {
    class MyRoute extends React.Component { }

    decorateRouteComponent('/foo', MyRoute)
    expect(getRouteComponentPath(MyRoute)).to.eql('/foo')
  })
})
