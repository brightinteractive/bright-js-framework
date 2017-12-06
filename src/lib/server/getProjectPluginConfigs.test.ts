import { expect } from 'chai'
import getImplicitProjectPluginConfigurationsFromFilepaths from './getProjectPluginConfigs'

describe('getImplicitProjectPluginConfigurationsFromFilepaths()', () => {
  it('returns default plugin configs for a list of filepaths to plugin modules', () => {
    const configs = [
      '/a/b/MyPlugin.client.ts',
      '/a/b/MyPlugin.server.ts',
      '/a/b/MyPlugin.ts',
      '/a/b/MyOtherPlugin.ts',
    ]

    expect(getImplicitProjectPluginConfigurationsFromFilepaths(configs)).to.eql({
      '/a/b/MyPlugin': {},
      '/a/b/MyOtherPlugin': {},
    })
  })
})
