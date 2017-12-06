import { expect } from 'chai'
import { LoaderContext } from 'loader-utils'
import { entrypointLoader } from './entrypointLoader'

describe('entrypointLoader', () => {
  it('should generate loader string for minimally speciified options', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: {},
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var modules = {};`,
      `var options = {};`,
      `module.exports = entry(modules, options);`,
    ].join('\n'))
  })

  it('should stringify custom options object', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: {},
      options: {
        foo: 1
      }
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var modules = {};`,
      `var options = {"foo":1};`,
      `module.exports = entry(modules, options);`,
    ].join('\n'))
  })

  it('should generate shim code to load single module', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: {
        foo: 'foo-module'
      },
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var modules = {"foo": function(){ return require("foo-module"); }};`,
      `var options = {};`,
      `module.exports = entry(modules, options);`,
    ].join('\n'))
  })

  it('should generate shim code to load module array', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: {
        foo: ['foo-module']
      },
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var modules = {"foo": [function(){ return require("foo-module"); }]};`,
      `var options = {};`,
      `module.exports = entry(modules, options);`,
    ].join('\n'))
  })

  it('should recurse into module maps', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: {
        foo: { bar: 'bar-module' }
      },
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var modules = {"foo": {"bar": function(){ return require("bar-module"); }}};`,
      `var options = {};`,
      `module.exports = entry(modules, options);`,
    ].join('\n'))
  })
})

function callLoader(context: Partial<LoaderContext>) {
  return require('./entrypointLoader').call({
    addDependency() { },
    ...context
  })
}

function parseLoaderString(loaderString: string) {
  const [loader, resourcePath] = loaderString.split('!')
  const query = '?' + loader.split('?')[1]

  return { query, loader, resourcePath }
}
