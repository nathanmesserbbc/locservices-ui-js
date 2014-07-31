define([
  'jquery',
  'locservices/ui/component/component'
], function($, Component) {

  var KEY_CODE = {
    enter: 13,
    escape: 27,
    upArrow: 38,
    downArrow: 40
  };

  var minChars = 2;
  var inputDelay = 500;

  /**
   * AutoComplete.
   *
   * @param {Object} options
   * @constructor
   */
  function AutoComplete(options) {

    var self = this;

    options = options || {};
    options.componentId = 'auto_complete';

    if (typeof options.api !== 'object') {
      throw new Error('AutoComplete requires an api option');
    }
    if (!options.element instanceof $) {
      throw new Error('AutoComplete requires an element option');
    }

    self._waitingForResults = false;
    self._searchSubmitted = false;
    self._timeoutId = undefined;
    self._highlightedSearchResultIndex = null;
    self._api = options.api;
    self.input = options.element.attr('autocomplete', 'off');
    self.searchResultsData = null;
    self.currentSearchTerm = '';
    self.setComponentOptions(options);

    self.searchResults = $('<ul />').addClass('ls-ui-comp-auto_complete');
    self.container.append(self.searchResults);

    self.on('results', function(results) {
      self.render(results);
    });

    $.on(self.eventNamespaceBase + ':component:search:start', function() {
      self.currentSearchTerm = self.prepareSearchTerm(self.input.val());
      self._searchSubmitted = true;
    });

    self.input.on('keyup', function(e) {
      var code = e.keyCode;
      if (code !== KEY_CODE.escape && code !== KEY_CODE.enter && code !== KEY_CODE.upArrow && code !== KEY_CODE.downArrow) {
        self.autoComplete();
      }
    });

    self.searchResults.on('mouseover', 'li', function() {
      self.highlightSearchResultByIndex($(this).index(), false);
    });

    self.searchResults.on('mouseout', 'li', function() {
      $(this).removeClass('ls-ui-active');
    });

    self.searchResults.on('mousedown', 'li', function() {
      var location = self.searchResultsData[$(this).index()];
      self.emit('location', [location, self.currentSearchTerm]);
      self.clear();
    });

    $(document).on('keydown', function(event) {
      switch (event.keyCode) {

        case KEY_CODE.escape:
          self.escapeKeyHandler();
          break;

        case KEY_CODE.enter:
          self.enterKeyHandler(event);
          break;

        case KEY_CODE.upArrow:
          // preventDefault must be called to stop the input caret
          // from being positioned at the start of the input string
          event.preventDefault();
          self.highlightPrevSearchResult();
          break;

        case KEY_CODE.downArrow:
          self.highlightNextSearchResult();
          break;

        default:
          break;
      }
    });
  }

  AutoComplete.prototype = new Component();
  AutoComplete.prototype.constructor = AutoComplete;

  /**
   * Perform an autoComplete request
   */
  AutoComplete.prototype.autoComplete = function() {

    var self = this;
    var searchTerm = this.prepareSearchTerm(this.input.val());
    var isTooShort = searchTerm.length < minChars;

    if (this._waitingForResults || isTooShort) {
      if (isTooShort && self.currentSearchTerm) {
        self.clear();
        self.currentSearchTerm = '';
      }
      return;
    }

    clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function() {

      if (true === self._searchSubmitted || searchTerm === self.currentSearchTerm) {
        return;
      }
      self._waitingForResults = true;
      self.currentSearchTerm = searchTerm;

      self._api.autoComplete(searchTerm, {
        success: function(data) {
          self._waitingForResults = false;
          if (true === self._searchSubmitted) {
            return;
          }
          self.emit('results', [data.results, data.metadata]);
        },
        error: function() {
          if (true === self._searchSubmitted) {
            return;
          }
          self.emit('error', [{
            code: 'auto_complete.error.search',
            message: 'There was a problem searching for the search term'
          }]);
        }
      });
    }, inputDelay);

    this._searchSubmitted = false;
  };

  /**
   * Clear rendered search results from the DOM
   */
  AutoComplete.prototype.clear = function() {

    this.searchResultsData = null;
    this._highlightedSearchResultIndex = null;
    this.searchResults.empty();
    this.emit('clear');
  };

  /**
   * Render the response from an auto-complete json XHR as dom elements
   *
   * @param {Array} results the search results
   */
  AutoComplete.prototype.render = function(results) {

    if (0 === results.length) {
      this.clear();
      return;
    }
    var self;
    var html = '';
    var i;
    var fullName = '';
    var location = {};
    self = this;
    self.searchResultsData = results;
    self.emit('render');

    for (i = 0; i < results.length; i++) {
      location = results[i];
      fullName = location.name;
      if (location.container) {
        fullName += ', ' + location.container;
      }
      fullName = self.highlightTerm(fullName, this.currentSearchTerm);
      html += '<li><a href="#" data-index="' + i + '">' + fullName + '</a></li>';
    }
    this.searchResults.empty();
    this.searchResults.append(html);

    this.searchResults.find('li a').on('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  };

  /**
   * Handle an escape key event. Clear any displyaed results and reset the
   * input field text if required.
   */
  AutoComplete.prototype.escapeKeyHandler = function() {

    if (null !== this._highlightedSearchResultIndex) {
      this.input.val(this.currentSearchTerm);
    }
    this.clear();
  };

  /**
   * Handle an enter key event. If the user has selected an autocomplete
   * result then submit it.
   *
   * @param {Object} event the key event
   */
  AutoComplete.prototype.enterKeyHandler = function(event) {

    if (null !== this._highlightedSearchResultIndex) {
      event.preventDefault();
      var location = this.searchResultsData[this._highlightedSearchResultIndex];
      this.emit('location', [location, this.currentSearchTerm]);
    }
    this.clear();
  };

  /**
   * Prepare a string for validation
   *
   * @param {String} searchTerm the string to prepare
   * @return {String} the prepared string
   */
  AutoComplete.prototype.prepareSearchTerm = function(searchTerm) {
    if ('number' === typeof searchTerm) {
      searchTerm = String(searchTerm);
    } else if ('string' !== typeof searchTerm) {
      return '';
    }
    return searchTerm.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  /**
   * Highlights a string by wrapping the term in <strong> tags
   *
   * @param {String} str the string
   * @param {String} term the term to search for
   * @return {String}
   */
  AutoComplete.prototype.highlightTerm = function(str, term) {

    var re = new RegExp(term, 'i');
    var index = str.search(re);

    if (index >= 0) {
      return str.substr(0, index) + '<strong>' + str.substr(index, (index + term.length)) + '</strong>' + str.substr((index + term.length));
    }

    return str;
  };

  /**
   * Select the next search result.
   */
  AutoComplete.prototype.highlightNextSearchResult = function() {

    var index = this._highlightedSearchResultIndex;

    if (null === index) {
      index = 0;
    } else {
      index++;
      if (this.searchResultsData.length <= index) {
        this.removeSearchResultHighlight(true);
        return;
      }
    }

    this.highlightSearchResultByIndex(index, true);
  };

  /**
   * Select the previous search result.
   */
  AutoComplete.prototype.highlightPrevSearchResult = function() {

    var index = this._highlightedSearchResultIndex;

    if (null === index) {
      index = this.searchResultsData.length - 1;
    } else {
      index--;
      if (0 > index) {
        this.removeSearchResultHighlight(true);
        return;
      }
    }
    this.highlightSearchResultByIndex(index, true);
  };

  /**
   * Select a search result by index.
   *
   * @param {Number} index the index to select
   * @param {Boolean} updateInputValue should the input field value be set
   */
  AutoComplete.prototype.highlightSearchResultByIndex = function(index, updateInputValue) {

    var searchResult = this.searchResultsData[index];
    var fullName = searchResult.name;
    if (searchResult.container) {
      fullName += ', ' + searchResult.container;
    }

    this.removeSearchResultHighlight();
    this._highlightedSearchResultIndex = index;
    $(this.searchResults.find('li')[index]).addClass('ls-ui-active');

    if (updateInputValue) {
      this.input.val(fullName);
    }
  };

  /**
   * Remove any highlighted search result
   *
   * @param {Boolean} updateInputValue should the input field value be set
   */
  AutoComplete.prototype.removeSearchResultHighlight = function(updateInputValue) {

    this._highlightedSearchResultIndex = null;
    this.searchResults.find('li.ls-ui-active').removeClass('ls-ui-active');

    if (updateInputValue) {
      this.input.val(this.currentSearchTerm);
    }
  };

  return AutoComplete;

});
