import * as path from 'path'

export interface LoadSchemaOpts {
  glob: (pattern: string) => string[],
  resolvePath: (pathname: string) => string
}

export interface LoadSchemaResults {
  connectors: string[],
  schemas: Array<{ typeDefs: string, resolvers: string[] }>
}

export function findGraphQLSources(opts: LoadSchemaOpts): LoadSchemaResults {
  const schemas = findSchemas(opts)

  return {
    connectors: findConnectors(opts),
    schemas: schemas.map((schema) => ({
      typeDefs: schema,
      resolvers: findResolversForSchema(opts, schema)
    }))
  }
}

function findSchemas({ glob, resolvePath }: LoadSchemaOpts) {
  return glob('src/graphql/schema/**/*.graphql').map(resolvePath)
}

function findResolversForSchema({ glob, resolvePath }: LoadSchemaOpts, schemaPath: string) {
  return glob(`${path.dirname(schemaPath)}/**/*.ts`).map(resolvePath)
}

function findConnectors({ glob, resolvePath }: LoadSchemaOpts) {
  return glob('src/graphql/connectors/**/*.ts').map(resolvePath)
}
