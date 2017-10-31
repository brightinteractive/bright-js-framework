#!/usr/bin/env node

import * as path from 'path'
import * as fs from 'fs'
import * as yargs from 'yargs'
import { runCommand } from './run.command'
import { initCommand } from './init.command'

if (localCliIsRunning()) {
  localCli()

} else if (localCliExists()) {
  runLocalCli()

} else {
  globalCli()
}

function localCliExists() {
  try {
    fs.statSync(localCliPath)
    return true

  } catch {
    return false
  }
}

function localCliIsRunning() {
  return path.normalize(localCliPath) === path.normalize(__filename)
}

function runLocalCli() {
  require(localCliPath)
}

function localCli() {
  yargs
  .command(runCommand)
  .argv
}

function globalCli() {
  yargs
  .command(initCommand)
  .argv
}

const localCliPath = path.resolve(path.join('node_modules', '@brightinteractive', 'bright-js-framework', 'cli', 'cli.js'))
