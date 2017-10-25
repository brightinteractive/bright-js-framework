import * as React from 'react'
import { expect } from 'chai'
import { decorateRouteComponent, isRouteComponent, getRouteComponentPath } from './route'

describe('isRouteComponent()', () => {
  it('should return true for decorated component', () => {
    class MyRoute extends React.Component { }

    decorateRouteComponent('/foo', MyRoute)
    expect(isRouteComponent(MyRoute)).to.be.true
  })

<<<<<<< HEAD
  it('should return false for non-decorated component', () => {
    class MyRoute extends React.Component {}
=======
  it('should return true for non-decorated component', () => {
    class MyRoute extends React.Component { }
>>>>>>> 2243fdf... AP-86: Code style
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
