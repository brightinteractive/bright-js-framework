const gulp = require('gulp')
const del = require('del')
const shell = require('gulp-shell')
const ts = require('gulp-typescript')
const typedoc = require('gulp-typedoc')
const mocha = require('gulp-mocha')
const tslint = require('gulp-tslint')
const distFiles = require('./package.json').files

const SOURCE_FILES = ["./src/**/*.ts", "./src/**/*.tsx"]
const TEST_FILES = ["./src/**/*.test.ts", "./src/**/*.test.tsx"]
const PUBLIC_SOURCE_FILES = ["./src/api/**/*.ts", "./src/api/**/*.tsx"]
const PRIVATE_INTERFACE_FILES = ["./src/lib/**/*.d.ts"]


/** Test / Lint */

gulp.task('lint', function () {
  return gulp.src(SOURCE_FILES)
    .pipe(tslint())
})

gulp.task('test', function () {
  return gulp.src(TEST_FILES)
    .pipe(mocha())
})

gulp.task('typecheck', function () {
  return gulp.src(TEST_FILES)
    .pipe(ts())
})


/** Coverage */

gulp.task('coverage:clean', function () {
  return del('./coverage/**/*')
})

gulp.task('coverage:run', shell.task([
  'node_modules/.bin/nyc --reporter html --reporter lcov --extension .ts --extension.tsx --include src/lib --exclude src/**/*.test.ts --exclude src/**/*.test.tsx --all node_modules/.bin/mocha'
]))

gulp.task('coverage', gulp.series('coverage:clean', 'coverage:run'))


/**
 * Site generator
 */

gulp.task('site:clean', function () {
  return del(['./site'])
})

gulp.task('site:typedoc', function () {
  return gulp.src(PUBLIC_SOURCE_FILES)
    .pipe(typedoc({
      json: 'site/docs.json',
      module: 'commonjs'
    }))
})

gulp.task('site:typedoc:watch', function () {
  return gulp.watch(PUBLIC_SOURCE_FILES, gulp.parallel(['site:typedoc']))
})

gulp.task('site:build', shell.task(['npm run build'], { cwd: './site' }))

gulp.task('site:build:watch', shell.task(['npm run develop'], { cwd: './site' }))

gulp.task('site:bootstrap', shell.task(['npm install'], { cwd: './site' }))

gulp.task('site', gulp.series(['site:clean', 'site:typedoc', 'site:build']))

gulp.task('site:watch', gulp.series(
  'site:typedoc',
  gulp.parallel('site:typedoc:watch', 'site:build:watch'),
))


/** Build */

gulp.task('build:clean', function () {
  return del([...distFiles, './.build'])
});

gulp.task('build:transpile', function () {
  return gulp.src(SOURCE_FILES)
    .pipe(ts())
    .pipe(gulp.dest('.'))
})

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


/** CI entry */

gulp.task('default', gulp.parallel(
  'lint',
  'coverage',
  'typecheck'
))

gulp.task('watch', function () {
  return gulp.watch(SOURCE_FILES, gulp.parallel(['default']))
})
