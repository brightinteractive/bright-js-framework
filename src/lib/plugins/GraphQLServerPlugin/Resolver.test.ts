import { expect } from 'chai'
import { SchemaType, decorateSchemaType, isSchemaType, getSchemaTypename, decorateResolver, getResolvers } from './Resolver'

describe('Resolver', () => {
  @decorateSchemaType('foo')
  class TypeResolver extends SchemaType {
    @decorateResolver
    prop1() {

    }

    @decorateResolver
    prop2() {

    }

    notProp() {

    }
  }

  describe('isTypeResolver', () => {
    it('should return true if decorated as type', () => {
      expect(isSchemaType(TypeResolver)).to.be.true
    })

    it('should return false if not decorated as type', () => {
      expect(isSchemaType({})).to.be.false
    })

    it('should return resolver type', () => {
      expect(getSchemaTypename(TypeResolver)).to.eql('foo')
    })
  })

  describe('getResolverProperties', () => {
    it('should return set of decorated properties', () => {
      expect(getResolvers(TypeResolver)).to.have.all.keys(['prop1', 'prop2'])
      expect(getResolvers(TypeResolver)).to.not.have.keys('notProp')
    })
  })
})
