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
    non_responsive_minify: {
      expand: true,
      cwd: 'dist/',
      src: ['**/*.non-responsive.css'],
      dest: 'dist/',
      ext: '.non-responsive.min.css'
    },
    all: {
      files: {
        'dist/locservices-ui.min.css' : ['dist/**/*.css', '!dist/**/*.non-responsive.css', '!dist/**/*.min.css'],
        'dist/locservices-ui.desktop.css' : ['dist/**/*.non-responsive.css']
      }
    }
  };
};
