'use strict';

module.exports = function() {
  return {
    minify: {
      options: {
        optimizationLevel: 7
      },
      files: [{
        expand: true,
        src: ['<%= config.paths.images %>/**/*'],
        filter: 'isFile'
      }]
    }
  };
};
