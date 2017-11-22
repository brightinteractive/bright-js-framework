import * as path from 'path'
import * as yargs from 'yargs'

export function runLocalCli() {
  yargs
    .commandDir(path.resolve(__dirname, 'local-commands'))
    .help()
    .argv
}

export function runGlobalCli() {
  yargs
    .commandDir(path.resolve(__dirname, 'global-commands'))
    .commandDir(path.resolve(__dirname, 'local-commands'))
    .help()
    .argv
}
