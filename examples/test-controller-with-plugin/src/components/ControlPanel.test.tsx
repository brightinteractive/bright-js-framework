import * as React from 'react'
import { controllerTestFixture } from '@brightinteractive/bright-js-framework/test-utils'
import { ControlPanel } from './ControlPanel'
import EventManagerPlugin from '../plugins/EventManagerPlugin'

describe('ControlPanel', () => {
  it('posts message when button is clicked', async (done) => {
    const fixture = await controllerTestFixture({
      plugins: [EventManagerPlugin],
      markup: (
        <ControlPanel />
      )
    })

    return new Promise((resolve) => {
      fixture.getPlugin(EventManagerPlugin).eventManager.registerHandler('request-open-pod-bay-doors', () => {
        done()
      })
    })
  })
})
