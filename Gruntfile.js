/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  require("time-grunt")(grunt);
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    config: grunt.file.readJSON("./build/config.json"),
    jshint: require("./build/jshint")(grunt),
    karma: require("./build/karma")(grunt),
    less: require("./build/less")(grunt),
    recess: require("./build/recess")(grunt),
    connect: require("./build/connect")(grunt),
    open: require("./build/open")(grunt),
    watch: require("./build/watch")(grunt),
    concurrent: require("./build/concurrent")(grunt),
    uglify: require("./build/uglify")(grunt)
  });

  grunt.registerTask("css", ["less", "recess"]);
  grunt.registerTask("test", ["karma"]);
  grunt.registerTask("build", ["concurrent", "uglify", "test"]);
  grunt.registerTask("run", ["build", "connect", "open:chrome"]);

  grunt.registerTask("default", ["run"]);
};
