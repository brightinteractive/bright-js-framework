import { expect } from 'chai'
import { Resolver, decorateTypeResolver, isTypeResolver, getResolverTypename, decorateResolverProperty, getResolverProperties } from './Resolver'

describe('Resolver', () => {
  @decorateTypeResolver('foo')
  class TypeResolver extends Resolver {
    @decorateResolverProperty
    prop1() {

    }

    @decorateResolverProperty
    prop2() {

    }

    notProp() {

    }
  }

  describe('isTypeResolver', () => {
    it('should return true if decorated as type', () => {
      expect(isTypeResolver(TypeResolver)).to.be.true
    })

    it('should return false if not decorated as type', () => {
      expect(isTypeResolver({})).to.be.false
    })

    it('should return resolver type', () => {
      expect(getResolverTypename(TypeResolver)).to.eql('foo')
    })
  })

  describe('getResolverProperties', () => {
    it('should return set of decorated properties', () => {
      expect(getResolverProperties(TypeResolver)).to.have.all.keys(['prop1', 'prop2'])
      expect(getResolverProperties(TypeResolver)).to.not.have.keys('notProp')
    })
  })
})
