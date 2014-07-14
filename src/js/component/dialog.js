/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  var templates = {

    /**
     * Template for a dialog
     *
     * @param {Object} translations
     * @param {String} messageText
     * @return {Object}
     */
    dialog: function(translations, messageText) {
      var div = $('<div/>')
        .addClass('ls-ui-comp-dialog');
      var message = $('<p/>').text(messageText);
      var buttons = $('<div/>').addClass('ls-ui-comp-dialog-buttons');
      buttons.append(
        templates.button(
          translations.get('dialog.confirm'),
          'ls-ui-comp-dialog-confirm'
        )
      );
      buttons.append(
        templates.button(
          translations.get('dialog.cancel'),
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

  function Dialog(options) {
    var self = this;
    options = options || {};
    options.componentId = 'dialog';

    self.setComponentOptions(options);
  }
  Dialog.prototype = new Component();
  Dialog.prototype.constructor = Dialog;

  /**
   * Render a dialog
   *
   * @param {Object} element
   * @param {String} message
   * @param {Function} confirmCallback
   * @param {Function} cancelCallback
   */
  Dialog.prototype.render = function(element, message, confirmCallback, cancelCallback) {
    var handleClick = function(callback) {
      element.find('.ls-ui-comp-dialog').remove();
      if ('function' === typeof callback) {
        callback();
      }
    };
    element.append(
      templates.dialog(
        this.translations,
        message
      )
    );
    element
      .find('.ls-ui-comp-dialog-confirm button')
      .on('click', function() {
        handleClick(confirmCallback);
      });
    element
      .find('.ls-ui-comp-dialog-cancel button')
      .on('click', function() {
        handleClick(cancelCallback);
      });
  };

  return Dialog;
});
