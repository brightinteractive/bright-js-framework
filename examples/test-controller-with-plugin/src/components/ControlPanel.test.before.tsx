import * as React from 'react'
import { mount } from 'enzyme'
import { ControlPanel } from './ControlPanel'

describe('ControlPanel', () => {
  it('posts message when button is clicked', () => {
    const dom = mount(<ControlPanel />)
    dom.closest('button').simulate('click')
  })
})
