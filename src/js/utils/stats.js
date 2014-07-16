/*global define */
define(['jquery'], function($) {

  'use strict';

  /**
   * Log an action event.
   *
   * @see http://bbc-data.github.io/data-client-js/versions/v2.0.0/EchoClient-EchoClient.html
   * for info on its interface
   *
   * @param {EchoClient} echoClient a configured instance of the Echo Client
   * @param {String} actionType the action type
   * @param {Object} labels additional labels passed for stats
   */
  function logActionEvent(echoClient, actionType, labels) {
    echoClient.userActionEvent(actionType, 'locservicesui', labels || {});
  }

  /**
   * Stats.
   *
   * @param {EchoClient} echoClient a configured instance of an echo client
   * @param {Object} options additional options
   * @constructor
   */
  function Stats(echoClient, options) {

    options = options || {};
    options.namespace = options.namespace || 'locservices:ui';

    // require an echo client
    if (!echoClient || typeof echoClient !== 'object') {
      throw new Error('The stats module requires an instance of an EchoClient');
    }

    this._echoClient = echoClient;
    this._registeredNamespaces = {};

    this.registerNamespace(options.namespace);
  }

  /**
   * Register a namespace. By registering a namespace, event listeners for all
   * UI events will be registered using it.
   *
   * @param {String} ns
   * @returns {Boolean} whether the namespace has been registered
   */
  Stats.prototype.registerNamespace = function(ns) {

    var echoClient = this._echoClient;

    // prevent duplicating event binding
    if (this._registeredNamespaces[ns] === true) {
      return false;
    }

    $.on(ns + ':component:geolocation:location', function(location) {
      logActionEvent(echoClient, 'geolocation_location', {
        locationId: location.id
      });
    });

    $.on(ns + ':component:geolocation:error', function(err) {
      if (err.code === 'geolocation.error.browser.permission') {
        logActionEvent(echoClient, 'geolocation_denied');
      }
    });

    $.on(ns + ':component:geolocation:click', function() {
      logActionEvent(echoClient, 'geolocation_click');
    });

    $.on(ns + ':component:auto_complete:location', function(location, searchTerm) {
      logActionEvent(echoClient, 'auto_complete_location', {
        locationId: location.id,
        searchTerm: searchTerm,
        searchTermLength: searchTerm.length
      });
    });

    this._registeredNamespaces[ns] = true;

    return true;
  };

  return Stats;

});
