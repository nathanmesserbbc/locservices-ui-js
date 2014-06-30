'use strict';

module.exports = function(grunt) {
  return {
    options: {
      compile: false,
      noIDs: false,
      noUniversalSelectors: false
    },
    build: {
      src: '<%= config.paths.css %>**/*.css'
    }
  };
};
