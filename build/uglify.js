'use strict';

module.exports = function(grunt) {
  return {
    options: {
      compress: true,
      report: 'gzip'
    },
    build: {
      files: [
        {
          expand: true,
          cwd: '<%= config.paths.js %>',
          src: ['**/*.js', '!app.js', '!examples/**/*'],
          dest: '<%= config.paths.minjs %>',
          ext: '.min.js',
          extDot: 'first'
        }
      ]
    }
  };
};
