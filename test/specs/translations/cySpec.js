/*global describe, beforeEach, it:false*/

define(['locservices/ui/translations/cy'], function(Cy) {

  describe('The CY translations module', function() {
    'use strict';

    var translations;

    beforeEach(function() {
      translations = new Cy();
    });

    describe('get()', function() {

      it('should return a welsh translation for a valid key', function() {
        expect(translations.get('geolocation.button.label')).toBe('Defnyddiwch fy lleoliad');
      });

    });

  });

});
