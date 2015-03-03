var gulp        = require('gulp');
var gutil       = require('gulp-util');
var nodemon     = require('gulp-nodemon');
var browserSync = require('browser-sync');
var paths       = require('../config/gulp').paths;

gulp.task('nodemon', function (cb) {
  var isFirstStart = true;
  return nodemon({ 
    script: 'server/app.js', 
    ext: 'js', 
    watch: [
      'app.js',
      paths.server
    ],
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
      HOST: 'localhost'
    }
  })
  .on('start', function () {
    gutil.log('Server started!');
    if (isFirstStart) {
      isFirstStart = false;
      cb();
    }
    setTimeout(function () {
      browserSync.reload({ stream: false });
     }, 500); 
  })
  .on('restart', function () {
    gutil.log('Server restarted!');
  });
}); 
