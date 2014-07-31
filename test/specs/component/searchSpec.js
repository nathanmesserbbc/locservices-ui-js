/*global describe, beforeEach, afterEach, it:false*/

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/search',
  'locservices/ui/translations/en'
], function($, Api, Search, En) {

  describe('The search', function() {
    'use strict';

    var search,
        container,
        translations,
        api,
        mockAPI;

    var submitSearch = function(term) {
      search.input.attr('value', term);
      search.form.trigger('submit');
    };

    beforeEach(function() {
      container = $('<div/>');
      translations = new En();
      api  = new Api();
      mockAPI = sinon.mock(api);
      search = new Search({
        translations: translations,
        container: container,
        api: api
      });
    });

    describe('constructor', function() {

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
        expect(failure).toThrow(new Error('Search requires api parameter'));
      });

      it('should call checkInput() on input keyup', function() {
        var stub = sinon.stub(search, 'checkInput');
        search.input.trigger('keyup');
        expect(stub.callCount).toBe(1);
      });

      it('should set hasAValidSearchTerm to false', function() {
        expect(search.hasAValidSearchTerm).toBe(false);
      });

    });

    describe('clear()', function() {

      it('should set the input value to \'\'', function() {
        search.input.val('foo');
        search.clear();
        expect(search.input.val()).toBe('');
      });

      it('should call checkInput()', function() {
        var stub = sinon.stub(search, 'checkInput');
        search.clear();
        expect(stub.calledOnce).toBe(true);
      });

      it('should emit a clear event', function() {
        var stub = sinon.stub(search, 'emit');
        search.clear();
        expect(stub.calledOnce).toBe(true);
        expect(stub.args[0][0]).toBe('clear');
      });

    });

    describe('checkInput', function() {

      it('should set hasAValidSearchTerm to true if there is input value', function() {
        search.hasAValidSearchTerm = false;
        search.input.val('foo');
        search.checkInput();
        expect(search.hasAValidSearchTerm).toBe(true);
      });

      it('should add \'ls-ui-comp-search-with-term\' class to form if there is input value', function() {
        search.input.val('foo');
        search.checkInput();
        expect(search.form.hasClass('ls-ui-comp-search-with-term')).toBe(true);
      });

      it('should set hasAValidSearchTerm to false if there is no input value', function() {
        search.hasAValidSearchTerm = true;
        search.checkInput();
        expect(search.hasAValidSearchTerm).toBe(false);
      });

      it('should remove \'ls-ui-comp-search-with-term\' class from form if there is no input value', function() {
        search.form.addClass('ls-ui-comp-search-with-term');
        expect(search.form.hasClass('ls-ui-comp-search-with-term')).toBe(true);
        search.hasAValidSearchTerm = true;
        search.checkInput();
        expect(search.form.hasClass('ls-ui-comp-search-with-term')).toBe(false);
      });

    });

    describe('search', function() {

      it('should search for results when container is submitted', function() {
        mockAPI.expects('search').once();
        submitSearch('Cardiff');
        mockAPI.verify();
      });

      it('should only permit a single search at one time', function() {
        mockAPI.expects('search').once();
        submitSearch('Cardiff');
        submitSearch('Manchester');
        mockAPI.verify();
      });

      it('should not search if the search term is empty', function() {
        mockAPI.expects('search').never();
        submitSearch('');
        mockAPI.verify();
      });

      it('should not search if the search term consists of spaces', function() {
        mockAPI.expects('search').never();
        submitSearch('  ');
        mockAPI.verify();
      });
    });

    describe('events', function() {

      var searchStub;
      var results = {
        metadata: {},
        results: {}
      };

      beforeEach(function() {
        container = $('<div />');
        searchStub = sinon.stub(Api.prototype, 'search');
        search = new Search({
          translations: new En(),
          container: container,
          api: new Api()
        });
      });

      afterEach(function() {
        searchStub.restore();
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
        var eventName = 'locservices:ui:component:search:end';
        searchStub.yieldsToOn('success', search, results);
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search has results', function() {
        var stub = sinon.stub($, 'emit');
        var eventName = 'locservices:ui:component:search:results';

        searchStub.yieldsToOn('success', search, results);
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search returns an error', function() {
        var stub = sinon.stub($, 'emit');
        var eventName = 'locservices:ui:error';

        searchStub.yieldsToOn('error', search, 'Error searching for "Cardiff"');
        submitSearch('Cardiff');
        expect(stub.calledWith(eventName)).toBe(true);
        stub.restore();
      });

      it('should emit an event when a search has focus', function() {
        var spy = sinon.spy($, 'emit');
        search.input.triggerHandler('focus');

        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:component:search:focus');
        $.emit.restore();
      });

    });

  });
});
