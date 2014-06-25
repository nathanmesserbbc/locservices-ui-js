"use strict";

module.exports = function(grunt) {
  return {
    options: {
      jshintrc: true
    },
    gruntfile: {
      src: "<%= config.gruntfile %>"
    },
    build: {
      src: "<%= config.buildfiles %>"
    },
    app: {
      src: "<%= config.paths.js %>"
    }
  };
};
