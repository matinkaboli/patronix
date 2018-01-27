/* eslint-disable */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const babel = require('gulp-babel');
const lint = require('gulp-eslint');

gulp.task('clean', () =>
  del('build')
);

gulp.task('babel', ['clean'], () =>
  gulp.src(['src/**/*.js', '!src/customer/**/*.js', '!src/client/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('build'))
);

gulp.task('dev:webpack', ['clean'], () =>
  gulp.src('src')
  .pipe(webpack(require('./webpack.dev.config.js')))
  .pipe(gulp.dest('build/statics'))
);

gulp.task('prod:webpack', ['clean'], () =>
  gulp.src('src')
  .pipe(webpack(require('./webpack.prod.config.js')))
  .pipe(gulp.dest('build/statics'))
);

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
);

gulp.task('dev', ['clean', 'babel', 'dev:webpack']);
gulp.task('prod', ['clean', 'babel', 'prod:webpack']);

gulp.task('watch', () =>
  gulp.watch('src/**/*', ['dev'])
);
