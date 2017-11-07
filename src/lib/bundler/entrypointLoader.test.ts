import { expect } from 'chai'
import { entrypointLoader } from './entrypointLoader'

describe('entrypointLoader', () => {
  it('should generate shim code to load top level modules using entrypoint', () => {
    const loaderString = entrypointLoader({
      entry: 'myEntrypoint',
      topLevelModules: ['module1', 'module2'],
      configFile: 'foo.config'
    })

    const [loader, resourcePath] = loaderString.split('!')
    const query = '?' + loader.split('?')[1]

    const result = require('./entrypointLoader').call({
      query,
      resourcePath,
      addDependency() { }
    })

    expect(result).to.eql([
      `var entry = require("myEntrypoint").default;`,
      `var opts = {config: function() { return require("foo.config").default; }};`,
      `var modules = [function() { return require("module1"); },function() { return require("module2"); }];`,
      `module.exports = entry(modules, opts);`,
    ].join('\n'))
  })
})
