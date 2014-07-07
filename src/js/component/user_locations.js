/*global define */

define([
  'jquery',
  'locservices/ui/component/component',
  'locservices/core/recent_locations',
  'locservices/core/preferred_location'
],
function(
  $,
  Component,
  RecentLocations,
  PreferredLocation
) {

  'use strict';

  var templates = {

    element: $('<div />').addClass('ls-ui-comp-user_locations'),

    preferredLocationList: $('<ul/>').addClass('ls-ui-comp-user_locations-preferred'),

    preferredLocationHeading: function(translations) {
      return $('<p />').text(
        translations.get('user_locations.main.heading')
      );
    },

    recentLocationsList: $('<ul/>').addClass('ls-ui-comp-user_locations-recent'),

    recentLocationsHeading: function(translations, noOfLocations) {
      return $('<p />').text(
        translations.get('user_locations.recent.heading') + ' (' + noOfLocations + ')'
      );
    },

    location: function(translations, location) {
      var locationId = location.id;

      var linkName = $('<a/>')
        .addClass('ls-ui-comp-user_locations-name')
        .attr('href', '?locationId=' + locationId)
        .html($('<strong/>').text(location.name));
      if (location.container) {
        linkName.append(', ' + location.container);
      }

      var linkAction = $('<a/>')
        .addClass('ls-ui-comp-user_locations-action')
        .attr('href', '?locationId=' + locationId)
        .text(translations.get('user_locations.recent'));

      var linkRemove = $('<a/>')
        .addClass('ls-ui-comp-user_locations-remove')
        .attr('href', '?locationId=' + locationId)
        .text(translations.get('user_locations.remove'));

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
    }
  };

  /**
   * User Locations constructor
   *
   * @param {Object} options
   */
  function UserLocations(options) {
    var self = this;
    options = options || {};
    options.componentId = 'user_locations';
    this.setComponentOptions(options);

    this.preferredLocation = new PreferredLocation();
    this.recentLocations = new RecentLocations();

    templates.element.on('click', function(e) {
      var target;
      var locationId;
      e.preventDefault();
      e.stopPropagation();
      target = $(e.target);
      if (target.hasClass('ls-ui-comp-user_locations-recent')) {
        locationId = target.attr('href').split('=')[1];
        self.setPreferredLocationById(locationId);
      } else if (target.hasClass('ls-ui-comp-user_locations-remove')) {
        locationId = target.attr('href').split('=')[1];
        self.removeLocationById(locationId);
      }

    });

    // @todo test both lines
    this.container.append(templates.element);
    this.render();

    $.on(this.eventNamespaceBase + ':component:search_results:location', function(location) {
      self.addRecentLocation(location);
    });

    $.on(this.eventNamespaceBase + ':component:geolocation:location', function(location) {
      self.addRecentLocation(location);
    });

    $.on(this.eventNamespaceBase + ':component:auto_complete:location', function(location) {
      self.addRecentLocation(location);
    });
  }

  UserLocations.prototype = new Component();
  UserLocations.prototype.constructor = UserLocations;

  /**
   * Set the preferred location by location id
   *
   * @param {String} locationId
   */
  UserLocations.prototype.setPreferredLocationById = function(locationId) {
    var location;
    var locations;
    var locationIndex;
    var noOfLocations;
    locations = this.getRecentLocations();
    noOfLocations = locations.length;
    for (locationIndex = 0; locationIndex < noOfLocations; locationIndex++) {
      if (locationId === locations[locationIndex].id) {
        location = locations[locationIndex];
      }
    }

    // @todo push the previous preferred location to the top
    // of recents ???

    if (location) {
      this.preferredLocation.set(location);
      this.render();
    }
  };

  /**
   * Add a location to the list of recents
   *
   * @param {Object} location
   */
  UserLocations.prototype.addRecentLocation = function(location) {

    //@todo test this method

    // should not have to do this try/catch
    // core/recents should return false instead
    try {
      this.recentLocations.add(location);
    } catch (e) {
      return;
    }
    this.render();
  };

  /**
   * Remove a location from the list of recents by location id
   *
   * @param {String} locationId
   */
  UserLocations.prototype.removeLocationById = function(locationId) {
    this.recentLocations.remove(locationId);

    // @todo what happens if the removed location is also the
    // preferred location ???

    this.render();
  };

  /**
   * Render a list of locations
   */
  UserLocations.prototype.render = function() {
    var preferredLocation;
    var locations;
    var noOfLocations;
    var locationIndex;

    templates.element.empty();
    templates.preferredLocationList.empty();
    templates.recentLocationsList.empty();

    /* Preferred Location */

    templates.element.append(templates.preferredLocationHeading(this.translations));

    if (this.preferredLocation.isSet()) {
      preferredLocation = this.preferredLocation.get();
      preferredLocation.isPreferred = true;
      preferredLocation.isPreferable = true;
      templates.preferredLocationList.append(
        templates.location(this.translations, preferredLocation)
      );
    } else {
      templates.preferredLocationList.addClass('ls-ui-comp-user_locations-preferred-no-location');
    }
    templates.element.append(templates.preferredLocationList);

    /* Recent Locations */

    locations = this.getRecentLocations();
    noOfLocations = locations.length;

    templates.element.append(templates.recentLocationsHeading(this.translations, noOfLocations));

    if (0 < noOfLocations) {
      for (locationIndex = 0; locationIndex < noOfLocations; locationIndex++) {
        templates.recentLocationsList.append(
          templates.location(this.translations, locations[locationIndex])
        );
      }
      templates.element.append(templates.recentLocationsList);
    }
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
              (preferredLocation && preferredLocation.id !== recentLocation.id)
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
