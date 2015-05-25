var path = require('path');
var _ = require('lodash');

var source = require('vinyl-source-stream');

var watchify = require('watchify');
var browserify = require('browserify');

var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');


var babelify = require("babelify");

var taskName = path.basename(__filename, path.extname(__filename));

var defaultConfig = {
  main: './client.js',
  dest: './public/js/'
};

module.exports = function() {

  var gulp = this;
  var conf = _.merge(defaultConfig, gulp.opts[taskName]);

  var bundler = browserify(gulp.isWatching
    ? _.merge(watchify.args, {debug: true, ignoreMissing: true})
    : {basedir: path.dirname(conf.main), ignoreMissing: true});

  bundler.transform(babelify);

  bundler.
    add(path.join(process.cwd(), conf.main));

  if (gulp.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('time', function(time) {
      gutil.log(gutil.colors.cyan('watchify'),
        're-bundled', 'after', gutil.colors.magenta(time > 1000 ? time / 1000 + ' s' : time + ' ms'))
    });
  }

  function bundle() {
    return bundler.bundle()
      .on('error', function(e) {
        gutil.log('Browserify Error', wrapWithPluginError(e));
      })
      //.pipe(checkedUnpathify(gulp))
      .pipe(source('app.js'))
      .pipe(checkedUglify())
      .pipe(gulp.dest(conf.dest))
      .pipe(checkReload(gulp))
  }

  return bundle();
};

function checkReload(gulp) {
  return gulp.livereload ? gulp.livereload() : gutil.noop();
}

function checkedUnpathify(gulp) {
  return gulp.isWatching ? gutil.noop() : require('unpathify')();
}

function checkedUglify() {
  return gutil.env.prod ? streamify(uglify()) : gutil.noop()
}

function wrapWithPluginError(originalError) {
  var message, opts;
  if ('string' === typeof originalError) {
    message = originalError;
  } else {
    message = originalError.annotated || originalError.message;
    opts = {
      name: originalError.name,
      stack: originalError.stack,
      fileName: originalError.fileName,
      lineNumber: originalError.lineNumber
    };
  }
  return new gutil.PluginError('watchify', message, opts);
}
