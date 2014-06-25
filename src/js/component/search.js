(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    return define(factory);
  } else {
    if (typeof locator === "undefined") {
      global.locator = { ui: {}};
    }
    locator.ui.search = factory();
  }
}(this, function() {

  "use strict";

  return function() {};

}));
