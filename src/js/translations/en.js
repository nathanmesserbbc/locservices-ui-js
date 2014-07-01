/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    foo: 'bar',
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
