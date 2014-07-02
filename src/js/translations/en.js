define(function() {

  'use strict';

  var dictionary = {
    'user_locations.heading': 'Your locations',
    'user_locations.recent': 'Prefer',
    'user_locations.remove': 'Remove',
    'search.placeholder': 'Enter a town, city or UK postcode',
    'search.submit': 'Search',
    'search.submit.title': 'Search for a location',
    'geolocation.button.label': 'Use my current location',
    'message.geolocation.detect': 'Detecting your location.'
  };

  function TranslationsEn() {}

  TranslationsEn.prototype.get = function(key) {
    if (dictionary.hasOwnProperty(key)) {
      return dictionary[key];
    }
    return false;
  };

  return TranslationsEn;

});
