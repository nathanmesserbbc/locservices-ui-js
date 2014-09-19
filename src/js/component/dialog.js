/*global define */

define([
  'jquery',
  'locservices/ui/component/component'
], function($, Component) {

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
    dialog: function(messageText, confirmLabel, cancelLabel, ariaIdPrefix) {
      var ariaIdLabel = ariaIdPrefix + '-dialog-label';
      var div = $('<div/>')
        .attr('role', 'dialog')
        .attr('aria-labelledby', ariaIdLabel)
        .addClass('ls-ui-comp-dialog');
      var message = $('<p/>')
        .attr('id', ariaIdLabel)
        .html(messageText);
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
    this.setComponentOptions(options);

    this.confirmLabel = options.confirmLabel || 'Confirm';
    this.cancelLabel = options.cancelLabel || 'Cancel';

    var handleClick = function(callback) {
      self.remove();
      if ('function' === typeof callback) {
        callback();
      }
    };

    this.container.append(
      templates.dialog(
        options.message,
        this.confirmLabel,
        this.cancelLabel,
        this.eventNamespaceBase
      )
    );

    this.container
      .find('.ls-ui-comp-dialog-confirm button')
      .on('click', function() {
        handleClick(options.confirm);
      })
      .focus();

    // Setting focus to the confirm button is not be enough to make the dialog
    // visible in the viewport on iOS if a location was chosen from a long
    // list of search results.
    this.container.get(0).scrollIntoView();

    this.container
      .find('.ls-ui-comp-dialog-cancel button')
      .on('click', function() {
        handleClick(options.cancel);
      });
  }

  Dialog.prototype = new Component();
  Dialog.prototype.constructor = Dialog;

  /**
   * Clear the message element
   */
  Dialog.prototype.remove = function() {
    // @todo test this
    this.container.find('.ls-ui-comp-dialog').remove();
  };

  return Dialog;
});
