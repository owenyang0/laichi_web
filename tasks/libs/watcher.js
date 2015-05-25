var through2 = require('through2');
var gutil = require('gulp-util');

module.exports = function() {

  var gulp = this;

  this.isWatching = false;

  this.setWatcher = function() {
    this.isWatching = true;
  };

  this.watcher = function() {
    if (this.isWatching) {
      gulp.watch.apply(gulp, arguments);
    }
  };

  this.pipeTimer = function(taskname) {
    var startTime = new Date();
    taskname = taskname || '= .= !';

    return through2.obj(function(chunk, enc, callback) {

      // transform data
      this.push(chunk);

      // calc cost time
      if (gulp.isWatching) {
        var time = new Date() - startTime;
        gutil.log('Watcher:',
          '\'' + gutil.colors.cyan(taskname) + '\'',
          're-bundle after',
          gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'));
      }

      // end
      callback()
    })
  };

  // --watch
  if (gutil.env.watch) {
    this.setWatcher();
  }
};
