
"use strict";

var request = require("request");
var parse   = require("xml2js").parseString;

module.exports = function(grunt) {
  return function() {
    var config    = grunt.config.data.config;
    var head      = grunt.file.read(config.template.head);
    var bodyFirst = grunt.file.read(config.template.bodyfirst);
    var bodyLast  = grunt.file.read(config.template.bodylast);

    var template = grunt.file.read(config.template.html)
                    .replace(config.barlesque.head, head)
                    .replace(config.barlesque.bodyfirst, bodyFirst)
                    .replace(config.barlesque.bodylast, bodyLast);

    grunt.file.write(config.paths.app + "/index.html", template);
  };
};
