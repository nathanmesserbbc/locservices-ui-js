'use strict';

module.exports = function() {

  return {
    main: [
      '<%= config.paths.js %>**/*.js',
      '<%= config.paths.test %>**/*.js'
    ],
    options: {
      config: '.jscsrc'
    }
  };

};