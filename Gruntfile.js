/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: grunt.file.readJSON("./build/config.json"),

    jshint: require("./build/jshint")(grunt),
    recess: require("./build/recess")(grunt),
    less: require("./build/less")(grunt),
    watch: require("./build/watch")(grunt)
  });

  grunt.registerTask("build", ["jshint", "recess", "less"]);
  grunt.registerTask("default", ["build"]);

  require("load-grunt-tasks")(grunt);
};
