import * as React from 'react'
import { expect } from 'chai'
import { getBundleRoutes } from './getBundleRoutes'
import { decorateRouteComponent } from '../core/route'

describe('getBundleRoutes()', () => {
  it('should require entry modules and return array of route configs', () => {
    class Route extends React.Component { }
    decorateRouteComponent('/foo', Route)

    class NonRoute extends React.Component { }

    const modules = [
      () => ({ a: Route, b: NonRoute }),
      () => ({ a: NonRoute, b: Route })
    ]

    expect(getBundleRoutes(modules)).to.eql([
      { handler: Route, path: '/foo' },
      { handler: Route, path: '/foo' },
    ])
  })
})
