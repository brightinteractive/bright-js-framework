import * as React from 'react'
import { expect } from 'chai'
import { Location } from 'history'
import { ControllerTestFixture } from '../../fixtures/ControllerTestFixture'
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

  it('should provide location to controllers', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    expect(fixture.instance.location.value.pathname).to.eql('/1')
  })

  it('should push browser location', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.instance.actions.pushLocation('/2')
    expect(fixture.instance.location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should replace browser location', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.instance.actions.replaceLocation('/2')
    expect(fixture.instance.location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should replace browser location', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.instance.actions.replaceLocation('/2')
    expect(fixture.instance.location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })

  it('should go back', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.instance.actions.pushLocation('/2')
    fixture.instance.actions.goBack()
    expect(fixture.instance.location.value.pathname).to.eql('/1')
    expect(fixture.location.pathname).to.eql('/1')
  })

  it('should go forward', async () => {
    const fixture = await ControllerTestFixture.create<LocationView>({
      markup: <LocationView />,
      location: '/1'
    })

    fixture.instance.actions.pushLocation('/2')
    fixture.instance.actions.goBack()
    fixture.instance.actions.goForward()
    expect(fixture.instance.location.value.pathname).to.eql('/2')
    expect(fixture.location.pathname).to.eql('/2')
  })
})
