var gulp    = require('gulp');
var config  = require('../config/gulp').watcher;

gulp.task('watch', ['browserify'], function() {
  config.watchers.forEach(function(watcher) {
    gulp.watch(watcher.src, watcher.tasks);
  });
});
