import * as React from 'react'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { DocumentNode } from 'graphql'
import { TestFixture } from '../../../entry/TestFixture'
import { decorateController } from '../../../core/Controller'
import { GraphQLQueryService, decorateGraphQLQuery } from './GraphQLQueryService'
import { graphQlTestPlugin, GraphQlMocks } from '../GraphQLTestPlugin'

const schema = `
  type Query {
    someString: String
    uppercaseString(sourceString: String): String
  }
`

describe('GraphQLQueryService', () => {
  async function setup(opts: { query: DocumentNode, mocks: GraphQlMocks, varables?: {} }) {
    @decorateController
    class Example extends React.PureComponent {
      @decorateGraphQLQuery(opts.query)
      query: GraphQLQueryService<{ someString: string }>

      render() {
        return <div>{JSON.stringify(this.query.data)}</div>
      }
    }

    const fixture = new TestFixture({
      markup: <Example {...opts.varables} />,
      plugins: [
        graphQlTestPlugin({
          schema,
          mocks: opts.mocks
        })
      ]
    })

    await fixture.load()
    return fixture
  }

  it('should perform initial query', async () => {
    const fixture = await setup({
      query: gql`
        query {
          someString
        }
      `,
      mocks: {
        Query() {
          return { someString: 'foo' }
        }
      }
    })

    expect(fixture.render()).to.have.text(JSON.stringify({ someString: 'foo' }))
  })

  it('should pass component props to query', async () => {
    const fixture = await setup({
      varables: {
        sourceString: 'foo'
      },
      query: gql`
        query($sourceString: String) {
          uppercaseString(sourceString: $sourceString)
        }
      `,
      mocks: {
        Query() {
          return {
            uppercaseString(_, { sourceString }) {
              return sourceString.toUpperCase()
            }
          }
        }
      }
    })

    expect(fixture.render()).to.have.text(JSON.stringify({ uppercaseString: 'FOO' }))
  })

  it('should rethrow query errors in render', async () => {
    const fixture = await setup({
      query: gql`
        query {
          someString
        }
      `,
      mocks: {
        Query() {
          return { someString: () => { throw Error('Oh no!') } }
        }
      }
    })

    expect(() => fixture.render()).to.throw('Oh no!')
  })
})
