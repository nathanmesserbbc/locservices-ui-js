'use strict';

module.exports = function() {
  return {
    lint: ['jscs', 'jshint'],
    template: ['css', 'template'],
    copy: ['copy:js', 'copy:css'],
    minify: ['cssmin', 'uglify']
  };
};
