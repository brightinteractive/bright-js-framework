#!/usr/bin/env node

import * as yargs from 'yargs'
import { runCommand } from './run.command'

yargs
  .command(runCommand)
  .argv
