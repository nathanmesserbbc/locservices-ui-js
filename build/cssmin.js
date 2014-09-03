'use strict';

module.exports = function() {
  return {
    minify: {
      expand: true,
      cwd: 'dist/',
      src: ['**/*.css', '!*.min.css'],
      dest: 'dist/',
      ext: '.min.css'
    },
    all: {
      files: {
        'dist/all.min.css' : ['dist/**/*.css', '!dist/**/*.min.css']
      }
    }
  };
};
