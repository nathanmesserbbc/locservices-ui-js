'use strict';

module.exports = function() {
  return {
    dist: [
      '<%= config.paths.app %>*.html',
      '<%= config.paths.css %>',
      '<%= config.paths.minjs %>'
    ]
  };
};
