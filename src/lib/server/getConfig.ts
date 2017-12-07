import * as fs from 'fs'
import * as path from 'path'
import * as Ajv from 'ajv'
import { mapValues, memoize } from 'lodash'
import { Config } from './Config'
import { isArray, isObject } from 'util'

export const configSchema = {
  type: 'object',
  properties: {
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
    },
    projectPlugins: {
      type: 'string',
      default: 'src/plugins/**/*.ts?(x)'
    }
  }
}

const ajv = new Ajv({ useDefaults: true })

export const getConfig: () => Config = memoize(() => {
  const config = loadConfig()
  return compileConfig(substituteEnvironment(config))
})

export function substituteEnvironment(config: any, env = process.env): any {
  if (typeof config === 'string' && config.startsWith('$')) {
    return env[config.substr(1)]
  }

  if (isArray(config)) {
    return config.map((x) => substituteEnvironment(x, env))
  }

  if (isObject(config)) {
    return mapValues(config, (x) => substituteEnvironment(x, env))
  }

  return config
}

export function compileConfig(c: {}): Config {
  const validate = ajv.compile(configSchema)

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
