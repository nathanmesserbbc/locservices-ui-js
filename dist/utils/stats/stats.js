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

  /**
   * Takes a location object and build up the labels.
   *
   * @param {Object} location
   * @returns {Object}
   */
  function getLabelsForLocation(location) {

    var labels = {};

    if (typeof location !== 'object') {
      return labels;
    }

    labels.locationId = location.id;
    labels.locationPlaceType = location.placeType;
    labels.locationCountry = location.country;
    labels.locationName = location.name;

    if (location.container) {
      labels.locationName += ', ' + location.container;
    }

    if (recentLocationsIsSupported) {
      labels.addedToRecentLocations = true;
    }
    return labels;
  }

  // ensures we only log capabilities once when the module is used for the
  // first time.
  var hasLoggedCapabilities = false;

  var preferredLocation = new PreferredLocation();
  var hasLocservCookie = preferredLocation.isSet();
  var locservCookie = preferredLocation.get();
  var recentLocations = new RecentLocations();
  var recentLocationsIsSupported = recentLocations.isSupported();
  var allRecentLocations = recentLocationsIsSupported ? recentLocations.all() : [];
  var hasLocalStorage = (function() {
    var key = 'bbc-locservices-ui-js';
    try {
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      return true;
    } catch (Error) {
      return false;
    }
  })();

  var caps = {
    'capability_geolocation': geolocation.isSupported,
    'capability_recent_locations': recentLocations.isSupported(),
    'capability_local_storage': hasLocalStorage,
    'capability_cookies_enabled': (new Cookies()).isSupported(),
    'capability_bbccookies_preference_enabled': (new BBCCookies()).isPersonalisationDisabled(),
    'has_locserv_cookie': hasLocservCookie,
    'has_recent_locations': recentLocationsIsSupported && allRecentLocations.length > 0,
    'recent_locations_total': recentLocationsIsSupported ? allRecentLocations.length : 0,
    'locserv_nation': hasLocservCookie ? locservCookie.nation : '',
    'locserv_news_region': hasLocservCookie && locservCookie.news ? locservCookie.news.tld : ''
  };

  /**
   * Stats.
   *
   * @param {EchoClient} echoClient a configured instance of an echo client
   * @param {Object} [options] additional options
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
      logActionEvent(echoClient, 'geolocation_location', getLabelsForLocation(location));
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
      var labels = getLabelsForLocation(location);
      labels.searchTerm = searchTerm;
      labels.searchTermLength = searchTerm.length;
      logActionEvent(echoClient, 'auto_complete_location', labels);
    });

    $.on(ns + ':component:user_locations:location', function(location) {
      var actionType = 'user_locations_location_select';
      if (location.isPreferred === true) {
        actionType = 'user_locations_location_main_select';
      }
      logActionEvent(echoClient, actionType, getLabelsForLocation(location));
    });

    $.on(ns + ':component:user_locations:location_prefer', function(location) {
      var labels = getLabelsForLocation(location);
      logActionEvent(echoClient, 'user_locations_location_prefer', labels);
    });

    $.on(ns + ':component:user_locations:location_remove', function(location) {
      logActionEvent(echoClient, 'user_locations_location_remove', getLabelsForLocation(location));
    });

    $.on(ns + ':component:search_results:results', function(metadata) {
      if (metadata.totalResults === 0) {
        logActionEvent(echoClient, 'search_no_results');
      }
    });

    $.on(ns + ':component:search_results:location', function(location, offset) {
      var labels = getLabelsForLocation(location);
      labels.offset = offset;
      logActionEvent(echoClient, 'search_results_location', labels);
    });

    this._registeredNamespaces[ns] = true;

    return true;
  };

  return Stats;

});
