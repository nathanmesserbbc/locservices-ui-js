/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  var button = function(translations) {
    return $('<button />')
              .addClass('ls-ui-comp-close_button')
              .text(translations.get('close_button.label'));
  };

  function CloseButton(options) {
    var self = this;
    options = options || {};
    options.componentId = 'close_button';

    self.setComponentOptions(options);
    self.button = button(self.translations);
    self.container.append(self.button);

    self.button.on('click', function(e) {
      e.preventDefault();
      self.emit('clicked');
    });
  }
  CloseButton.prototype = new Component();
  CloseButton.prototype.constructor = CloseButton;

  return CloseButton;
});
