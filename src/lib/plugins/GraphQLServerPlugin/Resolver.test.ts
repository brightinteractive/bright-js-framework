import { expect } from 'chai'
import { GraphQLType, decorateGraphQLType, isGraphQLType, getGraphQLTypename, decorateResolver, getResolvers } from './Resolver'

describe('Resolver', () => {
  @decorateGraphQLType('foo')
  class TypeResolver extends GraphQLType {
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
      expect(isGraphQLType(TypeResolver)).to.be.true
    })

    it('should return false if not decorated as type', () => {
      expect(isGraphQLType({})).to.be.false
    })

    it('should return resolver type', () => {
      expect(getGraphQLTypename(TypeResolver)).to.eql('foo')
    })
  })

  describe('getResolverProperties', () => {
    it('should return set of decorated properties', () => {
      expect(getResolvers(TypeResolver)).to.have.all.keys(['prop1', 'prop2'])
      expect(getResolvers(TypeResolver)).to.not.have.keys('notProp')
    })
  })
})
