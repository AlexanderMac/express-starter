var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var argv    = require('yargs').argv;
var filters = require('../config/gulp').filters;
var paths   = require('../config/gulp').paths;

gulp.task('lint', function() {
  var scanPaths = argv.path ?
    argv.path :
    [
      paths.server + filters.jsDeep,
      paths.clientJs + filters.jsDeep,
      paths.test + filters.jsDeep,
      paths.config + filters.jsDeep
    ];
  
  return gulp
    .src(scanPaths)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});