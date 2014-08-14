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

    $.on(self.eventNamespaceBase + ':component:search:clear', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:search:start', function() {
      self.clear();
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

    this.element = $('<div />').addClass('ls-ui-comp-search_results');

    this.list = $('<ul />');
    this.moreResults = $('<button />')
                          .addClass('ls-ui-comp-search_results-more')
                          .text(this.translations.get('search_results.more'));

    this.element.append(this.list).append(this.moreResults);
    this.container.append(this.element);

    var self = this;
    this.list.on('click', function(evt) {
      var locationId, offset;
      evt.preventDefault();
      locationId = $(evt.target).data('id');
      offset = $(evt.target).data('offset');
      self.emit('location', [self._data[locationId], offset]);
      self.clear();
      return false;
    });

    var waitingForSearchResults = false;

    this.moreResults.on('click', function(evt) {
      evt.preventDefault();

      if (waitingForSearchResults === true) {
        return;
      }

      waitingForSearchResults = true;

      // @todo handle API error
      self.api.search(self.searchTerm, {
        start: self.offset + 10,
        success: function(resp) {
          self.render(resp.results, resp.metadata);
          waitingForSearchResults = false;
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
    var i, noOfResults, result, label, html = '';
    noOfResults = results.length;

    this.offset = metadata.start || 0;
    this.searchTerm = metadata.search;

    if (0 === noOfResults) {

      this.element.removeClass('ls-ui-comp-search_results-with_results');

    } else {

      this.element.addClass('ls-ui-comp-search_results-with_results');

      for (i = 0; i < noOfResults; i++) {
        result = results[i];
        this._data[result.id] = result;
        label = result.name;
        if (result.container) {
          label += ', ' + result.container;
        }
        html += '<li><a href="" data-id="' + result.id + '" data-offset="' + this.offset + '">' + label + '</a></li>';
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

      // @todo test this
      if (0 < this.offset) {
        this.list.find('li:nth-child(' + (this.offset + 1) + ') a').focus();
      }

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
