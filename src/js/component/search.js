/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  var wrapEl = function() {
    return $('<div />').addClass('ls-ui-container');
  };

  var form = function() {
    return $('<form />')
              .attr('method', 'post')
              .attr('action', '#')
              .addClass('ls-ui-form')
              .addClass('ls-ui-comp-search');
  };

  var input = function(translations) {
    return $('<input />')
            .attr('type', 'text')
            .attr('class', 'ls-ui-input')
            .attr('placeholder', translations.get('search.placeholder'));
  };

  var clear = function(translations) {
    return $('<a />')
            .attr('href', '#')
            .attr('class', 'ls-ui-input-clear')
            .text(translations.get('search.clear'));
  };

  var submit = function(translations) {
    return $('<input />')
              .attr('type', 'submit')
              .attr('class', 'ls-ui-submit')
              .attr('value', translations.get('search.submit'))
              .attr('title', translations.get('search.submit.title'));
  };

  /**
   * Search
   *
   * @param {Object} options
   * @constructor
   */
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
    self.hasInputLength = false;

    render(self.translations, self.container);

    self.input = self.container.find('input[type=text]')
      .on('keyup', function() {
        self.checkInput();
      });

    self.container.find('.ls-ui-input-clear')
      .on('click', function() {
        self.clear();
      });

    self.form  = self.container.find('form');

    self.form.on('submit', function(e) {
      e.preventDefault();
      self.search(self.input.val());
    });
    self.input.on('focus', function() {
      self.emit('focus');
    });

    self.container.find('input[type=submit]')
      .on('click', function() {
        self.form.trigger('submit');
        self.emit('focus');
      });
  }
  Search.prototype = new Component();
  Search.prototype.constructor = Search;

  /**
   * Clear the search input
   */
  Search.prototype.clear = function() {
    // @todo test this method
    this.input.val('');
    this.checkInput();
    this.emit('clear');
  };

  /**
   * Check the state of the input element.
   */
  Search.prototype.checkInput = function() {
    var value = this.input.val();
    if (0 < value.length) {
      if (false === this.hasInputLength) {
        this.hasInputLength = true;
        this.form.addClass('ls-ui-comp-search-with-term');
      }
    } else if (this.hasInputLength) {
      this.hasInputLength = false;
      this.form.removeClass('ls-ui-comp-search-with-term');
    }
  };

  /**
   * SearchResults.
   *
   * @param {String} searrchTerm
   * @return {undefined}
   */
  Search.prototype.search = function(searchTerm) {

    var self = this;

    searchTerm = (searchTerm || '').replace(/^\s+|\s+$/g, ''); 

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

        self.emit('error', [{
          code: 'search.error.search',
          message: 'There was an API error searching for ' + searchTerm
        }]);
      }
    });
  };

  /**
   * Renders component into the container element
   */
  var render = function(translations, container) {
    var inputEl  = input(translations);
    var submitEl = submit(translations);
    var clearEl = clear(translations);

    container.append(
      form().append(wrapEl().append(inputEl)).append(submitEl).append(clearEl)
    );
  };

  return Search;
});
