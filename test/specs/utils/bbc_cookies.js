/*global describe, beforeEach, it:false*/

define(['locservices/ui/utils/bbc_cookies'], function(BBCCookies) {

  describe('The BBC cookies module', function() {
    'use strict';

    var bbcCookies;
    var stubWindowBBCCookies;

    stubWindowBBCCookies = {
      readPolicy: function() {
        return {
          ads: true,
          personalisation: false,
          performance: true,
          necessary: true
        };
      }
    };

    beforeEach(function() {
      window.bbccookies = stubWindowBBCCookies;
      bbcCookies = new BBCCookies();
    });

    describe('isSet()', function() {

      it('should return to false if unavailable', function() {
        window.bbccookies = undefined;
        bbcCookies = new BBCCookies();
        expect(bbcCookies.isSupported()).toBe(false);
      });

      it('should return true if available', function() {
        expect(bbcCookies.isSupported()).toBe(true);
      });

    });

    describe('readPolicy()', function() {

      it('should return false if unavailable', function() {
        expect(bbcCookies.readPolicy()).toBe(false);
      });

      it('should return an object if available', function() {
        window.bbccookies = undefined;
        bbcCookies = new BBCCookies();
        expect(typeof bbcCookies.readPolicy()).toBe('object');
      });

    });

  });
});
