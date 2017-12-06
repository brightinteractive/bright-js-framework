require('ts-node').register({ fast: true, compilerOptions: { target: 'es2015' } })
require('source-map-support').install({ hookRequire: true })
require('jsdom-global/register')
require('raf').polyfill(global)

const enzyme = require('enzyme')
const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')
const sinonChai = require('sinon-chai')
const EnzymeAdapter = require('enzyme-adapter-react-16')
const chaiAsPromised = require("chai-as-promised")

enzyme.configure({
  adapter: new EnzymeAdapter()
})

console.error = () => {}
console.warn = () => {}

chai.use(chaiEnzyme())
chai.use(sinonChai)
chai.use(chaiAsPromised)
