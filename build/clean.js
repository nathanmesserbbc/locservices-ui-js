'use strict';

module.exports = function(grunt) {
  return {
    dist: [
      '<%= config.paths.app %>*.html',
      '<%= config.paths.css %>',
      '<%= config.paths.minjs %>'
    ]
  };
};
