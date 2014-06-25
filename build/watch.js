"use strict";

module.exports = function(grunt) {
  return {
    gruntfile: {
      files: "<%= config.gruntfile %>",
      tasks: ["jshint:gruntfile"]
    },
    build: {
      files: "<%= config.buildfiles %>",
      tasks: ["jshint:build"]
    },
    js: {
      files: "<%= config.paths.js %>/**/*.js",
      tasks: ["jshint:app"]
    },
    less: {
      files: "<%= config.paths.less %>/**/*.less",
      tasks: ["less", "recess"]
    }
  };
};
