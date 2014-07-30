/*global describe, beforeEach, locservices, it:false*/

define([
  'jquery',
  'locservices/ui/component/search',
  'locservices/ui/translations/en'
], function($, Search, En) {

  describe('The search', function() {
    'use strict';

    var search,
        translations;

    beforeEach(function() {
      translations = new En();
      search = new Search({
        translations: translations,
        container: $('<div />'),
        api: sinon.spy()
      });
    });

    describe('constructor()', function() {

      it('should set this.componentId to "search"', function() {
        expect(search.componentId).toBe('search');
      });

      it('should set this.eventNamespace to "locservices:ui:component:search"', function() {
        expect(search.eventNamespace).toBe('locservices:ui:component:search');
      });

      it('should throw an exception if options do not api an element', function() {
        var failure = function() {
          new Search({
            translations: translations,
            container: null
          });
        };
        expect(failure).toThrow();
      });

      it('should search for results when container is submitted');

      it('should emit an event when a search starts');

      it('should emit an event when a search end');

      it('should emit an event when a search returns an error');

    });

  });
});
