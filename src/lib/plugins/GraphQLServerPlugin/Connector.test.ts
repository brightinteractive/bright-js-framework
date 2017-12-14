import { expect } from 'chai'
import { ApplicationContext } from '../../core/ApplicationContext'
import {ResourceBatchFetcher, Connector, KeyValuePairs} from './Connector'

describe('Connector', () => {
  describe('String key', () => {
    describe('getOne', () => {
      it('should return value', async () => {
        const result = await testConnector({a: 1}).getOne('a')
        expect(result).to.eql(1)
      })

      it('should return undefined when not found', async () => {
        const result = await testConnector({a: 1}).getOne('b')
        expect(result).to.be.undefined
      })
    })

    describe('getKey', () => {
      it('should return value', async () => {
        const result = await testConnector({a: {field: 1}}).getProperty('a', 'field')
        expect(result).to.eql(1)
      })

      it('should return undefined when not found', async () => {
        const result = await testConnector({a: {field: 1}}).getProperty('b', 'field')
        expect(result).to.be.undefined
      })
    })

    describe('getMany', () => {
      it('should return value', async () => {
        const result = await testConnector({a: 1}).getMany(['a'])
        expect(result).to.eql([1])
      })

      it('should return undefined when not found', async () => {
        const result = await testConnector({a: 1}).getMany(['b'])
        expect(result).to.eql([undefined])
      })

      it('should preserve result ordering', async () => {
        const result = await testConnector({a: 1, b: 2, c: 3}).getMany(['b', 'a', 'c'])
        expect(result).to.eql([2, 1, 3])
      })
    })
  })

  describe('Complex Key', () => {
    it('should preserve result ordering', async () => {
      const result = await testComplexIdConnector([
        [{someKey: 1111, otherKey: 1111}, 'first-result'],
          [{someKey: 2222, otherKey: 2222}, 'second-result'],
          [{someKey: 3333, otherKey: 3333}, 'third-result']
      ])
        .getMany([{otherKey: 3333, someKey: 3333}, {someKey: 1111, otherKey: 1111}, {someKey: 2222, otherKey: 2222}])
      expect(result).to.eql(['third-result', 'first-result', 'second-result'])
    })

  })
})

function testConnector(values: Record<string, any>) {
  class Fetcher extends ResourceBatchFetcher<string, any> {
    async getMany(ids: string[]) {
      return ids.map((id): [string, any] => [id, values[id]])
    }
  }

  class MyConnector extends Connector.forResource(Fetcher) { }

  return new MyConnector({ '@appContext': new ApplicationContext() })
}

function testComplexIdConnector<IdType, Value>(values: KeyValuePairs<IdType, Value>) {
  class Fetcher extends ResourceBatchFetcher<IdType, Value> {
    async getMany(ids: IdType[]) {
      return values
    }
  }

  class MyConnector extends Connector.forResource(Fetcher) { }

  return new MyConnector({ '@appContext': new ApplicationContext() })
}
