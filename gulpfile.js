const gulp = require('gulp')
const del = require('del')
const shell = require('gulp-shell')
const typedoc = require('gulp-typedoc')
const mocha = require('gulp-mocha')
const tslint = require('gulp-tslint')
const format = require('gulp-typescript-formatter')
const pages = require('gh-pages')
const coveralls = require('gulp-coveralls')

const distFiles = require('./package.json').files

const SOURCE_FILES = ["./src/*.ts", "./src/*.tsx"]
const TEST_FILES = ["./src/**/*.test.ts", "./src/**/*.test.tsx"]
const PUBLIC_SOURCE_FILES = ["./src/*.ts", "./src/*.tsx", "./src/plugins/**/*.ts", "./src/plugins/**/*.tsx"]
const PRIVATE_INTERFACE_FILES = ["./src/lib/**/*.d.ts", "./src/cli/**/*.d.ts"]

/** Test / Lint */

gulp.task('lint', function () {
  return gulp.src(SOURCE_FILES)
    .pipe(tslint())
})

gulp.task('test', function () {
  return gulp.src(TEST_FILES)
    .pipe(mocha())
})

gulp.task('typecheck', shell.task([
  'node_modules/.bin/tsc --noemit',
]))

gulp.task('typecheck-examples', shell.task([
  '../node_modules/.bin/tsc --noemit',
], { cwd: 'examples' }))


/** Autofixing & formatting */

gulp.task('format', function () {
  return gulp.src(SOURCE_FILES)
    .pipe(format({
        baseDir: '.',
        tslint: true,
        editorconfig: true
    }))
    .pipe(gulp.dest('src'))
})

gulp.task('lint:fix', function () {
  return gulp.src(SOURCE_FILES)
    .pipe(tslint({ fix: true }))
})

gulp.task('fix', gulp.series('format', 'lint:fix'))


/** Coverage */

gulp.task('coverage:clean', function () {
  return del('./coverage/**/*')
})

gulp.task('coverage:run', shell.task([
  'node_modules/.bin/nyc --reporter html --reporter lcov --extension .ts --extension .tsx --include src/lib --exclude src/**/*.test.ts --exclude src/**/*.test.tsx --all node_modules/.bin/mocha'
]))

gulp.task('coverage', gulp.series('coverage:clean', 'coverage:run'))

gulp.task('coverage:submit', function () {
  return gulp.src('./coverage/lcov.info').pipe(coveralls())
})


/** Build */

gulp.task('build:clean', function () {
  return del([...distFiles, './.build'])
});

gulp.task('build:transpile', shell.task(['node_modules/.bin/tsc --outDir .']))

gulp.task('build:delete-private-interfaces', function () {
  return del(PRIVATE_INTERFACE_FILES);
})

gulp.task('rebuild', gulp.series([
  'build:transpile',
  'build:delete-private-interfaces'
]))

gulp.task('watch:rebuild', function () {
  return gulp.watch(SOURCE_FILES, gulp.parallel(['rebuild']))
})

gulp.task('build', gulp.series(
  'build:clean',
  'build:transpile',
  'build:delete-private-interfaces'
))

/**
 * Site generator
 */

gulp.task('site:typedoc', function () {
  return gulp.src(PUBLIC_SOURCE_FILES)
    .pipe(typedoc({
      json: 'docs-site/docs.json',
      module: 'commonjs',
      tsconfig: 'tsconfig.json',
      ignoreCompilerErrors: true
    }))
})

gulp.task('site:build', shell.task(['npm run build'], { cwd: './docs-site' }))

gulp.task('site:build:watch', shell.task(['npm run develop'], { cwd: './docs-site' }))

gulp.task('site', gulp.series(['site:typedoc', 'site:build']))

gulp.task('site:ci', gulp.series('site', function (done) {
  pages.clean()
  pages.publish('./docs-site/public', undefined, done)
}))

gulp.task('site:watch', gulp.series(
  'site:typedoc',
  gulp.parallel('site:build:watch'),
))

/** Bootstrapping */

gulp.task('bootstrap:site', shell.task(['npm install'], { cwd: './docs-site' }))

gulp.task('bootstrap:examples', gulp.series(
  'build',
  shell.task(['npm install'], { cwd: './examples' })
))

gulp.task('bootstrap', gulp.parallel(
  'bootstrap:site',
  'bootstrap:examples'
))

/** CI entry */

gulp.task('default', gulp.series([
  'bootstrap',
  'fix',
  gulp.parallel(
    'lint',
    'coverage',
    'typecheck',
    'typecheck-examples'
  )
]))

gulp.task('ci', gulp.series(
  'bootstrap',
  gulp.parallel(
    'lint',
    'coverage',
    'typecheck',
    'site',
    'typecheck-examples'
  ),
  'coverage:submit'
))

gulp.task('watch', function () {
  return gulp.watch(SOURCE_FILES, gulp.parallel(['default']))
})
