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
        options,
        container,
        mockAPI;

    var submitSearch = function(term) {
      search.input.attr('value', term);
      search.form.trigger('submit');
    };

    beforeEach(function() {
      container = $('<div/>');
      options = {
        translations: new En(),
        container: container,
        api: new Api()
      };
      mockAPI = sinon.mock(options.api);
      search = new Search(options);
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
            translations: options.translations,
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

      it('should set locationName to specified name', function() {
        options.locationName = 'Cardiff';
        search = new Search(options);
        expect(search.locationName).toBe('Cardiff');
      });

      describe('with touch events', function() {

        beforeEach(function() {
          // Phantomjs reports itself as a touch browser anyway: https://github.com/ariya/phantomjs/issues/10375
          window.ontouchstart = true;
          search = new Search(options);
        });

        it('should set hasClearControl to true', function() {
          expect(search.hasClearControl).toBe(true);
         });

        it('should add a clear button', function() {
          var clearButton = container.find('.ls-ui-input-clear').first();
          expect(clearButton.length).toBe(1);
          expect(clearButton.is('button')).toBe(true);
         });

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

      it('should emit a clear event if there is no input value', function() {
        var spy = sinon.spy(search, 'emit');
        search.hasAValidSearchTerm = true;
        search.checkInput();
        expect(spy.calledOnce).toBe(true);
        expect(spy.args[0][0]).toBe('clear');
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
        searchStub = sinon.stub(Api.prototype, 'search');
        options.locationName = 'Cardiff';
        search = new Search(options);
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

      it('should clear the input value if the current value matches the location name', function() {
        var spy = sinon.spy(search.input, 'val');
        search.input.triggerHandler('focus');

        expect(spy.getCall(1).args[0]).toEqual('');
        search.input.val.restore();
      });

      it('should not clear the input value if the current value does not match the location name', function() {
        var spy = sinon.spy(search.input, 'val');
        search.input.val('Bristol');
        search.input.triggerHandler('focus');

        expect(spy.getCall(0).args[0]).toEqual('Bristol');
        expect(spy.getCall(1).args[0]).toEqual(undefined);
        search.input.val.restore();
      });

      it('should react to an inactive controller', function() {
        var spy = sinon.spy($, 'on');
        search = new Search(options);

        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:inactive');
        $.on.restore();
      });

      it('should restore the location name on blur', function() {
        search.input.triggerHandler('focus');
        expect(search.input.val()).toEqual('');
        $.emit('locservices:ui:controller:inactive');
        expect(search.input.val()).toEqual('Cardiff');
      });

    });

  });
});
