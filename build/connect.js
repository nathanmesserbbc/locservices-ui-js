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
    },
    test: {
      options: {
        base: '<%= config.paths.test %>',
        open: true,
        livereload: true,
        middleware: function(connect) {
          var paths = grunt.config.get('config.paths');
          return [
            connect['static'](paths.test),
            connect['static'](paths.app)
          ];
        }
      }
    }
  };
};
