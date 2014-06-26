"use strict";

module.exports = function(grunt) {
  return {
    options: {
      compress: true
    },
    build: {
      files: [
        {
          expand: true,
          cwd: "<%= config.paths.js %>",
          src: ["**/*.js", "!app.js"],
          dest: "<%= config.paths.minjs %>",
          ext: ".min.js",
          extDot: "first"
        }
      ]
    }
  };
};
