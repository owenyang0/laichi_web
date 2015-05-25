var mocha = require('gulp-mocha');

module.exports = function () {
  return this
    .src(['test/init.js', 'test/**/*.js', 'test/**/*.jsx'])
    .pipe(mocha({
      require: 'should',
      reporter: 'spec',
      ui: 'bdd',
      compilers: 'jsx:test/compiler.js'
    }));
};
