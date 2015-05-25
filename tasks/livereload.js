var livereload = require('gulp-livereload');

module.exports = function () {
  livereload.listen();
  this.livereload = livereload;
};
