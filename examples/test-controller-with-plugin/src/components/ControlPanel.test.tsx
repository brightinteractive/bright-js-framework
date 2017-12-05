import * as React from 'react'
import { TestFixture } from '@brightinteractive/bright-js-framework/test-utils'
import { ControlPanel } from './ControlPanel'
import EventManagerPlugin from '../plugins/EventManagerPlugin'

describe('ControlPanel', () => {
  it('posts message when button is clicked', (done) => {
    const fixture = new TestFixture({
      plugins: [EventManagerPlugin],
      markup: (
        <ControlPanel />
      )
    })

    fixture.getPlugin(EventManagerPlugin).eventManager.registerHandler('request-open-pod-bay-doors', () => {
      done()
    })

    fixture.render().closest('button').simulate('click')
  })
})
