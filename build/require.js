'use strict';

module.exports = function() {
  return {
    primary: {
      options: {
        optimize: 'uglify2',
        baseUrl: 'src/',
        //mainConfigFile: 'build/require-conf.js',
        name: 'js/controller/primary',
        out: 'dist/primary.all.js',
        paths: {
          'pubsub' : 'vendor/events/pubsub',
          'jquery' : 'empty:',
          'locservices/ui' : 'js/',
          'locservices/core': 'vendor/locservices-core-js/src'
        }
      }
    }
  };
};
