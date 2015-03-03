var gulp = require('gulp');

gulp.task('build', ['browserify', 'build-vendor-src', 'build-app-src']);
gulp.task('dev', ['browser-sync', 'nodemon']);
gulp.task('prod', ['check', 'build']);
gulp.task('default', ['dev']);