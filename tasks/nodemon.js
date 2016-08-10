'use strict';

var gulp    = require('gulp');
var gutil   = require('gulp-util');
var nodemon = require('gulp-nodemon');
var paths   = require('../config/gulp').paths;

gulp.task('nodemon', cb=> {
  var isFirstStart = true;
  return nodemon({ 
    script: './server/app.js', 
    ext: 'js',
    watch: [
      paths.config,
      paths.server
    ],
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      HOST: 'localhost'
    }
  })
  .on('start', () => {
    gutil.log('Server started!');
    if (isFirstStart) {
      isFirstStart = false;
      cb();
    }
  })
  .on('restart', () => {
    gutil.log('Server restarted!');
  });
}); 
