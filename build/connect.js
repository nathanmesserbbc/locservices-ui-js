"use strict";

module.exports = function(grunt) {
  return {
    options: {
      port: 9001,
      base: "<%= config.paths.test %>"
    },
    server: {
      options: {
        keepalive: true
      }
    },
    test: {
      options: {
        keepalive: false
      }
    }
  };
};
