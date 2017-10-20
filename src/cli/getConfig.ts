import * as fs from 'fs'
import * as path from 'path'
import * as Ajv from 'ajv'
import { Config } from '../lib/server/Config'

const schema = {
  definitions: {
    frontendEnvironment: {
      type: 'array',
      default: [],
      items: {
        type: 'string'
      }
    }
  }
}

const ajv = new Ajv({ useDefaults: true })


export function getConfig(): Config {
  const config = loadConfig()
  return validateConfig(config)
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
    return JSON.parse(fs.readFileSync(path.resolve('.bright-js-framework'), 'utf8'))

  } catch {
    process.stderr.write('No config file provided. Using default config.\n')
    return {}
  }
}
