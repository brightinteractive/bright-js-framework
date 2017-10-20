import { expect } from 'chai'
import { renderHtmlWrapper } from './renderHtmlWrapper'

describe('renderHtmlWrapper()', () => {
  it('should pass process.env through to client', () => {
    expect(renderHtmlWrapper({ config: { foo: '1' } }))
      .to.contain('<script>___process_env_config={"foo":"1"}</script>')
  })
})
