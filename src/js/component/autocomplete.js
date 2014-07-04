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
    this._timeoutId = null;
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

    if (!options.api) {
      throw new Error('AutoComplete requires an api option');
    }

    this.setComponentOptions(options);

    this.on('results', function(results, metadata) {
      self.renderSearchResults(results, metadata);
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
          self.autoComplete();
      }
    });
  }

  AutoComplete.prototype = new Component();
  AutoComplete.prototype.constructor = AutoComplete;

  /**
   * Prepare a string for validation
   *
   * @param {string} searchTerm the string to prepare
   * @return {string} the prepared string
   */
  AutoComplete.prototype.prepareSearchTerm = function(searchTerm) {
    return String(searchTerm).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  };

  /**
   * Validate a search term
   *
   * @param {string} searchTerm the string to validate
   * @return {boolean} is the search term valid
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
   * Perform an autoComplete request
   */
  AutoComplete.prototype.autoComplete = function() {

    var searchTerm = this.prepareSearchTerm(this.input.val());
    var self = this;

    if (this._waitingForResults || !this.isValidSearchTerm(searchTerm) || searchTerm.length <= minChars) {
      return;
    }

    clearTimeout(this._timeoutId);

    this._timeoutId = setTimeout(function() {

      self._waitingForResults = true;

      self._api.autoComplete(searchTerm, {
        success: function(data) {
          self._waitingForResults = false;
          self.emit('results', [data.results, data.metadata]);
        },
        error: function() {
          self.emit('error', [{
            code: 'autocomplete.error.search',
            message: 'There was a problem searching for the search term'
          }]);
        }
      });
    }, inputDelay);

  };

  /**
   * Clear rendered search results from the DOM
   */
  AutoComplete.prototype.clearSearchResults = function() {

    this.searchResultsData = null;
    this._highlightedSearchResultIndex = null;

    if (this.searchResults) {
      this.searchResults.remove();
      this.searchResults = null;
    }
  };

  /**
   * Render the response from an auto-complete json XHR as dom elements
   *
   * @param {Array} results the search results
   */
  AutoComplete.prototype.renderSearchResults = function(results) {

    var self;
    var html = '';
    var searchResultIndex;
    var noOfSearchResults;
    var fullName = '';
    var location = {};

    self = this;
    this.searchResultsData = results;
    noOfSearchResults = results.length;

    if (0 === noOfSearchResults) {
      this.clearSearchResults();
      return;
    }

    if (!this.searchResults) {
      this.container.append('<ul class="ls-ui-autocomplete-results" />');
      this.searchResults = this.container.find('.ls-ui-autocomplete-results');

      this.searchResults.on('mouseover', 'li', function() {
        self.highlightSearchResultByIndex($(this).index(), false);
      }).on('mouseout', 'li', function() {
        $(this).removeClass('active');
      });

      this.positionSearchResults();
//      this.addSearchResultClickListener();
//      self.addSearchResultKeyHandler();
    }

    for (searchResultIndex = 0; searchResultIndex < noOfSearchResults; searchResultIndex++) {
      location = results[searchResultIndex];
      fullName = location.name;
      if (location.container) {
        fullName += ', ' + location.container;
      }
      html += '<li><a href="#" data-location="' + location.id + '">' + fullName + '</a></li>';
    }

    this.searchResults.html(html);
  };

  /**
   * Position the search result dom element adjacent to the input field
   */
  AutoComplete.prototype.positionSearchResults = function() {

    var inputOffset = this.input.offset();

    this.searchResults.css({
      left : parseInt(inputOffset.left, 0),
      top : parseInt(inputOffset.top, 0) + this.input.outerHeight(),
      width: parseInt(this.input.outerWidth(), 0)
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

    this.clearSearchResults();
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

    this.clearSearchResults();
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
   * Clear the results from the page.
   */
  AutoComplete.prototype.clearResults = function() {
    this.container.html('');
  };

  /**
   * Select a search result by index.
   *
   * @param {int} index the index to select
   * @param {boolean} updateInputValue should the input field value be set
   */
  AutoComplete.prototype.highlightSearchResultByIndex = function(index, updateInputValue) {

    var searchResult = this.searchResultsData[index];
    var fullName = searchResult.name;
    if (searchResult.container) {
      fullName += ', ' + searchResult.container;
    }

    this.removeSearchResultHighlight();
    this._highlightedSearchResultIndex = index;
    $(this.searchResults.find('li')[index]).addClass('active');

    if (updateInputValue) {
      this.input.val(fullName);
    }
  };

  /**
   * Remove any highlighted search result
   *
   * @param {boolean} updateInputValue should the input field value be set
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
