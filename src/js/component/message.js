/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  function Message(options) {
    var self = this;
    options = options || {};
    options.componentId = 'message';

    this.setComponentOptions(options);

    $.on(self.eventNamespaceBase + ':error', function(message) {
      self.set(message);
    });

    $.on(self.eventNamespace + ':end', function() {
      self.clear();
    });
  }
  Message.prototype = new Component();
  Message.prototype.constructor = Message;

  Message.prototype.clear = function() {
    this.container.removeClass('active');
    this.container.text('');
  };

  Message.prototype.set = function(value) {
    this.container.addClass('active');
    this.container.text(value);
  };

  return Message;
});
