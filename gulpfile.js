/* eslint-disable */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var rm = require('gulp-rimraf');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifier = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var config = require('./src/config.json');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');

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
    .pipe(gulp.dest('build/public/js/lib'))
  ];
});

gulp.task('babel', ['clean'], function() {
  return gulp.src(['src/**/*.js', '!src/public/js/lib/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('build'));
});

gulp.task('js:prod', ['clean'], function() {
  return gulp.src(['src/public/js/**/*.js', '!src/public/js/lib/**/*'])
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('build/public/js'))
});

gulp.task('js:dev', ['clean'], function() {
  return gulp.src(['src/public/js/**/*.js', '!src/public/js/lib/**/*'])
        .pipe(babel())
        .pipe(gulp.dest('build/public/js'))
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

gulp.task('nunjucks:prod', ['clean'], function() {
  gulp.src('src/views/**/*.njk')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('build/views'));
});

gulp.task('nunjucks:dev', ['clean'], function() {
  gulp.src('src/views/**/*.njk')
      .pipe(gulp.dest('build/views'));
});

gulp.task('prod', ['clean', 'lint', 'babel', 'less', 'nunjucks:prod', 'js:prod'], function() {
  return gulp.start('copy');
});

gulp.task('dev', ['clean', 'babel', 'less', 'nunjucks:dev', 'js:dev'], function() {
  return gulp.start('copy');
});

gulp.task('watch', function() {
  gulp.watch('src/**/*', ['dev']);
});
