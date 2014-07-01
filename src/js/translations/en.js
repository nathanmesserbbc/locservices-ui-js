/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    foo: 'bar',
    'search.placeholder': 'Search for a location',
    'search.submit': 'Search'
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
