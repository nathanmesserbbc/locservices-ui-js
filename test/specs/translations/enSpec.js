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

      it('should handle invalid interpolation dictionary', function() {
        var result = translations.get('test.interpolation', 'not an object');
        expect(result).toEqual('Value {a} and value {b}.');
      });

      it('should interpolate values', function() {
        var values = {
          a: 'foo',
          b: 'bar'
        };
        var result = translations.get('test.interpolation', values);
        expect(result).toEqual('Value foo and value bar.');
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
        translations.set('new.key', expected);
        expect(translations.get('new.key')).toBe(expected);
      });

      it('should return true if key is set', function() {
        var result;
        result = translations.set('foo', 'bar');
        expect(result).toBe(true);
      });

      it('should return false if key is not a string', function() {
        var result;
        result = translations.set(1, 'foo');
        expect(result).toBe(false);
      });

      it('should return false if key is an empty string', function() {
        var result;
        result = translations.set('', 'foo');
        expect(result).toBe(false);
      });

      it('should return false if no translation is given', function() {
        var result;
        result = translations.set('foo');
        expect(result).toBe(false);
      });
    });
  });
});
