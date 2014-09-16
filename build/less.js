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
          src: ['**/*.less', '!**/*.non-responsive.less', '!**/_*.less'],
          dest: '<%= config.paths.css %>',
          ext: '.css'
        }
      ]
    },
    build_non_responsive: {
      files: [
        {
          expand: true,
          cwd: '<%= config.paths.less %>',
          src: ['**/*.non-responsive.less', '!**/_*.less'],
          dest: '<%= config.paths.css %>',
          ext: '.non-responsive.css'
        }
      ]
    }
  };
};
