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

    $.on(self.eventNamespaceBase + ':component:search:start', function(value) {
      self.set('Searching for "' +value +'"');
    });

    $.on(self.eventNamespaceBase + ':component:search:end', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:geolocation:start', function(value) {
      self.set(self.translations.get('message.geolocation.detect'));
    });

    $.on(self.eventNamespaceBase + ':component:geolocation:end', function() {
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
