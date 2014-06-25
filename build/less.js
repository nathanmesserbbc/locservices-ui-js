"use strict";

module.exports = function(grunt) {
  return {
    options: {
      compress: false,
      yuicompress: false
    },
    build: {
      src: "<%= config.paths.less %>component/search.less",
      dest: "<%= config.paths.css %>component/search.css"
    }
  };
};
