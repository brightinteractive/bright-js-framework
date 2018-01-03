import { GraphQLObjectType, execute } from 'graphql'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { GraphQLServer } from './GraphQLServer'
import { SchemaType, decorateSchemaType, decorateResolver } from './Resolver'
import { Connector, ResourceBatchFetcher } from './Connector'
import { ApplicationContext } from '../../core/ApplicationContext'
import { HttpClient } from './HttpClient'

const rootTypes = ['Query', 'Mutation']

describe('GraphQLServer', () => {
  it('should not throw when not given any modules or typedefs', () => {
    const server = new GraphQLServer({
      connectors: [],
      schema: []
    })

    expect(server.schema).to.be.undefined
  })

  it('should load connectors', () => {
    class Identity extends Connector { }
    class Basic extends Connector.forResource(class extends ResourceBatchFetcher<string, string> { }) { }

    const server = new GraphQLServer({
      connectors: [Basic, Identity],
      schema: []
    })

    expect(server.connectors).to.have.same.members([
      Identity,
      Basic,
    ])
  })

  it('should add id resolver to types', async () => {
    const server = new GraphQLServer({
      connectors: [],
      schema: [
        {
          typeDefs: UserSchema,
          resolvers: [
            UserQuery,
            UserResolver,
          ]
        }
      ]
    })

    const result = await execute({
      schema: server.schema!,
      document: gql`
        query {
          getUser(id: "1") { id }
        }
      `
    })

    expect(result.data!.getUser.id).to.eql('1')
  })

  rootTypes.forEach((typeName) => {
    context(`root type (${typeName})`, () => {
      it('should not add id resolver', () => {
        @decorateSchemaType(typeName)
        class TestType extends SchemaType { }

        const server = new GraphQLServer({
          connectors: [],
          schema: [
            {
              typeDefs: `
                type Query {
                  x: String!
                }
                type Mutation {
                  x: String!
                }
              `,
              resolvers: [
                TestType,
              ]
            }
          ]
        })

        const userType = server.schema!.getTypeMap()[typeName] as GraphQLObjectType
        expect(userType.getFields()).to.not.contain.keys('id')
      })
    })
  })

  it('should merge schemas together', async () => {
    const server = new GraphQLServer({
      connectors: [],
      schema: [
        {
          typeDefs: UserSchema,
          resolvers: [
            UserQuery,
            UserResolver,
          ]
        },
        {
          typeDefs: OrganisationSchema,
          resolvers: [
            OrganisationQuery,
            OrganisationResolver,
          ]
        }
      ]
    })

    const result = await execute({
      schema: server.schema!,
      document: gql`
        query {
          getUser(id: "1") { id }
          getOrganisation(id: "2") { id }
        }
      `
    })

    expect(result.data!.getUser.id).to.eql('1')
    expect(result.data!.getOrganisation.id).to.eql('2')
  })

  it('should choose an aribitrary resolver on conflict between resolvers', async () => {
    @decorateSchemaType('Query')
    class QueryResolver1 extends SchemaType {
      @decorateResolver
      something() {
        return 'b'
      }
    }

    @decorateSchemaType('Query')
    class QueryResolver2 extends SchemaType {
      @decorateResolver
      something() {
        return 'a'
      }
    }

    const server = new GraphQLServer({
      connectors: [],
      schema: [
        {
          typeDefs: `
            type Query {
              something: String!
            }
          `,
          resolvers: [
            QueryResolver1,
            QueryResolver2
          ]
        }
      ]
    })

    const result = await execute({
      schema: server.schema!,
      document: gql`
        query {
          something
        }
      `
    })

    expect(result.data!.something).to.be.oneOf(['a', 'b'])
  })

  describe('.requestConfig', () => {
    it('should add connectors to context', () => {
      class MyConnector extends Connector { }

      const server = new GraphQLServer({
        connectors: [MyConnector],
        schema: [
          {
            typeDefs: UserSchema,
            resolvers: [
              UserResolver
            ]
          }
        ]
      })

      const appContext = server.requestConfig!().context['@appContext'] as ApplicationContext
      expect(appContext.getInjectedObject(MyConnector)).to.be.instanceOf(MyConnector)
    })

    it('should add http client to context', () => {
      const server = new GraphQLServer({
        connectors: [],
        schema: [
          {
            typeDefs: UserSchema,
            resolvers: [
              UserResolver
            ]
          }
        ]
      })

      const appContext = server.requestConfig!().context['@appContext'] as ApplicationContext
      expect(appContext.getInjectedObject(HttpClient)).to.be.instanceOf(HttpClient)
    })

    it('should be undefined when no schemas defined', () => {
      const server = new GraphQLServer({
        connectors: [],
        schema: []
      })

      expect(server.requestConfig).to.be.undefined
    })
  })
})

@decorateSchemaType('User')
class UserResolver extends SchemaType {
  @decorateResolver
  name() {
    return this.id
  }
}

@decorateSchemaType('Query')
class UserQuery extends SchemaType {
  @decorateResolver
  getUser(props: { id: string }) {
    return props.id
  }
}

const UserSchema = `
  type Query {
    getUser(id: String!): User
  }

  type User {
    id: ID!
    name: String
  }
`

@decorateSchemaType('Organisation')
class OrganisationResolver extends SchemaType {
  @decorateResolver
  orgName() {
    return this.id
  }
}

@decorateSchemaType('Query')
class OrganisationQuery extends SchemaType {
  @decorateResolver
  getOrganisation(props: { id: string }) {
    return props.id
  }
}

const OrganisationSchema = `
  type Query {
    getOrganisation(id: String!): Organisation
  }

  type Organisation {
    id: ID!
    orgName: String
  }
`

const UserAndOrganisationSchema = `
  type Query {
    getUser(id: String!): User
    getOrganisation(id: String!): Organisation
  }

  type User {
    id: ID!
    name: String
  }

  type Organisation {
    id: ID!
    orgName: String
  }
`
