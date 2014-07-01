'use strict';

module.exports = function() {

  return {
    main: [
      '<%= config.paths.js %>**/*.js',
      '<%= config.paths.test %>**/*.js',
      '!<%= config.paths.test %>/vendor/**/*.js'
    ],
    options: {
      config: '.jscsrc'
    }
  };

};
