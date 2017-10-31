#!/usr/bin/env node

import * as path from 'path'
import * as fs from 'fs'
import * as yargs from 'yargs'

if (localCliIsRunning()) {
  localCli()

} else if (localCliExists()) {
  runLocalCli()

} else {
  globalCli()
}

function localCliExists() {
  try {
    fs.statSync(localCliPath())
    return true

  } catch {
    return false
  }
}

function localCliIsRunning() {
  return path.normalize(localCliPath()) === path.normalize(__filename)
}

function runLocalCli() {
  require(localCliPath())
}

function localCli() {
  yargs
  .commandDir(path.resolve(__dirname, 'local-commands'))
  .help()
  .argv
}

function globalCli() {
  yargs
  .commandDir(path.resolve(__dirname, 'global-commands'))
  .help()
  .argv
}

function localCliPath() {
  return path.resolve(path.join('node_modules', '@brightinteractive', 'bright-js-framework', 'cli', 'cli.js'))
}
