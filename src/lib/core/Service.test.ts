import { expect } from 'chai'
import * as React from 'react'
import { Service, isService, decorateServiceProperty } from './Service'
import { decorateController } from './Controller'

describe('Service', () => {
  describe('isService()', () => {
    it('should return true for instances of Service subclass', () => {
      class MyService extends Service {}
      const myService = new MyService()

      expect(isService(myService)).to.be.true
    })

    it('should return false for other objects', () => {
      const myService = {}

      expect(isService(myService)).to.be.false
    })
  })

  describe('decorateServiceProperty()', () => {
    it('should instantiate service when attached to controller', () => {
      @decorateController
      class Parent extends React.Component {
        @decorateServiceProperty(Service)
        service: Service
      }

      expect(new Parent().service).to.be.instanceOf(Service)
    })

    it('should instantiate service when attached to service', () => {
      class Parent extends Service {
        @decorateServiceProperty(Service)
        service: Service
      }

      expect(new Parent().service).to.be.instanceOf(Service)
    })

    it('should throw error when attached to non-controller class', () => {
      expect(() => {
        class Parent extends React.Component {
          @decorateServiceProperty(Service)
          service: Service
        }

        return new Parent().service
      }).to.throw()
    })
  })
})
