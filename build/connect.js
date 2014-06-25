"use strict";

module.exports = function(grunt) {
  return {
    options: {
      port: "<%= config.server.port %>",
      base: "<%= config.paths.test %>"
    },
    server: {
      options: {
        keepalive: true,
        open: true
      }
    }
  };
};
