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
    options.componentId = 'autocomplete';

    this._waitingForResults = false;
    this._searchSubmitted = false;
    this._timeoutId = undefined;

    this._highlightedSearchResultIndex = null;

    if (typeof options.api !== 'object') {
      throw new Error('AutoComplete requires an api option');
    }
    this._api = options.api;

    if (!options.element instanceof $) {
      throw new Error('AutoComplete requires an element option');
    }

    this.input = options.element;
    this.input.attr('autocomplete', 'off');
    this.searchResultsData = null;

    this.setComponentOptions(options);

    this.on('results', function(results) {
      self.renderSearchResults(results);
    });

    $.on(this.eventNamespaceBase + ':component:search:start', function() {
      self._searchSubmitted = true;
    });

    this.searchResults = $('<ul />').addClass('ls-ui-autocomplete-results');
    this.container.append(this.searchResults);

    this.searchResults.on('mouseover', 'li', function() {
      self.highlightSearchResultByIndex($(this).index(), false);
    }).on('mouseout', 'li', function() {
      $(this).removeClass('active');
    }).on('mousedown', 'li', function() {
      var location = self.searchResultsData[$(this).index()];
      self.emit('location', [location]);
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

    this.input.on('keyup', function(e) {
      var code = e.keyCode;
      if (code !== KEY_CODE.escape && code !== KEY_CODE.enter && code !== KEY_CODE.upArrow && code !== KEY_CODE.downArrow) {
        self.autoComplete();
      }
    });
  }

  AutoComplete.prototype = new Component();
  AutoComplete.prototype.constructor = AutoComplete;

  /**
   * Prepare a string for validation
   *
   * @param {String} searchTerm the string to prepare
   * @return {String} the prepared string
   */
  AutoComplete.prototype.prepareSearchTerm = function(searchTerm) {
    return String(searchTerm).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  /**
   * Validate a search term
   *
   * @param {String} searchTerm the string to validate
   * @return {Boolean} is the search term valid
   */
  AutoComplete.prototype.isValidSearchTerm = function(searchTerm) {

    var value;
    var hasRequiredLength;

    if ('string' !== typeof searchTerm) {
      return false;
    }

    value = this.prepareSearchTerm(searchTerm);
    hasRequiredLength = value.length >= minChars;

    return hasRequiredLength;
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
   * Perform an autoComplete request
   */
  AutoComplete.prototype.autoComplete = function() {

    var searchTerm = this.prepareSearchTerm(this.input.val());
    var self = this;

    if (this._waitingForResults || !this.isValidSearchTerm(searchTerm) || searchTerm.length < minChars) {
      return;
    }

    clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function() {

      if (true === self._searchSubmitted) {
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
            code: 'autocomplete.error.search',
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
  AutoComplete.prototype.renderSearchResults = function(results) {

    var self;
    var html = '';
    var i;
    var fullName = '';
    var location = {};

    self = this;
    self.searchResultsData = results;

    if (0 === results.length) {
      this.clear();
      return;
    }
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
      this.emit('location', [location]);
    }

    this.clear();
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
    var index;

    index = this._highlightedSearchResultIndex;

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
    this.searchResults.find('li.active').removeClass('active');

    if (updateInputValue) {
      this.input.val(this.currentSearchTerm);
    }

  };

  return AutoComplete;

});
