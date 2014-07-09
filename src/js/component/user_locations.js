/*global define */

define([
  'jquery',
  'locservices/ui/component/component',
  'locservices/ui/utils/bbc_cookies',
  'locservices/core/recent_locations',
  'locservices/core/preferred_location'
],
function(
  $,
  Component,
  BBCCookies,
  RecentLocations,
  PreferredLocation
) {

  'use strict';

  var templates = {

    element: function() {
      return $('<div />').addClass('ls-ui-comp-user_locations');
    },

    preferredLocationList: $('<ul/>').addClass('ls-ui-comp-user_locations-preferred'),

    preferredLocationHeading: function(translations) {
      return $('<p />')
        .text(
          translations.get('user_locations.heading.preferred')
        );
    },

    recentLocationsList: $('<ul/>').addClass('ls-ui-comp-user_locations-recent'),

    recentLocationsHeading: function(translations, noOfLocations) {
      return $('<p />')
        .text(
          translations.get('user_locations.heading.recent') + ' (' + noOfLocations + ')'
        );
    },

    location: function(translations, location) {
      var locationId = location.id;

      var linkName = $('<a/>')
        .addClass('ls-ui-comp-user_locations-name')
        .attr('href', '#' + locationId)
        .attr('data-id', locationId)
        .attr('data-action', 'location')
        .html($('<strong/>').text(location.name));
      if (location.container) {
        linkName.append(', ' + location.container);
      }

      var linkAction = $('<a/>')
        .addClass('ls-ui-comp-user_locations-action')
        .attr('href', '#' + locationId)
        .attr('data-id', locationId)
        .attr('data-action', location.isPreferred ? 'none' : 'prefer')
        .text(translations.get('user_locations.action.recent'));

      var linkRemove = $('<a/>')
        .addClass('ls-ui-comp-user_locations-remove')
        .attr('href', '#' + locationId)
        .attr('data-id', locationId)
        .attr('data-action', 'remove')
        .text(translations.get('user_locations.action.remove'));

      var li = $('<li />');
      if (location.isPreferred) {
        li.addClass('ls-ui-comp-user_locations-location-preferred');
      }
      if (location.isPreferable) {
        li.addClass('ls-ui-comp-user_locations-location-preferable');
        li.append(linkAction);
      }
      li.append(linkName).append(linkRemove);

      return li;
    },

    message: function(translations, hasRecentLocations) {
      var value = translations.get('user_locations.message.preferred');
      if (hasRecentLocations) {
        value += ' ' + translations.get('user_locations.message.change_preferred');
      }
      return $('<p/>').text(value);
    }
  };

  /**
   * User Locations constructor
   *
   * @param {Object} options
   */
  function UserLocations(options) {
    var self = this;
    var api;
    var bbcCookies;
    var bbcCookiesPolicy;

    options = options || {};
    options.componentId = 'user_locations';

    if (undefined === options.api) {
      throw new Error('User locations requires api parameter');
    } else {
      api = options.api;
    }

    this.setComponentOptions(options);

    // @todo test that the module returns early here
    bbcCookies = new BBCCookies();
    if (bbcCookies.isSupported()) {
      bbcCookiesPolicy = bbcCookies.readPolicy();
      if (false === bbcCookiesPolicy.personalisation) {
        return false;
      }
    }

    this._locations = [];

    this.preferredLocation = new PreferredLocation(api);
    this.recentLocations = new RecentLocations();

    this.element = templates.element();
    this.container.append(this.element);
    this.render();

    this.element.on('click', function(e) {
      var target;
      var locationId;
      var action;
      e.preventDefault();
      e.stopPropagation();
      target = $(e.target);

      // convert back to a string as strings that look like a 
      // number eg 1243 get converted to type number
      locationId = String(target.data('id'));

      action = target.data('action');
      if ('location' === action) {
        self.selectLocationById(locationId);
      } else if ('prefer' === action) {
        self.setPreferredLocationById(locationId);
      } else if ('remove' === action) {
        self.removeLocationById(locationId);
      }
    });

    var handleLocationEvent = function(location) {
      if (self.recentLocations.add(location)) {
        self.render();
      }
    };

    $.on(this.eventNamespaceBase + ':component:search_results:location', function(location) {
      handleLocationEvent(location);
    });

    $.on(this.eventNamespaceBase + ':component:geolocation:location', function(location) {
      handleLocationEvent(location);
    });

    $.on(this.eventNamespaceBase + ':component:auto_complete:location', function(location) {
      handleLocationEvent(location);
    });
  }

  UserLocations.prototype = new Component();
  UserLocations.prototype.constructor = UserLocations;

  /**
   * Select a location by it's id
   *
   * @param {String} locationId
   */
  UserLocations.prototype.selectLocationById = function(locationId) {
    var location;
    location = this._locations[locationId];
    if (location) {
      $.emit(this.eventNamespace + ':location', [location]);
    }
  };

  /**
   * Set the preferred location by location id
   *
   * @param {String} locationId
   */
  UserLocations.prototype.setPreferredLocationById = function(locationId) {
    var self;
    var location;
    var preferredLocation;
    self = this;
    location = this._locations[locationId];
    if (location && this.preferredLocation.isValidLocation(location)) {

      if (this.preferredLocation.isSet()) {
        preferredLocation = this.preferredLocation.get();

        // @todo what if this returns false?
        this.recentLocations.add(preferredLocation);
      }

      // @todo test success and error

      this.preferredLocation.set(location.id, {
        success: function() {
          self.render();
        },
        error: function() {
          // @todo emit error event
        }
      });

    }
  };

  /**
   * Remove a location from the list of recents by location id
   *
   * @param {String} locationId
   */
  UserLocations.prototype.removeLocationById = function(locationId) {

    var location;
    location = this._locations[locationId];

    if (location) {
      if (location.isPreferred) {
        this.preferredLocation.unset();
      } else {
        this.recentLocations.remove(locationId);
      }
      this.render();
    }

  };

  /**
   * Render a list of locations
   */
  UserLocations.prototype.render = function() {
    var preferredLocation;
    var hasPreferredLocation;
    var recentLocations;
    var recentLocation;
    var hasRecentLocations;
    var noOfRecentLocations;
    var locationIndex;

    this._locations = {};

    this.element.empty();
    templates.preferredLocationList.empty();
    templates.recentLocationsList.empty();

    /* Preferred Location */

    this.element.append(templates.preferredLocationHeading(this.translations));

    if (this.preferredLocation.isSet()) {
      preferredLocation = this.preferredLocation.get();
      hasPreferredLocation = true;
      this._locations[preferredLocation.id] = preferredLocation;
      preferredLocation.isPreferred = true;
      preferredLocation.isPreferable = true;
      templates.preferredLocationList.append(
        templates.location(this.translations, preferredLocation)
      );
    } else {
      templates.preferredLocationList.addClass('ls-ui-comp-user_locations-preferred-no-location');
    }
    this.element.append(templates.preferredLocationList);

    /* Recent Locations */

    recentLocations = this.getRecentLocations();
    noOfRecentLocations = recentLocations.length;
    hasRecentLocations = 0 < noOfRecentLocations;

    if (hasRecentLocations) {

      this.element.append(
        templates.recentLocationsHeading(this.translations, noOfRecentLocations)
      );

      for (locationIndex = 0; locationIndex < noOfRecentLocations; locationIndex++) {
        recentLocation = recentLocations[locationIndex];
        this._locations[recentLocation.id] = recentLocation;
        templates.recentLocationsList.append(
          templates.location(this.translations, recentLocation)
        );
      }
      this.element.append(templates.recentLocationsList);
    }

    /* Message */

    this.element.append(
      templates.message(this.translations, hasRecentLocations)
    );
  };

  /**
   * Get a list of up to 5 user locations. Can include both a
   * preferred location and recents.
   *
   * @return {Array} The array of 0 to 5 locations
   */
  UserLocations.prototype.getRecentLocations = function() {
    var locations = [];
    var noOfLocationsRemaining = 5;
    var preferredLocation;
    var recentLocations;
    var noOfRecentLocations;
    var recentLocation;
    var recentLocationIndex;

    if (this.preferredLocation.isSet()) {
      noOfLocationsRemaining--;
      preferredLocation = this.preferredLocation.get();
    }

    if (this.recentLocations.isSupported()) {
      recentLocations = this.recentLocations.all();
      noOfRecentLocations = recentLocations.length;
      if (0 < noOfRecentLocations) {
        for (recentLocationIndex = 0; recentLocationIndex < noOfRecentLocations; recentLocationIndex++) {
          recentLocation = recentLocations[recentLocationIndex];
          if (0 < noOfLocationsRemaining &&
            (
              !preferredLocation ||
              (preferredLocation.id !== recentLocation.id)
            )
          ) {
            noOfLocationsRemaining--;
            recentLocation.isPreferable = this.preferredLocation.isValidLocation(recentLocation);
            locations.push(recentLocation);
          }
          if (0 === noOfLocationsRemaining) {
            break;
          }
        }
      }
    }

    return locations;
  };

  return UserLocations;

});
