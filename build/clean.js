"use strict";

module.exports = function(grunt) {
  return {
    dist: ["<%= config.paths.css %>", "<%= config.paths.minjs %>"]
  };
};
