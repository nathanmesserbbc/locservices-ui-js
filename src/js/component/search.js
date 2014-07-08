/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  var form = $('<form />')
                .attr('method', 'post')
                .attr('action', '#')
                .addClass('ls-ui-form')
                .addClass('ls-ui-comp-search');

  var wrapEl = $('<div />').addClass('ls-ui-container');

  var input = function(translations) {
    return $('<input />')
            .attr('type', 'text')
            .attr('class', 'ls-ui-input')
            .attr('placeholder', translations.get('search.placeholder'));
  };

  var submit = function(translations) {
    return $('<input />')
              .attr('type', 'submit')
              .attr('class', 'ls-ui-submit')
              .attr('value', translations.get('search.submit'))
              .attr('title', translations.get('search.submit.title'));
  };

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
    self.isSearching = false;
    render(self.translations, self.container);

    self.input = self.container.find('input[type=text]');
    self.container.on('submit', function(e) {
      e.preventDefault();
      self.search(self.input.val());
    });
    self.input.on('focus', function() {
      self.emit('focus');
    });
  }
  Search.prototype = new Component();
  Search.prototype.constructor = Search;

  Search.prototype.search = function(searchTerm) {

    var self = this;

    searchTerm = (searchTerm || '').trim();

    if (!searchTerm || true === self.isSearching) {
      return;
    }
    self.emit('start', [searchTerm]);
    self.isSearching = true;

    self.api.search(searchTerm, {
      success: function(data) {
        self.emit('end');
        self.isSearching = false;
        self.emit('results', [data.results, data.metadata]);
      },
      error: function() {
        self.emit('end');
        self.isSearching = false;
        self.emit('error', ['Error searching for "' + searchTerm + '"']);
      }
    });
  };

  /**
   * Renders component into the container element
   */
  var render = function(translations, container) {
    var inputEl  = input(translations);
    var submitEl = submit(translations);

    container.append(form.append(wrapEl.append(inputEl)).append(submitEl));
  };

  return Search;
});
