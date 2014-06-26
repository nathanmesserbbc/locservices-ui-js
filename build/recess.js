"use strict";

module.exports = function(grunt) {
  return {
    options: {
      compile: false
    },
    build: {
      src: "<%= config.paths.css %>**/*.css"
    }
  };
};
