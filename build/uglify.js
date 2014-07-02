'use strict';

module.exports = function() {
  return {
    options: {
      compress: true
    },
    build: {
      files: [
        {
          expand: true,
          cwd: '<%= config.paths.js %>',
          src: ['**/*.js', '!app.js', '!examples/**/*'],
          dest: '<%= config.paths.minjs %>',
          ext: '.min.js',
          extDot: 'first'
        }
      ]
    }
  };
};
