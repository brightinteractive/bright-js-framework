import { expect } from 'chai'
import { getProjectPluginConfigs } from './getProjectPluginConfigs'

describe('getProjectPluginConfigs()', () => {
  it('create plugin config object with empty configuration for base path', () => {
    const configs = [
      '/a/b/c.def',
      '/a/b/c.defgh',
      '/a/b/c',
      '/a/b/d.def',
    ]

    expect(getProjectPluginConfigs(configs)).to.eql({
      '/a/b/c': {},
      '/a/b/d': {},
    })
  })
})
