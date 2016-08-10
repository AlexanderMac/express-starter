'use strict';

var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var argv    = require('yargs').argv;
var filters = require('../config/gulp').filters;
var paths   = require('../config/gulp').paths;

gulp.task('lint-server', () => {
  var scanPaths;
  if (argv.filter) {
    scanPaths = argv.filter;
  } else {
    scanPaths = [
      paths.config + filters.jsDeep,
      paths.gulp + filters.jsDeep,
      paths.server + filters.jsDeep
    ];
  }

  return gulp
    .src(scanPaths)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-test', () => {
  var scanPaths;
  if (argv.filter) {
    scanPaths = argv.filter;
  } else {
    scanPaths = paths.test + filters.jsDeep;
  }

  return gulp
    .src(scanPaths)
    .pipe(jshint(paths.test + '.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint', ['lint-server', 'lint-test']);
