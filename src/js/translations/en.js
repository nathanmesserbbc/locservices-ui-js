/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    'geolocation.button.label': 'Use my current location'
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
