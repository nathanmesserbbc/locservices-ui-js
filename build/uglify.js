'use strict';

module.exports = function() {
  return {
    options: {
      compress: true,
      report: 'gzip'
    },
    build: {
      files: [
        {
          expand: true,
          cwd: 'dist/',
          src: ['**/*.js', '!*.min.js'],
          dest: 'dist/',
          ext: '.min.js'
        }
      ]
    }
  };
};
