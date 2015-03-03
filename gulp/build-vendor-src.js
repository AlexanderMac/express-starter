var gulp           = require('gulp');
var csso           = require('gulp-csso');
var gif            = require('gulp-if');
var gsize          = require('gulp-size');
var gchanged       = require('gulp-changed');
var mainBowerFiles = require('main-bower-files');
var args           = require('../config/gulp').args;
var paths          = require('../config/gulp').paths;
var filters        = require('../config/gulp').filters;

gulp.task('build-vendor-css', function() {
  return gulp
    .src(mainBowerFiles(filters.cssDeep))
    .pipe(gchanged(paths.cssAssets))
    .pipe(gif(args.isProduction, csso()))
    .pipe(gsize({
      title: 'vendor-css'
    }))
    .pipe(gulp.dest(paths.cssAssets));
});

gulp.task('build-vendor-fonts', function() {
  return gulp
    .src(mainBowerFiles(filters.fonts))
    .pipe(gchanged(paths.fontAssets))
    .pipe(gsize({
      title: 'vendor-fonts'
    }))
    .pipe(gulp.dest(paths.fontAssets));
});

gulp.task('build-vendor-src', ['build-vendor-css', 'build-vendor-fonts']);
