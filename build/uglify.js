"use strict";

module.exports = function(grunt) {
  return {
    options: {
      compress: false,
      yuicompress: false
    },
    build: {
      files: [
        {
          expand: true,
          cwd: "<%= config.paths.js %>",
          src: ["**/*.js"],
          dest: "<%= config.paths.minjs %>",
          ext: ".min.js",
          extDot: "first"
        }
      ]
    }
  };
};
