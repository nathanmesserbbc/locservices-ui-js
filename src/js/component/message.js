/*global define */

define(['jquery', 'locservices/ui/component/component'], function($, Component) {

  'use strict';

  /**
   * Message constructor
   *
   * @param {Object} options
   */
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

    $.on(self.eventNamespaceBase + ':component:search_results:results', function(metadata) {
      if (metadata.totalResults === 0) {
        self.set(self.translations.get('message.no_results') + '"' + metadata.search + '"');
        return;
      }
      var current = metadata.offset + 10;
      current = current > metadata.totalResults ? metadata.totalResults : current;
      self.set(self.translations.get('message.showing') + current + self.translations.get('message.of') + metadata.totalResults);
    });

    $.on(self.eventNamespaceBase + ':component:geolocation:end', function() {
      self.clear();
    });

    $.on(this.eventNamespaceBase + ':component:auto_complete:render', function() {
      self.clear();
    });
  }
  Message.prototype = new Component();
  Message.prototype.constructor = Message;

  /**
   * Clear the message element
   */
  Message.prototype.clear = function() {
    this.element.removeClass('ls-ui-active');
    this.element.text('');
  };

  /**
   * Set the displayed message
   *
   * @param {String} value
   * @return {Boolean} was the message set
   */
  Message.prototype.set = function(value) {
    if ('string' === typeof value) {
      this.element.addClass('ls-ui-active');
      this.element.text(value);
      return true;
    }
    return false;
  };

  /**
   * Render message element into a container
   *
   * @param {Object} container
   */
  var render = function(container) {
    var comp = $('<div / >').addClass('ls-ui-comp-message');
    container.append(comp.append($('<p />')));
  };

  return Message;
});
