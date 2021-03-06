import * as path from 'path'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as status from '../status'
import { execSync } from 'child_process'
import { Config } from '../../lib/server/Config'

export const command = 'init'

export async function handler() {
  await status.stage('Initializing project', () => {
    writeConfigs()
    writePlaceholderPages()
  })

  await status.stage('Installing dependencies', () => {
    installDependencies()
  })

  status.note('Use', 'bright-js-framework run'.blue, 'to start a development server')
}

function installDependencies() {
  install([
    '@brightinteractive/bright-js-framework',
    'typescript',
    'react',
    '@types/react'
  ])
}

function writeConfigs() {
  fs.writeFileSync('.env', '')
  fs.appendFileSync('.gitignore', '.env\nbuild\nnode_modules', { encoding: 'utf8' })

  writeJson(['package.json'], {
    name: path.basename(process.cwd()),
    private: true,
    version: '1.0.0',
    description: '',
    scripts: {
      start: 'bright-js-framework run',
      typecheck: 'tsc --noemit'
    },
    author: '',
    dependencies: {
    }
  })

  writeJson(['tsconfig.json'], {
    compilerOptions: {
      jsx: 'react',
      noImplicitAny: true,
      noEmitOnError: true,
      noImplicitThis: true,
      noUnusedLocals: true,
      strict: true,
      allowUnreachableCode: false,
      target: 'es5',
      inlineSourceMap: true,
      inlineSources: true,
      moduleResolution: 'node',
      module: 'commonjs',
      experimentalDecorators: true,
      lib: [
        'es2017',
        'esnext.asynciterable'
      ],
      typeRoots: [
        'typings'
      ],
      types: [
      ]
    },
    exclude: [
      'node_modules'
    ]
  })

  writeJson<Pick<Config, 'frontendEnvironment' | 'plugins'>>(['luminant.json'], {
    frontendEnvironment: [],
    plugins: {}
  })
}

function install(dependencies: string[]) {
  execSync(`npm install ${dependencies.join(' ')} --save`, {
    stdio: []
  })
}

function writePlaceholderPages() {
  mkdirp.sync(path.join('src', 'pages'))

  writeSource(['src', 'pages', '404.tsx'], `
import * as React from 'react'
import { RouteProps, route } from '@brightinteractive/bright-js-framework'

@route('*')
export class Error404 extends React.PureComponent<RouteProps<any, any>> {
  render() {
    return (
      <h1>NOT FOUND</h1>
    )
  }
}
  `)
  writeSource(['src', 'pages', 'IndexPage.tsx'], `
import * as React from 'react'
import { RouteProps, route } from '@brightinteractive/bright-js-framework'

@route('/')
export class IndexPage extends React.PureComponent<RouteProps<any, any>> {
  render() {
    return (
      <h1>Hello, world!</h1>
    )
  }
}
  `)
}

function writeSource(dest: string[], text: string) {
  fs.writeFileSync(path.join(...dest), text.trim() + '\n')
}

function writeJson<T>(dest: string[], json: T) {
  fs.writeFileSync(path.join(...dest), JSON.stringify(json, null, 2), 'utf8')
}
