/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    foo: 'bar',
    'search.placeholder': 'Enter a town, city or UK postcode',
    'search.submit': 'Search',
    'search.submit.title': 'Search for a location'
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
