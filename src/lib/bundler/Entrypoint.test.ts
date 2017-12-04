import { expect } from 'chai'
import { getEntrypointExports, getEntrypointDefaultExports, isSubclassOf } from './Entrypoint'

describe('Entrypoint', () => {
  const is1 = (x: any): x is 1 => x === 1

  describe('getEntrypointExports()', () => {
    it('should require modules and filter by predicate', () => {
      const modules = [
        () => ({ a: 1, b: 0 }),
        () => ({ a: 1, b: 0 })
      ]

      expect(getEntrypointExports(modules, is1)).to.eql([
        1,
        1,
      ])
    })
  })

  describe('getEntrypointDefaultExports()', () => {
    it('should require modules and filter by predicate', () => {
      const modules = [
        () => ({ default: 1, b: 0 }),
        () => ({ default: 0, b: 0 }),
        () => ({ b: 0 }),
      ]

      expect(getEntrypointDefaultExports(modules, is1)).to.eql([
        1
      ])
    })
  })

  describe('isSubclassOf()', () => {
    class Base { }
    class Derived extends Base { }

    it('should return true for class', () => {
      expect(isSubclassOf(Base)(Base)).to.be.true
    })

    it('should return true for subclass of class', () => {
      expect(isSubclassOf(Base)(Derived)).to.be.true
    })

    it('should return false for unrelated class', () => {
      expect(isSubclassOf(Base)(class { })).to.be.false
    })
  })
})
