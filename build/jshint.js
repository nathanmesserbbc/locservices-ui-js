'use strict';

module.exports = function(grunt) {
  return {
    options: {
      jshintrc: true
    },
    gruntfile: {
      src: '<%= config.gruntfile %>'
    },
    build: {
      src: '<%= config.buildfiles %>'
    },
    app: {
      files: {
        src: [
          '<%= config.paths.js %>**/*.js',
          '<%= config.paths.test %>**/*.js'
        ]
      }
    }
  };
};
