'use strict';

var gulp    = require('gulp');
var mocha   = require('gulp-mocha');
var argv    = require('yargs').argv;
var filters = require('../config/gulp').filters;
var paths   = require('../config/gulp').paths;

gulp.task('test', () => {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
  }

  var scanPaths = argv.filter ?
    argv.filter :
    paths.test + filters.jsDeep;

  var grep = argv.grep;
  var reporter = argv.reporter || 'spec';

  return gulp
    .src(scanPaths, { read: false })
    .pipe(mocha({
      grep: grep,
      reporter: reporter
    }));
});
