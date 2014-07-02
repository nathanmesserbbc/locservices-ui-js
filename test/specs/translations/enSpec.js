/*global describe, beforeEach, it:false*/

define(['locservices/ui/translations/en'], function(En) {

  describe('The EN translations module', function() {
    'use strict';

    var translations;

    beforeEach(function() {
      translations = new En();
    });

    describe('get()', function() {

      it('should return false for invalid key', function() {
        expect(translations.get('hopefully not a valid key')).toBe(false);
      });

      it('should return a string for a valid key', function() {

        expect(translations.get('geolocation.button.label')).toBe('Use my current location');
      });

    });
  });
});
