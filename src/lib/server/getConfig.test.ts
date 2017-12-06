import { expect } from 'chai'
import { substituteEnvironment, validateConfig, configSchema } from './getConfig'

describe('getConfig', () => {
  describe('substituteEnvironment()', () => {
    it('should substitute environmental variables', () => {
      const env = {
        foo: 'bar'
      }

      const config = {
        array: [
          { fooValue: '$foo' }
        ]
      }

      expect(substituteEnvironment(config, env)).to.eql({
        array: [
          { fooValue: 'bar' }
        ]
      })
    })
  })

  describe('validateConfig()', () => {
    it('should assign default values', () => {
      const config = {}

      expect(validateConfig(config)).to.eql({
        frontendEnvironment: configSchema.properties.frontendEnvironment.default,
        plugins: configSchema.properties.plugins.default,
        projectPlugins: configSchema.properties.projectPlugins.default
      })
    })
  })
})
