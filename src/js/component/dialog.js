/*global define */

define(['jquery'], function($) {

  'use strict';

  var templates = {

    /**
     * Template for a dialog
     *
     * @param {String} messageText
     * @param {String} confirmLabel
     * @param {String} cancelLabel
     * @return {Object}
     */
    dialog: function(messageText, confirmLabel, cancelLabel) {
      var div = $('<div/>')
        .addClass('ls-ui-comp-dialog');
      var message = $('<p/>').text(messageText);
      var buttons = $('<div/>').addClass('ls-ui-comp-dialog-buttons');
      buttons.append(
        templates.button(
          confirmLabel,
          'ls-ui-comp-dialog-confirm'
        )
      );
      buttons.append(
        templates.button(
          cancelLabel,
          'ls-ui-comp-dialog-cancel'
        )
      );
      div.append(message).append(buttons);
      return div;
    },

    /**
     * Template for a button
     *
     * @param {String} label
     * @param {String} cssClass
     * @return {Object}
     */
    button: function(label, cssClass) {
      var element = $('<span/>').append($('<button/>'));
      if (cssClass) {
        element.addClass(cssClass);
      }
      element.find('button').text(label);
      return element;
    }

  };

  /**
   * Render a dialog
   *
   * @param {Object} options
   */
  function Dialog(options) {
    var self = this;
    options = options || {};
    this.container = options.container; 
    this.confirmLabel = options.confirmLabel || 'Confirm';
    this.cancelLabel = options.cancelLabel || 'Cancel';

    var handleClick = function(callback) {
      self.container.find('.ls-ui-comp-dialog').remove();
      if ('function' === typeof callback) {
        callback();
      }
    };
    this.container.append(
      templates.dialog(
        options.message,
        this.confirmLabel,
        this.cancelLabel
      )
    );
    this.container
      .find('.ls-ui-comp-dialog-confirm button')
      .on('click', function() {
        handleClick(options.confirm);
      });
    this.container
      .find('.ls-ui-comp-dialog-cancel button')
      .on('click', function() {
        handleClick(options.cancel);
      });
  }

  return Dialog;
});
