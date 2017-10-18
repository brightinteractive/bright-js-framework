const gulp = require('gulp')
const del = require('del')
const shell = require('gulp-shell')
const ts = require('gulp-typescript')
const mocha = require('gulp-mocha')
const tslint = require('gulp-tslint')
const format = require('gulp-typescript-formatter')
const distFiles = require('./package.json').files

const PRIVATE_INTERFACE_FILES = ["./src/lib/**/*.d.ts"]
const SOURCE_FILES = ["./src/**/*.ts", "./src/**/*.tsx"]
const TEST_FILES = ["./src/**/*.test.ts", "./src/**/*.test.tsx"]


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


/** Autofixing & formatting */

gulp.task('format', function () {
  return gulp.src('src/**/*.ts')
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
  'node_modules/.bin/nyc --reporter html --reporter lcov --extension .ts --extension.tsx --include src/lib --exclude src/**/*.test.ts --exclude src/**/*.test.tsx --all node_modules/.bin/mocha'
]))

gulp.task('coverage', gulp.series('coverage:clean', 'coverage:run'))


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

gulp.task('watch', function () {
  return gulp.watch(SOURCE_FILES, )
})

gulp.task('rebuild', gulp.series([
  'build:transpile',
  'build:delete-private-interfaces'
]))

gulp.task('watch:rebuild', function () {
  return gulp.watch(SOURCE_FILES, ['rebuild'])
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
  return gulp.watch(SOURCE_FILES, ['default'])
})
