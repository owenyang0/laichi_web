var path = require('path');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var autoprefixer = require('autoprefixer-stylus');
var jeet = require('jeet');
var _ = require('lodash');
var taskName = path.basename(__filename, path.extname(__filename));


var defaultConfig = {
  main: './public/stylesheets/app.styl',
  src: [
    './public/stylesheets/{,**/}*.styl'
  ],
  dest: './public/css/',
  options: {
    use: [
      autoprefixer({ browsers: ['last 5 versions']}),
      jeet(),
      includeCss(),
      normalize()
    ]
  }
};

module.exports = function () {

  var gulp = this;
  var conf = _.merge(defaultConfig, gulp.opts[taskName]);

  function bundle() {
    return gulp.src(conf.main)
      .pipe(stylus(conf.options))
      .on('error', gutil.log.bind(gutil, 'Stylus Error'))
      .pipe(gulp.dest(conf.dest))
      .pipe(checkAndreload(gulp))
      .pipe(gulp.pipeTimer(taskName))
  }

  gulp.watcher([].concat(conf.src), function (evt) {
    gutil.log(evt.path, evt.type);
    bundle();
  });

  return bundle();
};

function checkAndreload(gulp) {
  return gulp.livereload ? gulp.livereload({auto: false}) : gutil.noop();
}

function includeCss() {
  return function (style) {
    style.set('include css', true);
  }
}

function normalize() {
  return function (style) {
    style.include(path.join(process.cwd(), 'node_modules', 'normalize.css'));
  }
}
