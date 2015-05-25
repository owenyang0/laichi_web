var gulp = require('gulp');
var runSequence = require('run-sequence');

require('./tasks/libs/watcher').call(gulp, null);

var opts = {
  js: {
    main: './client.js'
  },
  css: {
    main: './public/stylesheets/app.styl',
    src: [
      './public/stylesheets/{,**/}*.styl'
    ],
    dest: './public/css/'
  }
};

gulp.opts = opts;

gulp.task('set:reload', require('./tasks/livereload'));

gulp.task('js', require('./tasks/js'));
gulp.task('css', require('./tasks/css'));
gulp.task('iconfont', require('./tasks/iconfont'));

gulp.task('test', require('./tasks/test'));

// --prod will build for product
gulp.task('build', function(cb) {
  runSequence([
    'iconfont',
    'css',
    'js'
  ])
});
gulp.task('dev', function() {
  gulp.setWatcher();
  gulp.start('build');
});
gulp.task('default', [
  'set:reload',
  'dev'
]);
