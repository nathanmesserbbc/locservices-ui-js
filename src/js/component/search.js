/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

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
  Search.prototype = new Component();
  Search.prototype.constructor = Search;

  Search.prototype.render = function() {

  };

  Search.prototype.search = function() {

  };

  return Search;
});
