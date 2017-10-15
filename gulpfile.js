/* eslint-disable */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rm = require('gulp-rimraf');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifier = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');
var babelify = require('babelify');
var config = require('./src/config.json');

gulp.task('clean', function() {
  return gulp.src('build', { read: false })
        .pipe(rm());
});

gulp.task('copy', function() {
  return [
    gulp.src(['src/config.json'])
    .pipe(gulp.dest('build')),

    gulp.src(['src/public/**/*', '!src/public/js/**/*', '!src/public/css/**/*'])
    .pipe(gulp.dest('build/public/')),

    gulp.src(['src/public/js/lib/**'])
    .pipe(gulp.dest('build/public/js/lib')),

    gulp.src('src/views/**/*')
    .pipe(gulp.dest('build/views'))
  ];
});

gulp.task('babel', ['clean'], function() {
  return gulp.src(['src/**/*.js', '!src/public/**/*.js'])
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('dev:browserify', ['clean'], function() {
  return gulp.src(['src/public/js/**/index.js', 'src/public/js/*.js'])
        .pipe(browserify({
          transform: babelify
        }))
        .pipe(gulp.dest('build/public/js'));
});

gulp.task('prod:browserify', ['clean'], function() {
  return gulp.src(['src/public/js/**/index.js', 'src/public/js/*.js'])
        .pipe(browserify({
          transform: babelify
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/public/js'));
});

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('less', ['clean'], function() {
  return gulp.src('src/public/css/*.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifier())
        .pipe(gulp.dest('build/public/css'));
});


gulp.task('prod', ['clean', 'lint', 'babel', 'less', 'prod:browserify'], function() {
  return gulp.start('copy');
});

gulp.task('dev', ['clean', 'babel', 'less', 'dev:browserify'], function() {
  return gulp.start('copy');
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['dev']);
});
