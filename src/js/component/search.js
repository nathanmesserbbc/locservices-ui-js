/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  var form = $('<form />')
                .attr('method', 'post')
                .attr('action', '#')
                .addClass('ls-ui-form');

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
              .attr('value', translations.get('search.submit'));
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
    render(self.translations, self.container);
    self.input = self.container.find('input[type=text]');

    self.container.on('submit', function(e) {
      e.preventDefault();
      self.search(self.input.val());
    });
  }
  Search.prototype = new Component();
  Search.prototype.constructor = Search;

  Search.prototype.search = function(searchTerm, startOffset) {

    if (undefined === searchTerm || 0 === searchTerm.length) {
      return;
    }
    var self = this;
    $.emit(self.eventNamespace + ':start', [searchTerm]);

    self.api.search(searchTerm, {
      params: {},
      success: function(data) {
        $.emit(self.eventNamespace + ':end');
        data.metadata.startOffset = 0;
        data.metadata.searchTerm = searchTerm;
        $.emit(self.eventNamespace + ':results', [data.results, data.metadata]);
      },
      error: function() {
        $.emit(self.eventNamespace + ':end');
        $.emit(self.eventNamespace + ':error', ['Error searching for "' + searchTerm + '"']);
      }
    });
  };

  /**
   * Renders component into the container element
   */
  var render = function(translations, container) {
    var inputEl  = input(translations);
    var submitEl = submit(translations);

    container.html(
      form.append(
        $('<div />').addClass('ls-ui-col').append(inputEl)
      ).append(
        $('<div />').addClass('ls-ui-col').append(submitEl)
      )
    ).addClass('ls-ui-comp-search');
  };

  return Search;
});
