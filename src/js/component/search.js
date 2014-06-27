/*global locator */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    global.locator = global.locator || {};
    locator.ui = locator.ui || {};
    locator.ui.search = factory();
  }
}(this, function() {

  'use strict';

  function Search(options) {
    var self = this;
    this.api = options.api;
    this.$ = options.$;

    this.element = this.$('#ls-search-form');
    this.input = this.element.find('#ls-search-input');

    this.$('#ls-search-form').on('submit', function(e) {
      e.preventDefault();
      self.search(self.input.val());
    });
  }

  Search.prototype.search = function(searchTerm, startOffset) {
    var params = {
      filter: 'domestic'
    };
    if (startOffset) {
      params.start = startOffset;
    } else {
      startOffset = 0;
    }
    this.$.emit('locservices:search:start', [searchTerm]);
    this.api.search(searchTerm, {
      params: params,
      success: function(data) {
        this.$.emit('locservices:search:end');
        data.metadata.startOffset = startOffset;
        data.metadata.searchTerm = searchTerm;
        this.$.emit('locservices:search:results', [data.results, data.metadata]);
      },
      error: function() {
        this.$.emit('locservices:search:end');
        this.$.emit('locservices:error', ['Error searching for "' + searchTerm + '"']);
      }
    });
  };

  return Search;
}));
