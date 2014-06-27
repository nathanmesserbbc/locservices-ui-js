/*global locservices */

(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(factory);
  } else {
    global.locservices = global.locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.translations = locservices.ui.translations || {};
    locservices.ui.translations.En = factory();
  }
}(this, function() {

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

}));
