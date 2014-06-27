/*global locservices */

(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    return define(factory);
  } else {
    global.locservices = locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.component = locservices.ui.component || {};
    locservices.ui.component.search = factory();
  }
}(this, function() {

  "use strict";

  function Search(options){
    options = options || {};
    options.componentId = "search";
    this.setComponentOptions(options);
  }

  Search.prototype = new locservices.ui.component.component;
  Search.prototype.constructor = Search;

  return Search;

}));
