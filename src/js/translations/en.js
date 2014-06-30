/*global locservices */

define(function() {

  'use strict';

  var dictionary = {
    foo: 'bar'
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
