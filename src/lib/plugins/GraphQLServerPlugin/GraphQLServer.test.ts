import { GraphQLObjectType, execute } from 'graphql'
import gql from 'graphql-tag'
import { expect } from 'chai'
import { GraphQLServer } from './GraphQLServer'
import { Resolver, decorateTypeResolver, decorateResolverProperty } from './Resolver'
import { Connector, IdentityConfig } from './Connector'
import { ApplicationContext } from '../../core/ApplicationContext'
import { HttpClient } from './HttpClient'

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
    class Basic extends Connector.withIdentity(class extends IdentityConfig<string> { }) { }

    const server = new GraphQLServer({
      connectors: [Basic, Identity],
      schema: []
    })

    expect(server.connectors).to.have.same.members([
      Identity,
      Basic,
    ])
  })

  it('should merge schemas together', () => {
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

    expect(server.schema!.getTypeMap()).to.contain.keys('User', 'Query', 'Organisation')

    const queryType = server.schema!.getTypeMap().Query as GraphQLObjectType
    expect(queryType.getFields()).to.contain.keys('getUser', 'getOrganisation')
  })

  it('should return an choose an aribitrary resolver on conflict between resolvers', async () => {
    @decorateTypeResolver('Query')
    class QueryResolver1 extends Resolver {
      @decorateResolverProperty
      something() {
        return 'b'
      }
    }

    @decorateTypeResolver('Query')
    class QueryResolver2 extends Resolver {
      @decorateResolverProperty
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

@decorateTypeResolver('User')
class UserResolver extends Resolver {
  @decorateResolverProperty
  name() {
    return this.id
  }
}

@decorateTypeResolver('Query')
class UserQuery extends Resolver {
  @decorateResolverProperty
  getUser(id: string) {
    return id
  }
}

const UserSchema = `
  type Query {
    getUser(id: String!): User
  }

  type User {
    name: String
  }
`

@decorateTypeResolver('Organisation')
class OrganisationResolver extends Resolver {
  @decorateResolverProperty
  orgName() {
    return this.id
  }
}

@decorateTypeResolver('Query')
class OrganisationQuery extends Resolver {
  @decorateResolverProperty
  getOrganisation(id: string) {
    return id
  }
}

const OrganisationSchema = `
  type Query {
    getOrganisation(id: String!): Organisation
  }

  type Organisation {
    orgName: String
  }
`
