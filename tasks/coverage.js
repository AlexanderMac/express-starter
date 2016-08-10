'use strict';

var gulp      = require('gulp');
var gistanbul = require('gulp-istanbul');
var gmocha    = require('gulp-mocha');
var filters   = require('../config/gulp').filters;
var paths     = require('../config/gulp').paths;

gulp.task('coverage', cb => {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
  }

  gulp.src([
      paths.server + filters.jsDeep,
      '!' + paths.server + 'app.js',
      '!' + paths.server + '/routes/index.js',
      '!' + paths.server + '/db/index.js',
      '!' + paths.server + '/util/logger.js'
    ])
    .pipe(gistanbul({ includeUntested: true }))
    .pipe(gistanbul.hookRequire())
    .on('finish', () => {
      gulp.src(paths.test + filters.jsDeep)
        .pipe(gmocha({ reporter: 'dot' }))
        .pipe(gistanbul.writeReports())
        .pipe(gistanbul.enforceThresholds({ thresholds: { global: 90 } }))
        .on('end', cb);
    });
});
