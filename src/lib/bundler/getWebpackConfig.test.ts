import { getWebpackConfig } from './getWebpackConfig'

describe('getWebpackConfig()', () => {
  it('should generate webpack config', () => {
    getWebpackConfig({ pages: ['foo.js'], plugins: [] })
  })
})
