/*global locservices */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    global.locservices = locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.component = locservices.ui.component || {};
    locservices.ui.component.UserLocations = factory();
  }
}(this, function() {

  'use strict';

  var $ = window.jQuery;

  function UserLocations(options) {
    options = options || {};
    options.componentId = 'user_locations';
    this.setComponentOptions(options);

    this.preferredLocation = new locservices.core.PreferredLocation();
    this.recentLocations = new locservices.core.RecentLocations();

    // @todo inject container as an option
    this.element = $("<div id=\"user_locations\"></div>");
    /*
    this.element.on('click', function(e){
      var locationId;
      e.preventDefault();
      target = $(e.target);
      locationId = target.attr('href').split('=')[1];
      this.removeLocationById
    });
    */
  }

  UserLocations.prototype = new locservices.ui.component.Component();
  UserLocations.prototype.constructor = UserLocations;

  UserLocations.prototype.removeLocationById = function(locationId) {
    this.recentLocations.remove(locationId);
    this.render();
  };

  UserLocations.prototype.render = function() {
    var html = "";
    var locations;
    var location;
    var noOfLocations;
    var locationIndex;
    var label;
    
    locations = this.getLocations();
    noOfLocations = locations.length;
    if (0 < noOfLocations) {
      html = "<ul>";
      for (locationIndex = 0; locationIndex < noOfLocations; locationIndex++) {
        location = locations[locationIndex];
        label = location.name;
        if (location.container) {
          label += ", " +location.container;
        }
        html += "<li><a href=\"?locationId=" +location.id +"\">" +label +"</a></li>";
      }
      html += "</ul>";
    }
    this.element.html(html);
  };

  UserLocations.prototype.getLocations = function() {
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
      locations.push(preferredLocation);
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

}));
