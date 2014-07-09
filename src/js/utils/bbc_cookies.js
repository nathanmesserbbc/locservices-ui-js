/*global define */

define(function() {

  'use strict';

  function BBCCookies() {
    this._isSupported = 'object' === typeof window.bbccookies;
    if (this._isSupported) {
      this._policy = window.bbccookies.readPolicy();
    }
  }

  BBCCookies.prototype.isSupported = function() {
    return this._isSupported;
  };

  BBCCookies.prototype.readPolicy = function() {
    if (this._isSupported) {
      return this._policy;
    }
  };

  return BBCCookies;

});
