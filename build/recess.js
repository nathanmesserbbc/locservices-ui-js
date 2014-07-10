'use strict';

module.exports = function() {
  return {
    options: {
      compile: false,
      noIDs: false,
      noUnderscores: false,
      noUniversalSelectors: false,
      strictPropertyOrder: false
    },
    build: {
      src: '<%= config.paths.css %>**/*.css'
    }
  };
};
