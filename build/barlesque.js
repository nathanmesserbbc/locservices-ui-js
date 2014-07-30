
'use strict';

var request = require('request');
var parse   = require('xml2js').parseString;

module.exports = function(grunt) {
  return function() {
    var done   = this.async();
    var config = grunt.config.data.config;
    var url    = config.barlesque.url;


    request.get(url, function(err, data) {
      if (err) {
        grunt.fail.fatal('Failed to download Barlesque content');
      }
      parse(data.body, function(err, result) {
        if (err) {
          grunt.fail.fatal('Failed parse Barlesque content');
        }
        var head = result.barlesque.head;
        var bodyFirst = result.barlesque.bodyfirst[0];
        var bodyLast = result.barlesque.bodylast[0];

        grunt.file.write(config.template.head, head);
        grunt.file.write(config.template.bodyfirst, bodyFirst);
        grunt.file.write(config.template.bodylast, bodyLast);
        done();
      });
    });
  };
};
