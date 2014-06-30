'use strict';

module.exports = function(grunt) {
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
      // logLevel: 'DEBUG',
      // singleRun: true,
      // browsers: ['Chrome']
    }
  };
};
