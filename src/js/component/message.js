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

    self.on('error', function(error) {
      if (typeof error === 'object') {
        self.set(self.translations.get(error.code));
        return;
      }
      self.set(error);
    });

    $.on(self.eventNamespaceBase + ':component:search:end', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:search_results:location', function() {
      self.clear();
    });

    $.on(self.eventNamespaceBase + ':component:search:results', function(metadata) {
      self.set('Search results for: "' + metadata.search + '"');
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
