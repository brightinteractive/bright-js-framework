import { expect } from 'chai'
import { LoaderContext } from 'loader-utils'
import { entrypointLoader } from './entrypointLoader'

describe('entrypointLoader', () => {
  it('should handle empty modules array', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: [],
      configFile: 'foo.config'
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var opts = {config: function() { return require("foo.config").default; }};`,
      `var modules = [];`,
      `module.exports = entry(modules, opts);`,
    ].join('\n'))
  })

  it('should generate shim code to load top level modules using entrypoint', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: ['module1', 'module2'],
      configFile: 'foo.config'
    })

    const { query, resourcePath } = parseLoaderString(loaderString)

    expect(callLoader({ query, resourcePath })).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var opts = {config: function() { return require("foo.config").default; }};`,
      `var modules = [function() { return require("module1"); },function() { return require("module2"); }];`,
      `module.exports = entry(modules, opts);`,
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
