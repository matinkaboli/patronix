/* eslint-disable */

const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const babel = require('gulp-babel');
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
  gulp.src([
    'src/index.html'
  ])
  .pipe(gulp.dest('build/'))
);

gulp.task('babel', ['clean'], () =>
  gulp.src(['src/**/*.js', '!src/customer/**/*.js', '!src/client/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('build'))
);

gulp.task('dev:webpack', ['clean'], () =>
[
  gulp.src('src/client/client.js')
  .pipe(webpack(require('./webpack/client/dev.js')))
  .pipe(gulp.dest('build/static/js')),
  gulp.src('src/customer/customer.js')
  .pipe(webpack(require('./webpack/customer/dev.js')))
  .pipe(gulp.dest('build/static/js')),
]
);

gulp.task('prod:webpack', ['clean'], () =>
  [
    gulp.src('src/client/client.js')
    .pipe(webpack(require('./webpack/client/prod.js')))
    .pipe(gulp.dest('build/static/js')),
    gulp.src('src/customer/customer.js')
    .pipe(webpack(require('./webpack/customer/prod.js')))
    .pipe(gulp.dest('build/static/js')),
  ]
);

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
);

gulp.task('dev', ['clean', 'copy', 'babel', 'dev:webpack']);
gulp.task('prod', ['clean', 'copy', 'babel', 'prod:webpack']);

gulp.task('watch', () =>
  gulp.watch('src/**/*', ['dev'])
);
