'use strict';

module.exports = function(grunt) {
  return {
    options: {
      compile: false,
      noIDs: false,
      noUniversalSelectors: false,
      strictPropertyOrder: false
    },
    build: {
      src: '<%= config.paths.css %>**/*.css'
    }
  };
};
