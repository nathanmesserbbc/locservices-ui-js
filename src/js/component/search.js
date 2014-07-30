/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  function Search(options) {
    var self = this;
    options = options || {};
    options.componentId = 'search';

    if (undefined === options.api) {
      throw new Error('Search requires api parameter');
    } else {
      self.api = options.api;
    }
    self.setComponentOptions(options);
    self.input = self.container.find(options.selector || '#ls-search-input');

    self.container.on('submit', function(e){
      e.preventDefault();
      self.search(self.input.val());
    });
  }
  Search.prototype = new Component();
  Search.prototype.constructor = Search;

  Search.prototype.search = function(searchTerm, startOffset) {
    var params = {};

    $.emit(this.eventNamespace + ':start', [searchTerm]);
    this.api.search(searchTerm, {
      params: params,
      success: function(data) {
        $.emit(this.eventNamespace + ':end');
        data.metadata.startOffset = startOffset;
        data.metadata.searchTerm = searchTerm;
        $.emit(this.eventNamespace + ':results', [data.results, data.metadata]);
      },
      error: function() {
        $.emit(this.eventNamespace + ':end');
        $.emit(this.eventNamespace + ':error', ['Error searching for "' +searchTerm +'"']);
      }
    });
  };

  return Search;
});
