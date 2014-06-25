"use strict";

module.exports = function(grunt) {
  return {
    options: {
      port: "<%= config.server.port %>",
      base: "<%= config.paths.app %>"
    },
    server: {
      options: {
        keepalive: true,
        open: true,
        livereload: true
      }
    }
  };
};
