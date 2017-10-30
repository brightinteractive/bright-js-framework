import { expect } from 'chai'
import * as React from 'react'
import { decorateController, isController } from './Controller'

describe('Controller', () => {
  @decorateController
  class TestController extends React.PureComponent {
    render() {
      if (!this.props.children) {
        return null
      }

      return React.Children.only(this.props.children)
    }
  }

  describe('isController()', () => {
    it('should return true for components marked as controllers', () => {
      expect(isController(new TestController({}))).to.be.true
    })

    it('should return false for components not marked as controllers', () => {
      expect(isController(new React.Component({}))).to.be.false
    })
  })
})
