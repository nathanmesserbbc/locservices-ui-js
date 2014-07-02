'use strict';

module.exports = function() {
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
          '!<%= config.paths.js %>/app.js',
          '<%= config.paths.test %>**/*.js',
          '!<%= config.paths.test %>/vendor/**/*.js'
        ]
      }
    }
  };
};
