/*global describe, beforeEach, locservices, it:false*/

define(['locservices/ui/component/search', 'locservices/ui/translations/en'], function(Search, En) {

  describe('The search', function() {
    'use strict';

    var search;
    var translations;

    beforeEach(function() {
      translations = new En();
      search = new Search({
        translations: translations,
        container: null,
        api: {}
      });
    });

    describe('constructor()', function() {

      it('should set this.componentId to "search"', function() {
        expect(search.componentId).toBe('search');
      });

      it('should set this.eventNamespace to "locservices:ui:component:search"', function() {
        expect(search.eventNamespace).toBe('locservices:ui:component:search');
      });

    });

  });
});
