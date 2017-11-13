import * as React from 'react'
import { expect } from 'chai'
import { Location } from 'history'
import { TestFixture } from '../../entry/TestFixture'
import { decorateController } from '../../core/Controller'
import { locationSelect } from './BrowserPlugin'
import { createSelectService, StateSelector } from '../StorePlugin/SelectService'
import { decorateServiceProperty } from '../../core/Service'
import { BrowserActions } from './BrowserActions'

describe('BrowserPlugin', () => {
  @decorateController
  class LocationView extends React.PureComponent {
    @createSelectService(locationSelect)
    location: StateSelector<Location>

    @decorateServiceProperty(BrowserActions)
    actions: BrowserActions

    render() {
      return null
    }
  }

  it('should provide location to controllers', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/1')
  })

  it('should push browser location', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.getInstance<LocationView>().actions.pushLocation('/2')
    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should replace browser location', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.getInstance<LocationView>().actions.replaceLocation('/2')
    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should replace browser location', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.getInstance<LocationView>().actions.replaceLocation('/2')
    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should go back', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.getInstance<LocationView>().actions.pushLocation('/2')
    fixture.getInstance<LocationView>().actions.goBack()
    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/1')
    expect(fixture.location.pathname).to.eql('/1')
  })

  it('should go forward', () => {
    const fixture = new TestFixture({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.getInstance<LocationView>().actions.pushLocation('/2')
    fixture.getInstance<LocationView>().actions.goBack()
    fixture.getInstance<LocationView>().actions.goForward()
    expect(fixture.getInstance<LocationView>().location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })
})
