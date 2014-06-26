(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    return define(factory);
  } else {
    global.locator = locator || {};
    locator.ui = locator.ui || {};
    locator.ui.search = factory();
  }
}(this, function() {

  "use strict";

  return function() {};

}));
