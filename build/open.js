
'use strict';

module.exports = function() {
  return {
    chrome: {
      path: 'http://<%= config.server.host %>:<%= config.server.port %>',
      app: 'Google Chrome'
    },
    firefox: {
      path: 'http://<%= config.server.host %>:<%= config.server.port %>',
      app: 'Firefox'
    }
  };
};
