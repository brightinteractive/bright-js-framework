import { getWebpackConfig } from './getWebpackConfig'

describe('getWebpackConfig()', () => {
  it('should generate devserver webpack config', () => {
    getWebpackConfig({ pages: ['foo.js'], plugins: [], devServer: true })
  })

  it('should generate production webpack config', () => {
    getWebpackConfig({ pages: ['foo.js'], plugins: [], devServer: false })
  })
})
