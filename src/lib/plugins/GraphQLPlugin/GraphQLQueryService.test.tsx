import * as React from 'react'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { DocumentNode } from 'graphql'
import { decorateController } from '../../core/Controller'
import { GraphQLQueryService, decorateGraphQLQuery, GraphQLQueryProps } from './GraphQLQueryService'
import { graphQlTestPlugin, GraphQlMocks } from '../GraphQLTestPlugin/GraphQLTestPlugin'
import { ControllerTestFixture } from '../../fixtures/ControllerTestFixture'

const schema = `
  type Query {
    someString: String
    uppercaseString(sourceString: String): String
  }
`

describe('GraphQLQueryService', () => {
  async function setup(opts: { query: DocumentNode, mocks: GraphQlMocks, props?: {}, decoratorOpts?: GraphQLQueryProps }) {
    @decorateController
    class Example extends React.PureComponent {
      @decorateGraphQLQuery(opts.query, opts.decoratorOpts)
      query: GraphQLQueryService<{ someString: string }>

      render() {
        return <div>{JSON.stringify(this.query.data)}</div>
      }
    }

    const fixture = await ControllerTestFixture.create({
      markup: <Example {...opts.props} />,
      plugins: [
        graphQlTestPlugin({
          schema,
          mocks: opts.mocks
        })
      ]
    })

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
      props: {
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

  it('should allow specifying props in decorator opts', async () => {
    const fixture = await setup({
      props: {
        sourceStringProp: 'foo'
      },
      decoratorOpts: {
        props: (parent) => ({ sourceString: parent.props.sourceStringProp })
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
