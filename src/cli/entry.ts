#!/usr/bin/env node

import * as path from 'path'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config()
const localCliPath = path.resolve(path.join('node_modules', '@brightinteractive', 'bright-js-framework', 'cli', 'cli.js'))

if (pathExists(localCliPath)) {
  // tslint:disable-next-line
  const { runLocalCli } = require(localCliPath)
  runLocalCli()

} else {
  // tslint:disable-next-line
  const { runGlobalCli } = require('./cli')
  runGlobalCli()
}

function pathExists(pathname: string) {
  try {
    fs.statSync(pathname)
    return true

  } catch {
    return false
  }
}
