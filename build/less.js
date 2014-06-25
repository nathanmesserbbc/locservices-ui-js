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
          cwd: "<%= config.paths.less %>",
          src: ["**/*.less"],
          dest: "<%= config.paths.css %>",
          ext: ".css"
        }
      ]
    }
  };
};
