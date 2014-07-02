'use strict';

module.exports = function() {
  return {
    options: {
      configFile: '<%= config.karmaconf %>'
    },
    run: {},
    ci: {
      browsers: ['Firefox', 'PhantomJS']
    },
    debug: {
      logLevel: 'DEBUG'
    }
  };
};
