/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  function Message(options) {
    var self = this;
    options = options || {};
    options.componentId = 'message';

    self.setComponentOptions(options);
    render(self.container);
    self.element = self.container.find('p');

    self.on('error', function(message) {
      self.set(message);
    });

    $.on(self.eventNamespaceBase + ':component:search:start', function(value) {
      self.set('Searching for "' + value + '"');
    });

    $.on(self.eventNamespaceBase + ':component:search:end', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:search-results:location', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:search:results', function(metadata) {
      self.set('Search results for: "' + metadata.search + '"');
    });

    $.on(self.eventNamespaceBase + ':component:geolocation:start', function() {
      self.set(self.translations.get('message.geolocation.detect'));
    });

    $.on(self.eventNamespaceBase + ':component:geolocation:end', function() {
      self.clear();
    });
  }
  Message.prototype = new Component();
  Message.prototype.constructor = Message;

  Message.prototype.clear = function() {
    this.element.removeClass('ls-ui-active');
    this.element.text('');
  };

  Message.prototype.set = function(value) {
    this.element.addClass('ls-ui-active');
    this.element.text(value);
  };

  var render = function(container) {
    container.addClass('ls-ui-message')
             .append($('<p />'));
  };

  return Message;
});
