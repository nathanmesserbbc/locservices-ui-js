define([
  'jquery',
  'locservices/ui/component/component'
], function($, Component) {

  /**
   * AutoComplete.
   *
   * @param {Object} options
   * @constructor
   */
  function AutoComplete(options) {

    options = options || {};
    options.componentId = 'autocomplete';

    this._inputDelay = options.inputDelay || 120;
    this._minChars = options.minChar || 2;

    if (!options.element instanceof $) {
      throw new Error('AutoComplete requires an element option');
    }

    this.input = options.element;
    this.input.attr('autocomplete', 'off');

    if (!options.api) {
      throw new Error('AutoComplete requires an api option');
    }

    // autocomplete results get appended to the body
    options.container = $('body');

    this.setComponentOptions(options);
  }

  AutoComplete.prototype = new Component();
  AutoComplete.prototype.constructor = AutoComplete;

  /**
   * Clear the results from the page.
   */
  AutoComplete.prototype.clearResults = function() {
    this.container.html('');
  };

  return AutoComplete;

});
