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
    options.componentId = 'search-results';

    if (undefined === options.api) {
      throw new Error('SearchResults requires api parameter');
    } else {
      self.api = options.api;
    }
    self.setComponentOptions(options);
    $.on('locservices:ui:component:search:results', function(metadata, results) {
      if (metadata.totalResults === 1) {
        self.emit('location', [results[0].id]);
        return;
      }
      self.render(metadata, results);
    });

    self.setup();
  }
  SearchResults.prototype = new Component();
  SearchResults.prototype.constructor = SearchResults;

  /**
   * Setup the DOM
   */
  SearchResults.prototype.setup = function() {
    var html = '<div class="li-ui-comp-search-results-container"><h2>Search results</h2>' +
                '<ul></ul>' +
                '<a href="" class="ls-ui-comp-search-results-more">Show more results.</a></div>';
    this.container.append(html);

    this.moreResults = this.container.find('.ls-ui-comp-search-results-more');
    this.title       = this.container.find('h2');
    this.list        = this.container.find('ul');

    var self = this;
    this.list.on('click', function(evt) {
      var locationId;
      evt.preventDefault();
      locationId = $(evt.target).data('id');
      self.emit('location', [locationId]);
      self.clear();
      return false;
    });

    this.moreResults.on('click', function(evt) {
      evt.preventDefault();
      self.api.search(self.searchTerm, {
        start: self.offset + 10,
        success: function(resp) {
          self.render(resp.metadata, resp.results);
        }
      });
      return false;
    });

  };

  /**
   * Render some search results.
   *
   * @param {Object} metadata
   * @param {Array} results
   */
  SearchResults.prototype.render = function(metadata, results) {
    var i, result, label, html = '';

    this.offset = metadata.start || 0;
    this.searchTerm = metadata.search;

    for (i = 0; i < results.length; i++) {
      result = results[i];
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
      this.moreResults.addClass('active');
    } else {
      this.moreResults.removeClass('active');
    }

    this.title.text('Search results for: ' + this.searchTerm);
  };

  /**
   * Clear / empty the DOM components
   */
  SearchResults.prototype.clear = function() {
    this.moreResults.removeClass('active');
    this.title.text('');
    this.list.empty();
  };

  return SearchResults;
});
