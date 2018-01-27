/* eslint-disable */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');

gulp.task('clean:server', () =>
  gulp.src([
    'build',
    '!build/'
  ])
);

gulp.task('webpack', () =>
  gulp.src('src')
  .pipe(webpack(require('./webpack.dev.config.js')))
  .pipe(gulp.dest('build/statics'))
);
