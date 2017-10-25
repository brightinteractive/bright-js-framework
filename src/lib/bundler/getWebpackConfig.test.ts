import { getWebpackConfig } from './getWebpackConfig'

describe('getWebpackConfig()', () => {
  it('should generate webpack config', () => {
    getWebpackConfig({ entrypoints: ['foo.js'] })
  })
})
