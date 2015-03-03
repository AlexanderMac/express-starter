var gulp   = require('gulp');
var _      = require('lodash');
var gutil  = require('gulp-util');
var bobr   = require('bobr');
var config = require('../config/gulp').bobr;

gulp.task('bobr', function() {
  var modules = bobr({
    overrides: config.overrides,
    browserExternalFile: config.browserExternalFile
  });
  
  _.each(modules, function(module) {
    gutil.log('Added', gutil.colors.cyan(module));
  });
});
