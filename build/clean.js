'use strict';

module.exports = function() {
  return {
    serve: [
      '<%= config.paths.app %>*.html',
      '<%= config.paths.css %>'
    ],
    dist: [
      '<%= config.paths.dist %>/**/*'
    ]
  };
};
