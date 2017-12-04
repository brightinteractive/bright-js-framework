import * as fs from 'fs'
import * as path from 'path'
import * as Ajv from 'ajv'
import { mapValues, memoize } from 'lodash'
import { Config } from './Config'
import { isArray, isObject } from 'util'

const schema = {
  definitions: {
    frontendEnvironment: {
      type: 'array',
      default: [],
      items: {
        type: 'string'
      }
    },
    plugins: {
      type: 'object',
      default: {}
    }
  },
}

const ajv = new Ajv({ useDefaults: true })

export const getConfig: () => Config = memoize(() => {
  const config = loadConfig()
  return validateConfig(substituteEnvironment(config))
})

export function substituteEnvironment(x: any): any {
  if (typeof x === 'string' && x.startsWith('$')) {
    return process.env[x]
  }

  if (isArray(x)) {
    return x.map(substituteEnvironment)
  }

  if (isObject(x)) {
    return mapValues(x, substituteEnvironment)
  }

  return x
}

function validateConfig(c: {}): Config {
  const validate = ajv.compile(schema)

  if (validate(c)) {
    return c as any
  }

  process.stderr.write('Invalid config file:\n')

  if (validate.errors) {
    validate.errors.forEach((err) => {
      process.stderr.write(err.message + '\n')
    })
  }

  return process.exit(1)
}

function loadConfig(): {} {
  try {
    return JSON.parse(fs.readFileSync(path.resolve('luminant.json'), 'utf8'))

  } catch {
    process.stderr.write('No config file provided. Using default config.\n')
    return {}
  }
}
