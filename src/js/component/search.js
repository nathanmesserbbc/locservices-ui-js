(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    return define(factory);
  } else {
    global.locator = locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.component = locservices.ui.component || {};
    locservices.ui.component.search = factory();
  }
}(this, function() {

  "use strict";

  Search.prototype = new locservices.ui.component.component;
  Search.prototype.constructor = Search;

  function Search(options){ 
    options.componentId = "search";
    this.setComponentOptions(options);
  } 

  return Search;

}));
