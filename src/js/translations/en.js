/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    foo: 'bar',
    'user_locations.heading': 'Your locations',
    'user_locations.recent': 'Prefer',
    'user_locations.remove': 'Remove'
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
