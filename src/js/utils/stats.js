/*global define */
define(['jquery'], function($) {

  'use strict';

  /**
   * Stats.
   *
   * @param {EchoClient} echoClient a configured instance of an echo client
   * @constructor
   */
  function Stats(echoClient) {

    // require an echo client
    if (!echoClient || typeof echoClient !== 'object') {
      throw new Error('The stats module requires an instance of an EchoClient');
    }

    this.appName = 'locservices_ui';
    this._actionName = 'locservicesui';

    this._echo = echoClient;
    this._ns = 'locservices:ui';

    this._bindUIEvents();
  }

  /**
   * Bind event handlers to all the ui component events
   */
  Stats.prototype._bindUIEvents = function() {

    var self = this;

    $.on(this._ns + ':component:geolocation:location', function(location) {
      self.logActionEvent('location', {
        locationId: location.id
      });
    });

  };

  /**
   * Log an event via the echo client
   *
   * @param {String} actionType The event action type
   * @param {Object} labels     The event labels
   */
  Stats.prototype.logActionEvent = function(actionType, labels) {

    this._echo.userActionEvent(
      actionType,
      this._actionName,
      labels || {}
    );

  };

  return Stats;
});
