import { expect } from 'chai'
import { Service, makeService, isService } from './Service'

describe('Service', () => {
  describe('::isService()', () => {
    it('should return true for instances of Service subclass', () => {
      class MyService extends Service {}
      const myService = new MyService()

      expect(isService(myService)).to.be.true
    })

    it('should return true for objects marked as services', () => {
      const myService = {}
      makeService(myService)

      expect(isService(myService)).to.be.true
    })

    it('should return false for other objects', () => {
      const myService = {}

      expect(isService(myService)).to.be.false
    })
  })
})
