/*global locservices */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    global.locservices = locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.component = locservices.ui.component || {};
    locservices.ui.component.Search = factory();
  }
}(this, function() {

  'use strict';

  function Search(options) {
    options = options || {};
    options.componentId = 'search';

    if (undefined === options.api) {
      throw new Error('Search requires api parameter');
    } else {
      this.api = options.api;
    }
    this.setComponentOptions(options);
  }
  Search.prototype = new locservices.ui.component.Component();
  Search.prototype.constructor = Search;

  Search.prototype.render = function() {

  };

  Search.prototype.search = function() {

  };

  return Search;

}));
