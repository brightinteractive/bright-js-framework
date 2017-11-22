import * as minimatch from 'minimatch'
import { GraphQLObjectType, execute } from 'graphql'
import gql from 'graphql-tag'
import { memoize } from 'lodash'
import { expect } from 'chai'
import { GraphQLServer } from './GraphQLServer'
import { Resolver, decorateTypeResolver, decorateResolverProperty } from './Resolver'
import { Connector, IdentityConfig } from './Connector'
import { ApplicationContext } from '../../../core/ApplicationContext'
import { HttpClient } from './HttpClient';

describe('GraphQLServer', () => {
  it('should create resolvers for all the modules with a schema', () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/schema/User/UserResolver.ts': UserResolverModule,
        '/app/src/graphql/schema/Organisation/OrganisationResolver.ts': OrganisationResolverModule,
      },
      schemas: {
        '/app/src/graphql/schema/User/User.graphql': UserSchema,
      }
    })

    expect(server.schema!.getTypeMap()).to.contain.keys('User', 'Query')
    expect(server.schema!.getTypeMap()).to.not.contain.keys('Organisation')
  })

  it('should ignore files with no exported resolvers', () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/schema/User/UserResolver.ts': UserResolverModule,
        '/app/src/graphql/schema/User/UserResolverUtils.ts': () => {
          return { a: {}, b: {} }
        },
      },
      schemas: {
        '/app/src/graphql/schema/User/User.graphql': UserSchema,
      }
    })

    expect(server.schema!.getTypeMap()).to.not.contain.keys('a', 'b')
  })

  it('should ignore schema modules with no exported resolvers', () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/schema/Organisation/OrganisationResolver.ts': OrganisationResolverModule,
      },
      schemas: {
        '/app/src/graphql/schema/User/User.graphql': UserSchema,
        '/app/src/graphql/schema/Organisation/Organisation.graphql': OrganisationSchema,
      }
    })

    expect(server.schema!.getTypeMap()).to.not.contain.keys('User')
  })

  it('should not throw when not given any modules or typedefs', () => {
    const server = testServer({
      modules: { },
      schemas: { }
    })

    expect(server.schema).to.be.undefined
  })

  it('should load connectors', () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/connectors/MyConnector.ts': ConnectorModule,
      },
      schemas: {}
    })

    expect(server.connectors).to.have.same.members([
      ConnectorModule().BasicConnector,
      ConnectorModule().IdentityConnector,
    ])
  })

  it('should merge schemas together', () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/schema/User/UserResolver.ts': UserResolverModule,
        '/app/src/graphql/schema/Organisation/OrganisationResolver.ts': OrganisationResolverModule,
      },
      schemas: {
        '/app/src/graphql/schema/User/User.graphql': UserSchema,
        '/app/src/graphql/schema/Organisation/Organisation.graphql': OrganisationSchema,
      }
    })

    expect(server.schema!.getTypeMap()).to.contain.keys('User', 'Query', 'Organisation')

    const queryType = server.schema!.getTypeMap().Query as GraphQLObjectType
    expect(queryType.getFields()).to.contain.keys('getUser', 'getOrganisation')
  })

  it('should return an choose an aribitrary resolver on conflict between resolvers', async () => {
    const server = testServer({
      modules: {
        '/app/src/graphql/schema/Test/test.ts': () => {
          @decorateTypeResolver('Query')
          class QueryResolver extends Resolver {
            @decorateResolverProperty
            something() {
              return 'a'
            }
          }

          return { QueryResolver }
        },
        '/app/src/graphql/schema/Test/test1.ts':  () => {
          @decorateTypeResolver('Query')
          class QueryResolver extends Resolver {
            @decorateResolverProperty
            something() {
              return 'b'
            }
          }

          return { QueryResolver }
        },
      },
      schemas: {
        '/app/src/graphql/schema/Test/test.graphql': `
          type Query {
            something: String!
          }
        `,
      }
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
      const server = testServer({
        modules: {
          '/app/src/graphql/schema/User/UserResolver.ts': UserResolverModule,
          '/app/src/graphql/connectors/MyConnector.ts': ConnectorModule,
        },
        schemas: {
          '/app/src/graphql/schema/User/User.graphql': UserSchema
        }
      })

      const appContext = server.requestConfig!().context['@appContext'] as ApplicationContext
      expect(appContext.getInjectedObject(ConnectorModule().BasicConnector)).to.be.instanceOf(ConnectorModule().BasicConnector)
    })

    it('should add http client to context', () => {
      const server = testServer({
        modules: {
          '/app/src/graphql/schema/User/UserResolver.ts': UserResolverModule,
          '/app/src/graphql/connectors/MyConnector.ts': ConnectorModule,
        },
        schemas: {
          '/app/src/graphql/schema/User/User.graphql': UserSchema
        }
      })

      const appContext = server.requestConfig!().context['@appContext'] as ApplicationContext
      expect(appContext.getInjectedObject(HttpClient)).to.be.instanceOf(HttpClient)
    })

    it('should be undefined when no schemas defined', () => {
      const server = testServer({
        modules: { },
        schemas: { }
      })

      expect(server.requestConfig).to.be.undefined
    })
  })
})

const UserResolverModule = memoize(() => {
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

  return { UserResolver, UserQuery }
})

const UserSchema = `
  type Query {
    getUser(id: String!): User
  }

  type User {
    name: String
  }
`

const OrganisationResolverModule = memoize(() => {
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

  return { OrganisationResolver, OrganisationQuery }
})

const ConnectorModule = memoize(() => {
  class BasicConnector extends Connector { }

  class FetchConfig extends IdentityConfig<number> {
    async getMany() {
      return { a: 1 }
    }
  }

  class IdentityConnector extends Connector.withIdentity(FetchConfig) { }

  return { BasicConnector, IdentityConnector }
})

const OrganisationSchema = `
  type Query {
    getOrganisation(id: String!): Organisation
  }

  type Organisation {
    orgName: String
  }
`

function testServer(opts: { modules: Record<string, () => any>, schemas: Record<string, string> } ) {
  const sourceFiles = [...Object.keys(opts.modules), ...Object.keys(opts.schemas)]

  const resolve = (path: string) => {
    if (path.startsWith('/')) {
      return path
    }

    return '/app/' + path.replace(/^\.\//, '')
  }

  return new GraphQLServer({
    resolvePath: (path) => {
      const resolvedPath = resolve(path)
      if (!opts.modules[resolvedPath]) {
        throw new Error(`Could not resolve ${path}. Not found: ${resolvedPath}`)
      }
      return resolvedPath
    },
    loadModule: (path) => {
      if (!opts.modules[path]) {
        throw new Error(`Not found: ${path}`)
      }
      return opts.modules[path]()
    },
    readFile: (path) => {
      const contents = opts.schemas[path] || opts.schemas[resolve(path)]
      if (!contents) {
        throw new Error(`Not found: ${path}`)
      }
      return contents
    },
    glob: (pattern) => {
      const relativePatternMatches = sourceFiles.filter(minimatch.filter(pattern))
      const absolutePatternMatches = sourceFiles.filter(minimatch.filter(resolve(pattern)))

      return [
        ...relativePatternMatches,
        ...absolutePatternMatches
      ]
    }
  })
}
