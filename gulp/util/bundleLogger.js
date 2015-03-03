var gutil         = require('gulp-util');
var prettyHrtime  = require('pretty-hrtime');
var fs            = require('fs');
var startTime;

function getHumanFilesize(filepath) {
  var stats = fs.statSync(filepath);
  var fileSizeInBytes = stats.size;
  if (fileSizeInBytes > 1000000) { // Mb
    return (fileSizeInBytes / 1000000).toFixed(2) + 'Mb';
  }
  if (fileSizeInBytes > 1000) {    // Kb
    return (fileSizeInBytes / 1000).toFixed(2) + 'Kb';
  }
  return fileSizeInBytes + 'b';
}

module.exports = {
  start: function(filename, isWatching) {
    startTime = process.hrtime();
    var title = isWatching ? 'Bundling and watching' : 'Bundling';
    gutil.log(title, gutil.colors.cyan(filename) + '...');
  },

  end: function(filename, filedir) {
    var taskTime = process.hrtime(startTime);
    var prettyTime = prettyHrtime(taskTime);
    var filesize = getHumanFilesize(filedir + '/' + filename);
    gutil.log('Bundled', gutil.colors.cyan(filename), 'in', gutil.colors.magenta(prettyTime), 'filesize', gutil.colors.magenta(filesize));
  }
};
