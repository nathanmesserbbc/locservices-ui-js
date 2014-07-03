/*global define */

define(['jquery'], function($) {

  'use strict';

  function Component() {}

  Component.prototype.setComponentOptions = function(options) {

    options = options || {};

    if (undefined === options.translations) {
      throw new Error('Component requires a translations parameter.');
    } else {
      this.translations = options.translations;
    }

    if (undefined === options.container) {
      throw new Error('Component requires container parameter.');
    } else {
      this.container = options.container;
    }

    this.componentId = options.componentId || 'component';

    this.eventNamespaceBase = 'locservices:ui';
    if (options.eventNamespace) {
      this.eventNamespaceBase = options.eventNamespace;
    }
    this.eventNamespace = this.eventNamespaceBase + ':component:' + this.componentId;

  };

  /**
   * Emit an event.
   *
   * @param {String} eventName
   * @param {Array} args
   */
  Component.prototype.emit = function(eventName, args) {

    args = args || [];

    var ns = this.eventNamespace;
    if (eventName === 'error') {
      ns = this.eventNamespaceBase;
    }
    $.emit(ns + ':' + eventName, args);
  };

  /**
   * Listen for an event.
   *
   * @param {String} eventName
   * @param {Function} callback
   */
  Component.prototype.on = function(eventName, callback) {

    var ns = this.eventNamespace;
    if (eventName === 'error') {
      ns = this.eventNamespaceBase;
    }

    $.on(ns + ':' + eventName, callback);
  };

  return Component;
});
