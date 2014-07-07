'use strict';

module.exports = function() {
  return {
    serve: [
      '<%= config.paths.app %>*.html',
      '<%= config.paths.css %>'
    ],
    build: [
      '<%= config.paths.app %>*.html',
      '<%= config.paths.css %>',
      '<%= config.paths.minjs %>'
    ]
  };
};
