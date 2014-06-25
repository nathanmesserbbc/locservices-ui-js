
"use strict";

module.exports = function(grunt) {
  return {
    chrome: {
      path: "http://localhost:9001",
      app: "Google Chrome"
    },
    firefox: {
      path: "http://localhost:9001",
      app: "Firefox"
    }
  };
};
