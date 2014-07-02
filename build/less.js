'use strict';

module.exports = function() {
  return {
    options: {
      compress: false,
      yuicompress: false
    },
    build: {
      files: [
        {
          expand: true,
          cwd: '<%= config.paths.less %>',
          src: ['**/*.less', '!**/_*.less'],
          dest: '<%= config.paths.css %>',
          ext: '.css'
        }
      ]
    }
  };
};
