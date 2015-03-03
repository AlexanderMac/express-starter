var gulp     = require('gulp');
var csso     = require('gulp-csso');
var gif      = require('gulp-if');
var gsize    = require('gulp-size');
var gchanged = require('gulp-changed');
var args     = require('../config/gulp').args;
var paths    = require('../config/gulp').paths;
var filters  = require('../config/gulp').filters;

gulp.task('build-app-src', function() {
  return gulp
    .src(paths.clientCss + filters.css)
    .pipe(gchanged(paths.cssAssets))
    .pipe(gif(args.isProduction, csso()))
    .pipe(gsize({
      title: 'app-src'
    }))   
    .pipe(gulp.dest(paths.cssAssets));
});