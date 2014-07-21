/*global define */
define([
  'jquery',
  'locservices/core/geolocation',
  'locservices/core/recent_locations',
  'locservices/core/cookies',
  'locservices/core/bbc_cookies',
  'locservices/core/preferred_location'
], function($, geolocation, RecentLocations, Cookies, BBCCookies, PreferredLocation) {

  'use strict';

  /**
   * Log an action event.
   *
   * @see http://bbc-data.github.io/data-client-js/versions/v2.0.0/EchoClient-EchoClient.html
   * for info on its interface
   *
   * @param {EchoClient} echoClient a configured instance of the Echo Client
   * @param {String} actionType the action type
   * @param {Object} [labels] additional labels passed for stats
   */
  function logActionEvent(echoClient, actionType, labels) {
    echoClient.userActionEvent(actionType, 'locservicesui', labels || {});
  }

  // ensures we only log capabilities once when the module is used for the
  // first time.
  var hasLoggedCapabilities = false;

  var recentLocations = new RecentLocations();

  var caps = {
    'capability_geolocation': geolocation.isSupported,
    'capability_recent_locations': recentLocations.isSupported(),
    'capability_local_storage': (typeof window.localStorage === 'object' && window.localStorage.getItem),
    'capability_cookies_enabled': (new Cookies()).isSupported(),
    'capability_bbccookies_preference_enabled': (new BBCCookies()).isPersonalisationDisabled(),
    'has_locserv_cookie': (new PreferredLocation()).isSet(),
    'has_recent_locations': recentLocations.isSupported() && recentLocations.all().length > 0,
    'recent_locations_total': recentLocations.isSupported() ? recentLocations.all().length : 0
  };

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

    if (!hasLoggedCapabilities) {
      logActionEvent(echoClient, 'locservices_user', caps);
      hasLoggedCapabilities = true;
    }

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

    $.on(ns + ':error', function(err) {
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

    $.on(ns + ':component:user_locations:location', function(location) {
      var actionType = 'user_locations_location_select';
      if (location.isPreferred === true) {
        actionType = 'user_locations_location_main_select';
      }
      logActionEvent(echoClient, actionType, { locationId: location.id });
    });

    $.on(ns + ':component:user_locations:make_main', function(locationId) {
      logActionEvent(echoClient, 'user_locations_location_make_main', {
        locationId: locationId
      });
    });

    $.on(ns + ':component:user_locations:location_remove', function(locationId) {
      logActionEvent(echoClient, 'user_locations_location_remove', {
        locationId: locationId
      });
    });

    $.on(ns + ':component:user_locations:location_add', function(location) {
      logActionEvent(echoClient, 'user_locations_location_add', {
        locationId: location.id
      });
    });

    $.on(ns + ':component:search_results:results', function(metadata) {
      if (metadata.totalResults === 0) {
        logActionEvent(echoClient, 'search_no_results');
      }
    });

    $.on(ns + ':component:search_results:location', function(locationId, offset) {
      logActionEvent(echoClient, 'search_results_location', {
        locationId: locationId,
        offset: offset
      });
    });

    this._registeredNamespaces[ns] = true;

    return true;
  };

  return Stats;

});
