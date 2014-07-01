/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  function SearchResults(options) {
    var self = this;
    options = options || {};
    options.componentId = 'search-results';

    self.setComponentOptions(options);

    $.on('locservices:ui:component:search:results', function(metadata, results) {
      if (metadata.totalResults === 1) {
        $.emit('locservices:ui:component:search-results:location', [results[0].id]);
        return;
      }
      self.render(metadata, results);
    });

    self.setup();
  }
  SearchResults.prototype = new Component();
  SearchResults.prototype.constructor = SearchResults;

  SearchResults.prototype.setup = function() {
    var html = '<h2>Search results</h2>' +
                '<ul></ul>' +
                '<a href="" class="ls-ui-comp-search-results-more">Show more results.</a>';
    this.container.append(html);

    this.moreResults = this.container.find('ls-ui-comp-search-results-more');
    this.header      = this.container.find('h2');
    this.list        = this.container.find('ul');
    var self = this;
    this.list.on('click', function(evt) {
      var locationId;
      evt.preventDefault();
      locationId = $(evt.target).attr('href').split('=')[1];
      $.emit('locservices:ui:component:search-results:location', [locationId]);
      self.clear();
    });
  };

  SearchResults.prototype.render = function(metadata, results) {
    var i, result, label, html;

    for (i = 0; i < results.length; i++) {
      result = results[i];
      label = result.name;
      if (result.container) {
        label += ', ' + result.container;
      }
      html += '<li><a href="?location_id=' + result.id + '">' + label + '</a></li>';
    }

    if (0 === metadata.startOffset) {
      this.list.html(html);
    } else {
      this.list.append(html);
    }

    if (10 < metadata.totalResults) {
      this.moreResults.addClass('active');
    } else {
      this.moreResults.removeClass('active');
    }

    this.container.append(html);
  };

  return SearchResults;
});
