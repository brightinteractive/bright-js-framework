import * as minimatch from 'minimatch'
import { expect } from 'chai'
import { uniq } from 'lodash'
import { LoadSchemaOpts, findGraphQLSources } from './loadSchema'

describe('findGraphQLSources', () => {
  it('should create resolvers for all the modules with a schema', () => {
    const fixture = createFixture([
      '/app/src/graphql/schema/User/UserResolver.ts',
      '/app/src/graphql/schema/Organisation/OrganisationResolver.ts',
      '/app/src/graphql/schema/User/User.graphql',
    ])

    expect(findGraphQLSources(fixture)).to.eql({
      connectors: [],
      schemas: [
        {
          typeDefs: '/app/src/graphql/schema/User/User.graphql',
          resolvers: ['/app/src/graphql/schema/User/UserResolver.ts']
        }
      ]
    })
  })

  it('should find connectors', () => {
    const fixture = createFixture([
      '/app/src/graphql/connectors/UserConnector.ts',
    ])

    expect(findGraphQLSources(fixture)).to.eql({
      connectors: ['/app/src/graphql/connectors/UserConnector.ts'],
      schemas: []
    })
  })
})

function createFixture(sourceFiles: string[]): LoadSchemaOpts {
  const resolve = (path: string) => {
    if (path.startsWith('/')) {
      return path
    }

    return '/app/' + path.replace(/^\.\//, '')
  }

  return {
    resolvePath: (pathname) => {
      const resolvedPath = resolve(pathname)
      if (!resolvedPath) {
        throw new Error(`Cannot resolve path ${pathname}`)
      }

      return resolvedPath
    },
    glob: (pattern) => {
      const relativePatternMatches = sourceFiles.filter(minimatch.filter(pattern))
      const absolutePatternMatches = sourceFiles.filter(minimatch.filter(resolve(pattern)))

      return uniq([
        ...relativePatternMatches,
        ...absolutePatternMatches
      ])
    }
  }
}
