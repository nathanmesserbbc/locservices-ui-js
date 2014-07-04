/*global define */

define(['jquery', 'echo'], function($, Echo) {

  'use strict';

  function Stats() {

    this.appName = 'locservices_ui';
    this.actionName = 'locservicesui';

    /*
     * @todo Should we allow a configured echo client to be passed in?
     */

    var echoConfig = {};
    echoConfig[Echo.ConfigKeys.COMSCORE.URL] = 'http://data.bbc.co.uk/v1/analytics-echo-chamber-inbound/comscore';

    // configure ?
    Echo.Debug.enable();

    this.echoClient = new Echo.EchoClient(
      this.appName,
      Echo.Enums.ApplicationType.WEB,
      echoConfig
    );

    // do we need this ?
    //echo.optOutOfCookies();

    this.registerEventNamespace('locservices:ui');
  }

  /**
   * Log an event via the echo client
   *
   * @param {String} actionType The event action type
   * @param {String} labels     The event labels
   */
  Stats.prototype.logActionEvent = function(actionType, labels) {

    this.echoClient.userActionEvent(
      actionType,
      this.actionName,
      labels
    );

  };

  /**
   * Register an event namespace
   *
   * @param {String} eventNamespace The namespace to register
   */
  Stats.prototype.registerEventNamespace = function(eventNamespace) {

    //var self = this;

    $.on(eventNamespace + ':component:geolocation:location', function(location) {
      console.log('GEOLOCAITON', location);
      //self.logActionEvent('geo_location', {
      //});
    });

  };

  return Stats;
});
