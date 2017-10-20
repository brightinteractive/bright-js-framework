import { expect } from 'chai'
import { renderHtmlWrapper } from './renderHtmlWrapper'

describe('renderHtmlWrapper()', () => {
  it('should render html wrapper to string', () => {
    expect(renderHtmlWrapper()).to.be.a('string')
  })
})
