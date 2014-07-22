define(function() {

  'use strict';

  var dictionary = {
    'auto_complete.error.search': 'Sorry, we are experiencing technical problems.',
    'user_locations.heading.preferred': 'Main location',
    'user_locations.heading.recent': 'Other locations',
    'user_locations.action.recent': 'Prefer',
    'user_locations.action.remove': 'Remove',
    'user_locations.dialog.confirm': 'Confirm',
    'user_locations.dialog.cancel': 'Cancel',
    'user_locations.dialog.remove_preferred': 'We will no longer use <strong>{name}</strong> to give you relevant local info across the BBC.',
    'user_locations.dialog.prefer': 'We will now use <strong>{name}</strong> to give you relevant local info across the BBC.',
    'user_locations.message.preferred': 'We\'ll use your main location to give you relevant local info across the BBC.',
    'user_locations.message.change_preferred': 'You can change this to another location by hitting the star next to it.',
    'user_locations.error.preferred_location': 'Sorry, we are experiencing technical problems.',
    'close_button.label': 'Close',
    'search.placeholder': 'Enter a town, city or UK postcode',
    'search.submit': 'Search',
    'search.submit.title': 'Search for a location',
    'geolocation.button.label': 'Use my current location',
    'geolocation.error.http': 'We are unable to use your location.',
    'geolocation.error.browser': 'We are unable to use your location.',
    'geolocation.error.browser.permission': 'Please enable Location Services in your device settings or browser.',
    'geolocation.error.outsideContext': 'Your location is not currently supported by this application.',
    'message.geolocation.detect': 'Detecting your location.',
    'message.no_results': 'We could not find any results for "{searchTerm}"',
    'message.results': 'Search results for "{searchTerm}"',
    'message.total_results': 'Showing {current} of {total}',
    'primary.cold_start': 'We\'ll now use <strong>{name}</strong> as your main location to give you relevant local info across the BBC.',
    'primary_search.close': 'Close',
    'test.interpolation': 'Value {a} and value {b}.'
  };

  function TranslationsEn() {}

  /**
   * Returns translation for given key or false if
   * key is not present
   *
   * @param {String} key for translation
   * @param {Object} interpolationDictionary
   * @return {String|Boolean}
   */
  TranslationsEn.prototype.get = function(key, interpolationDictionary) {
    var result;
    if (!dictionary.hasOwnProperty(key)) {
      return false;
    }
    result = dictionary[key];
    if ('object' === typeof interpolationDictionary) {
      result = String(result).replace(
        /\{([^{}]*)\}/g,
        function(valueToReplace, interpolationKey) {
          if (interpolationDictionary.hasOwnProperty(interpolationKey)) {
            return interpolationDictionary[interpolationKey];
          } else {
            return valueToReplace;
          }
        }
      );
    }
    return result;
  };

  /**
   * Sets the translation for a given key
   *
   * @param {String} key for translation
   * @param {String} value translation value for given key
   * @return {Boolean}
   */
  TranslationsEn.prototype.set = function(key, value) {

    if ('string' !== typeof key || '' === key || undefined === value) {
      return false;
    }
    dictionary[key] = value;
    return true;
  };

  return TranslationsEn;

});
