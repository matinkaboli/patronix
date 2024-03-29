/* eslint-disable */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const lint = require('gulp-eslint');

gulp.task('clean', () =>
  del([
    'build/**',
    '!build',
    '!build/static',
    '!build/static/uploads',
    '!build/static/uploads/**'
  ])
);

gulp.task('copy', ['clean'], () =>
  [
    gulp.src([
      'src/server/index.html'
    ])
    .pipe(gulp.dest('build')),
    gulp.src([
      'src/server/sslcert/*'
    ])
    .pipe(gulp.dest('build/sslcert')),
    gulp.src([
      'src/static/**/*'
    ])
    .pipe(gulp.dest('build/static'))
  ]
);

gulp.task('dev:client', () =>
  gulp.src('src/client/client.js')
  .pipe(webpack(require('./webpack/client/dev.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('dev:customer', () =>
  gulp.src('src/customer/customer.js')
  .pipe(webpack(require('./webpack/customer/dev.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('dev:server', () =>
  gulp.src('src/server/app.js')
  .pipe(webpack(require('./webpack/server/dev.js')))
  .pipe(gulp.dest('build/'))
);

gulp.task('prod:client', () =>
  gulp.src('src/client/client.js')
  .pipe(webpack(require('./webpack/client/prod.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('prod:customer', () =>
  gulp.src('src/customer/customer.js')
  .pipe(webpack(require('./webpack/customer/prod.js')))
  .pipe(gulp.dest('build/static/js'))
);

gulp.task('prod:server', () =>
  gulp.src('src/server/app.js')
  .pipe(webpack(require('./webpack/server/prod.js')))
  .pipe(gulp.dest('build/'))
);

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
  .pipe(lint.format())
  .pipe(lint.failAfterError())
);

gulp.task('dev', ['clean', 'copy', 'dev:client', 'dev:customer', 'dev:server']);
gulp.task('prod', ['clean', 'copy', 'prod:client', 'prod:customer', 'prod:server']);
