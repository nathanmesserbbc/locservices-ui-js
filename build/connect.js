'use strict';

module.exports = function(grunt) {
  return {
    options: {
      port: '<%= config.server.port %>',
      base: '<%= config.paths.app %>',
      hostname: '<%= config.server.host %>'
    },
    server: {
      options: {
        open: true,
        livereload: true
      }
    }
  };
};
