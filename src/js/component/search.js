/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  /**
   * @var jQuery
   */
  var form = $('<form />').attr('method', 'post'). attr('action', '#');

  /**
   * Returns submit button
   *
   * @param En translation
   * @return jQuery
   */
  var input = function(translations) {
    return $('<input />')
            .attr('type', 'text')
            .attr('class', 'ls-search-input')
            .attr('placeholder', translations.get('search.placeholder'));
  };

  /**
   * Returns submit button
   *
   * @param En translation
   * @return jQuery
   */
  var submit = function(translations) {
    return $('<input />')
              .attr('type', 'submit')
              .attr('class', 'ls-search-submut')
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
    $.emit(this.eventNamespace + ':start', [searchTerm]);

    this.api.search(searchTerm, {
      params: {},
      success: function(data) {
        $.emit(this.eventNamespace + ':end');
        data.metadata.startOffset = startOffset;
        data.metadata.searchTerm = searchTerm;
        $.emit(this.eventNamespace + ':results', [data.results, data.metadata]);
      },
      error: function() {
        $.emit(this.eventNamespace + ':end');
        $.emit(this.eventNamespace + ':error', ['Error searching for "' + searchTerm + '"']);
      }
    });
  };

  /**
   * Renders component into the container element
   */
  var render = function(translations, container) {
    var inputEl  = input(translations);
    var submitEl = submit(translations);
    container.html(form.append(inputEl).append(submitEl));
  };

  return Search;
});
