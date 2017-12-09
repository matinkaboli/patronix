/* eslint-disable */

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifier = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var replace = require('gulp-replace');
var del = require('del');

var config = require('./src/config.json');

/**
 * functions
 */

function taskBabel() {
  return gulp.src(['src/**/*.js', '!src/public/js/lib/**/*', '!src/public/js/**/*.js'])
  .pipe(babel({
    presets: [
      'env'
    ],
    plugins: [
      'add-module-exports',
      'transform-runtime'
    ]
  }))
  .pipe(replace(/@@LINK@@/g, config.url))
  .pipe(gulp.dest('build'));
}

function taskJsProd() {
  return gulp.src(['src/public/js/**/*.js', '!src/public/js/lib/**/*'])
  .pipe(babel({
    presets: [
      'env'
    ]
  }))
  .pipe(uglify())
  .pipe(gulp.dest('build/public/js'));
}

function taskJsDev() {
  return gulp.src(['src/public/js/**/*.js', '!src/public/js/lib/**/*'])
  .pipe(babel({
    presets: [
      'env'
    ]
  }))
  .pipe(gulp.dest('build/public/js'));
}

function taskLess() {
  return gulp.src(['src/public/css/*.less', '!src/public/css/lib/**/*'])
  .pipe(less())
  .pipe(autoprefixer())
  .pipe(minifier())
  .pipe(gulp.dest('build/public/css'));
}

function taskNunjucksProd() {
  gulp.src('src/views/**/*.njk')
      .pipe(replace(/@@PROJECTNAME@@/g, config.title))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('build/views'));
}

function taskNunjucksDev() {
  gulp.src('src/views/**/*.njk')
      .pipe(replace(/@@PROJECTNAME@@/g, config.title))
      .pipe(gulp.dest('build/views'));
}

/**
 * tasks
 */

gulp.task('server:clean', function() {
  return del([
    'build/**',
    '!build',
    '!build/public',
    '!build/public/**',
    '!build/public/statics',
    '!build/public/statics/**'
  ]);
});

gulp.task('client:clean', function() {
  return del([
    'build/public/**',
    '!build/public',
    '!build/public/statics',
    '!build/public/statics/**'
  ]);
});

gulp.task('full:clean', function() {
  return del([
    'build',
    '!build',
    '!build/public',
    '!build/public/statics',
    '!build/public/statics/**'
  ]);
});

gulp.task('server:copy', function() {
  return [
    gulp.src(['src/config.json'])
    .pipe(gulp.dest('build'))
  ];
});

gulp.task('client:copy', function() {
  return [
    gulp.src(['src/public/**/*', '!src/public/js/**/*', '!src/public/css/**/*'])
    .pipe(gulp.dest('build/public/')),

    gulp.src(['src/public/js/lib/**/*'])
    .pipe(gulp.dest('build/public/js/lib')),

    gulp.src(['src/public/css/lib/**/*'])
    .pipe(gulp.dest('build/public/css/lib'))
  ];
});

gulp.task('full:copy', function() {
  return [
    gulp.src(['src/config.json'])
    .pipe(gulp.dest('build')),

    gulp.src(['src/public/**/*', '!src/public/js/**/*', '!src/public/css/**/*'])
    .pipe(gulp.dest('build/public/')),

    gulp.src(['src/public/js/lib/**/*'])
    .pipe(gulp.dest('build/public/js/lib')),

    gulp.src(['src/public/css/lib/**/*'])
    .pipe(gulp.dest('build/public/css/lib'))
  ];
});

gulp.task('server:babel', ['server:clean'], taskBabel);
gulp.task('full:babel', ['full:clean'], taskBabel);

gulp.task('client:js:prod', ['client:clean'], taskJsProd);
gulp.task('full:js:prod', ['full:clean'], taskJsProd);
gulp.task('client:js:dev', ['client:clean'], taskJsDev);
gulp.task('full:js:dev', ['full:clean'], taskJsDev);

gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('client:less', ['client:clean'], taskLess);
gulp.task('full:less', ['full:clean'], taskLess);

gulp.task('client:nunjucks:prod', ['client:clean'], taskNunjucksProd);
gulp.task('server:nunjucks:prod', ['server:clean'], taskNunjucksProd);
gulp.task('full:nunjucks:prod', ['full:clean'], taskNunjucksProd);
gulp.task('client:nunjucks:dev', ['client:clean'], taskNunjucksDev);
gulp.task('server:nunjucks:dev', ['server:clean'], taskNunjucksDev);
gulp.task('full:nunjucks:dev', ['full:clean'], taskNunjucksDev);


gulp.task('client:prod', ['client:clean', 'client:less', 'client:nunjucks:prod', 'client:js:prod'], function() {
  return gulp.start('client:copy');
});
gulp.task('client:dev', ['client:clean', 'client:less', 'client:nunjucks:dev', 'client:js:dev'], function() {
  return gulp.start('client:copy');
});

gulp.task('server:prod', ['server:clean', 'server:babel', 'server:nunjucks:prod'], function() {
  return gulp.start('server:copy');
});
gulp.task('server:dev', ['server:clean', 'server:babel', 'server:nunjucks:dev'], function() {
  return gulp.start('server:copy');
});

gulp.task('full:prod', ['full:clean', 'full:babel', 'full:less', 'full:nunjucks:prod', 'full:js:prod'], function() {
  return gulp.start('full:copy');
});
gulp.task('full:dev', ['full:clean', 'full:babel', 'full:less', 'full:nunjucks:dev', 'full:js:dev'], function() {
  return gulp.start('full:copy');
})

gulp.task('client:watch', function() {
  gulp.watch('src/**/*', ['client:dev']);
});
gulp.task('server:watch', function() {
  gulp.watch('src/**/*', ['server:dev']);
});
gulp.task('full:watch', function() {
  gulp.watch('src/**/*', ['full:dev']);
});
