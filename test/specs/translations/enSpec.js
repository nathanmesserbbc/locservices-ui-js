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

    describe('set()', function() {

      it('should set translation for key', function() {
        var expected = 'Find my location';
        var oldValue = translations.get('search.submit');

        translations.set('search.submit', expected);
        expect(translations.get('search.submit')).toBe(expected);
        translations.set('search.submit', oldValue);
      });

      it('should create new key if it does not exist', function() {
        var expected = 'New translation';

        expect(translations.set('new.key', expected).get('new.key')).toBe(expected);
      });

      it('should have a chainable interface', function() {
        expect(translations.set('new.key', 'value')).toBe(translations);
      });

      it('should throw an error if no transaltion is given', function() {
        expect(function() {
          translations.set('new.key');
        }).toThrow(new Error('Please provided a translation for new.key.'));
      });
    });
  });
});
