/*global describe, beforeEach, locservices, it:false*/

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/search',
  'locservices/ui/translations/en'
], function($, Api, Search, En) {

  describe('The search', function() {
    'use strict';

    var search,
        translations,
        container,
        api;

    var submitSearch = function(term) {
      search.input.attr('value', term);
      container.trigger('submit');
    };

    describe('constructor()', function() {

      beforeEach(function() {
        translations = new En();
        search = new Search({
          translations: translations,
          container: $('<div />'),
          api: sinon.spy()
        });
      });

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
    });

    describe('search()', function() {

      var mock;

      beforeEach(function() {
        container = $('<div />');
        api  = new Api();
        mock = sinon.mock(api);
        translations = new En();

        search = new Search({
          translations: translations,
          container: container,
          api: api
        });
      });

      it('should search for results when container is submitted', function() {
        mock.expects('search').once();
        submitSearch('Cardiff');
        mock.verify();
      });

      it('should not search if the search term is empty', function() {
        mock.expects('search').never();
        submitSearch('');
        mock.verify();
      });
    });

    describe('events', function() {

      var stub, apiStub;

      beforeEach(function() {
        container = $('<div />');
        api  = new Api();
        apiStub = sinon.stub(api, 'search');
        translations = new En();

        search = new Search({
          translations: translations,
          container: container,
          api: apiStub
        });
      });

      it('should emit an event when a search starts', function() {
        var stub = sinon.stub($, 'emit');
        var eventName = 'locservices:ui:component:search:start';
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search end', function() {
        var stub = sinon.stub($, 'emit');

        console.log(apiStub);
        //apiStub.yeildsTo('success', [1, 2, 3]);
        var eventName = 'locservices:ui:component:search:end';
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search has results', function() {
        var stub = sinon.stub($, 'emit');
        var eventName = 'locservices:ui:component:search:results';
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search returns an error', function() {
        var stub = sinon.stub($, 'emit');
        var eventName = 'locservices:ui:component:search:error';
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

    });

  });
});
