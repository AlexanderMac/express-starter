var gulp   = require('gulp');
var rimraf = require('rimraf');
var paths  = require('../config/gulp').paths;

gulp.task('clean', function(cb) {
  rimraf(paths.assets, cb);
});