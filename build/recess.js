'use strict';

module.exports = function() {
  return {
    options: {
      compile: false,
      noIDs: false,
      noUnderscores: false,
      noUniversalSelectors: false,
      strictPropertyOrder: true
    },
    build: {
      src: '<%= config.paths.css %>**/*.css'
    }
  };
};
