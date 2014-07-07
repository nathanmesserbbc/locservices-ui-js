/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  /**
   * SearchResults.
   *
   * @param {Object} options
   * @constructor
   */
  function SearchResults(options) {
    var self = this;
    options = options || {};
    options.componentId = 'search_results';

    if (undefined === options.api) {
      throw new Error('SearchResults requires api parameter');
    } else {
      self.api = options.api;
    }
    self.setComponentOptions(options);
    $.on(this.eventNamespaceBase + ':component:search:results', function(results, metadata) {
      if (metadata.totalResults === 1) {
        var result = results[0];
        self.emit('location', [result]);
        return;
      }
      self.render(results, metadata);
    });

    self._data = {};

    self.setup();
  }
  SearchResults.prototype = new Component();
  SearchResults.prototype.constructor = SearchResults;

  /**
   * Setup the DOM
   */
  SearchResults.prototype.setup = function() {

    var internalContainer = $('<div />').addClass('li-ui-comp-search_results');
    this.list = $('<ul />');
    this.moreResults = $('<a />').attr('href', '').addClass('ls-ui-comp-search_results-more').text('Show more results');

    internalContainer.append(this.list).append(this.moreResults);
    this.container.append(internalContainer);

    var self = this;
    this.list.on('click', function(evt) {
      var locationId;
      evt.preventDefault();
      locationId = $(evt.target).data('id');
      self.emit('location', [self._data[locationId]]);
      self.clear();
      return false;
    });

    this.moreResults.on('click', function(evt) {
      evt.preventDefault();
      self.api.search(self.searchTerm, {
        start: self.offset + 10,
        success: function(resp) {
          self.render(resp.results, resp.metadata);
        }
      });
      return false;
    });

  };

  /**
   * Render some search results.
   *
   * @param {Array} results
   * @param {Object} metadata
   */
  SearchResults.prototype.render = function(results, metadata) {
    var i, result, label, html = '';

    this.offset = metadata.start || 0;
    this.searchTerm = metadata.search;
    console.log(metadata);
    for (i = 0; i < results.length; i++) {
      result = results[i];
      this._data[result.id] = result;
      label = result.name;
      if (result.container) {
        label += ', ' + result.container;
      }
      html += '<li><a href="" data-id="' + result.id + '">' + label + '</a></li>';
    }

    if (this.offset === 0) {
      this.list.html(html);
    } else {
      this.list.append(html);
    }

    if (metadata.totalResults > 10 && (this.offset + 10) < metadata.totalResults) {
      this.moreResults.addClass('ls-ui-comp-search_results-active');
    } else {
      this.moreResults.removeClass('ls-ui-comp-search_results-active');
    }

    this.emit('results', {
      searchTerm: this.searchTerm,
      offset: this.offset,
      totalResults: metadata.totalResults
    });
  };

  /**
   * Clear / empty the DOM components
   */
  SearchResults.prototype.clear = function() {
    this.moreResults.removeClass('ls-ui-comp-search_results-active');
    this.list.empty();
    this._data = {};
  };

  return SearchResults;
});
