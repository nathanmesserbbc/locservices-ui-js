/*global describe, beforeEach, locservices, it:false*/
describe('The search', function() {
  'use strict';

  var search;
  var translations;

  beforeEach(function() {
    translations = new locservices.ui.translations.En();
    search = new locservices.ui.component.Search({
      translations: translations
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
