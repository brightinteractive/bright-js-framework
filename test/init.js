require('ts-node').register({ fast: true, compilerOptions: { target: 'es2015',  } })
require('source-map-support/register')
require('jsdom-global/register')
require('raf').polyfill(global)

const enzyme = require('enzyme')
const chai = require('chai')
const chaiEnzyme = require('chai-enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

enzyme.configure({
  adapter: new EnzymeAdapter()
})

chai.use(chaiEnzyme())
