'use strict';

module.exports = function(grunt) {
  return {
    options: {
      livereload: true
    },
    gruntfile: {
      files: '<%= config.gruntfile %>',
      tasks: ['jshint:gruntfile']
    },
    build: {
      files: '<%= config.buildfiles %>',
      tasks: ['jshint:build']
    },
    html: {
      files: '<%= config.paths.template %>**/*',
      tasks: ['clean', 'template']
    },
    js: {
      files: [
        '<%= config.paths.js %>/**/*.js',
        '<%= config.paths.test %>/**/*.js'
      ],
      tasks: ['jshint:app', 'test']
    },
    less: {
      files: '<%= config.paths.less %>/**/*.less',
      tasks: ['less', 'recess']
    }
  };
};
