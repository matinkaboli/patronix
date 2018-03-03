/* eslint-disable */

const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack');
const gutil = require('gulp-util');
const lint = require('gulp-eslint');

const wp = (taskName, done) => (err, stats) => {
  if (err) {
    throw new gutil.PluginError(taskName, err);
  }

  gutil.log(`[${taskName}] Completed\n` + stats.toString({
    colors: true,
    chunks: false,
    modules: false
  }));

  done();
}

gulp.task('clean', () =>
  del([
    'dist/**',
    '!dist',
    '!dist/statics',
    '!dist/statics/uploads',
    '!dist/statics/uploads/**'
  ])
);

gulp.task('copy', ['clean'], () =>
  gulp.src([
    'src/index.html'
  ])
  .pipe(gulp.dest('dist/'))
);

gulp.task('dev:client', ['clean'], done => {
  webpack(require('./webpack/client/dev.js'), wp('dev:client', done));
});

gulp.task('dev:customer', ['clean'], done => {
  webpack(require('./webpack/customer/dev.js'), wp('dev:customer', done));
});

gulp.task('dev:server', ['clean'], done => {
  webpack(require('./webpack/server/dev.js'), wp('dev:server', done));
});

gulp.task('prod:client', ['clean'], done => {
  webpack(require('./webpack/client/prod.js'), wp('prod:client', done));
});

gulp.task('prod:customer', ['clean'], done => {
  webpack(require('./webpack/customer/prod.js'), wp('prod:customer', done));
});

gulp.task('prod:server', ['clean'], done => {
  webpack(require('./webpack/server/prod.js'), wp('prod:server', done));
});

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
  .pipe(lint())
  .pipe(lint.format())
  .pipe(lint.failAfterError())
);

gulp.task('dev', ['clean', 'copy', 'dev:client', 'dev:customer', 'dev:server']);
gulp.task('prod', ['clean', 'copy', 'prod:client', 'prod:customer', 'prod:server']);

gulp.task('watch', () =>
  gulp.watch('src/**/*', ['dev'])
);
