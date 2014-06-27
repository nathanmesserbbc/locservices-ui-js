'use strict';

module.exports = function(grunt) {
  return {
    dist: [
      '<%= config.paths.app %>index.html',
      '<%= config.paths.css %>',
      '<%= config.paths.minjs %>'
    ]
  };
};
