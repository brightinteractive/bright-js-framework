import { expect } from 'chai'
import { fromPairs } from 'lodash'
import { ApplicationContext } from '../../core/ApplicationContext'
import { ResourceBatchFetcher, Connector } from './Connector'

describe('Connector', () => {
  describe('getOne', () => {
    it('should return value', async () => {
      const result = await testConnector({ a: 1 }).getOne('a')
      expect(result).to.eql(1)
    })

    it('should return undefined when not found', async () => {
      const result = await testConnector({ a: 1 }).getOne('b')
      expect(result).to.be.undefined
    })
  })

  describe('getKey', () => {
    it('should return value', async () => {
      const result = await testConnector({ a: { field: 1 } }).getProperty('a', 'field')
      expect(result).to.eql(1)
    })

    it('should return undefined when not found', async () => {
      const result = await testConnector({ a: { field: 1 } }).getProperty('b', 'field')
      expect(result).to.be.undefined
    })
  })

  describe('getMany', () => {
    it('should return value', async () => {
      const result = await testConnector({ a: 1 }).getMany(['a'])
      expect(result).to.eql([1])
    })

    it('should return undefined when not found', async () => {
      const result = await testConnector({ a: 1 }).getMany(['b'])
      expect(result).to.eql([undefined])
    })

    it('should preserve result ordering', async () => {
      const result = await testConnector({ a: 1, b: 2, c: 3 }).getMany(['b', 'a', 'c'])
      expect(result).to.eql([2, 1, 3])
    })
  })
})

function testConnector(values: Record<string, any>) {
  class Fetcher extends ResourceBatchFetcher<number> {
    async getMany(ids: string[]) {
      return fromPairs(ids.map((id) => [id, values[id]]))
    }
  }

  class MyConnector extends Connector.forResource(Fetcher) { }

  return new MyConnector({ '@appContext': new ApplicationContext() })
}