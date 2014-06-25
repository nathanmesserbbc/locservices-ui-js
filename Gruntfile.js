/*global module:false*/
module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
      },
      gruntfile: {
        src: "Gruntfile.js"
      }
    },

    watch: {
      gruntfile: {
        files: "<%= jshint.gruntfile.src %>",
        tasks: ["jshint:gruntfile"]
      }
    }
  });

  require("load-grunt-tasks")(grunt);

  // Default task.
  grunt.registerTask("build", ["jshint"]);
  grunt.registerTask("default", ["build"]);

};
