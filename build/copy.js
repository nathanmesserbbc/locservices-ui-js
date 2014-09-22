'use strict';

module.exports = function() {
  var rename = function(src, dest) {
    var parts = dest.split('/');
    var name  = parts[1].split('.')[0];
    var type  = parts[1].split('.')[1];
    type = type === 'non-responsive' ? type + '.css' : type;
    
    return 'dist/' + parts[0] + '/' + name + '/' + name + '.' + type;
  };

  return {
    js: {
      cwd: 'src/js',
      expand: true,
      src: ['**/*.js', '!example/**', '!app.js'],
      dest: 'dist/',
      rename: rename
    },
    css: {
      cwd: 'src/css',
      expand: true,
      src: ['**/*.css', '!example/**'],
      dest: 'dist/',
      rename: rename
    }
  };
};
