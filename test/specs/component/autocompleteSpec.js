/*global define, describe, it, expect, beforeEach, afterEach */
define([
  'jquery',
  'locservices/ui/component/auto_complete',
  'locservices/ui/translations/en',
  'locservices/core/api'
], function($, AutoComplete, En, Api) {

  describe('The AutoComplete', function() {

    var api, translations, autoComplete, container, inputElement, options, clock;

    beforeEach(function() {
      api = new Api();
      translations = new En();
      container = $('<div />');
      inputElement = $('<input type="text" />');
      clock = sinon.useFakeTimers();
      options = {
        api: api,
        translations: translations,
        container: container,
        element: inputElement
      };
      autoComplete = new AutoComplete(options);
    });

    afterEach(function() {
      clock.restore();
    });

    describe('constructor', function() {
      it('sets the componentId to autocomplete', function() {
        expect(autoComplete.componentId).toEqual('auto_complete');
      });
      it('disables html autocomplete for the input element', function() {
        expect(inputElement.attr('autocomplete')).toEqual('off');
      });
      it('throws an error when an api is not passed in the options', function() {
        var fn = function() {
          autoComplete = new AutoComplete({
            translations: translations,
            container: container,
            element: inputElement
          });
        };

        expect(fn).toThrow();
      });
      it('throws an error when an element is not passed in the options', function() {
        var fn = function() {
          autoComplete = new AutoComplete({
            translations: translations,
            container: container,
            api: api
          });
        };

        expect(fn).toThrow();
      });
      it('sets the general component options', function() {
        var spy = sinon.spy(AutoComplete.prototype, 'setComponentOptions');
        autoComplete = new AutoComplete({
          api: api,
          translations: translations,
          container: container,
          element: inputElement
        });
        expect(spy.calledOnce).toBe(true);
        spy.restore();
      });
    });

    describe('input element', function() {
      it('calls autoComplete on keyup', function() {
        var stub = sinon.stub(autoComplete, 'autoComplete');
        inputElement.trigger('keyup');
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
    });

    describe('binds a key event', function() {
      it('for the escape key', function() {
        var stub = sinon.stub(autoComplete, 'escapeKeyHandler');
        var event = $.Event('keydown', { keyCode: 27 });
        $(container).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
      it('for the enter key', function() {
        var stub = sinon.stub(autoComplete, 'enterKeyHandler');
        var event = $.Event('keydown', { keyCode: 13 });
        $(container).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('for the up arrow', function() {
        var stub = sinon.stub(autoComplete, 'highlightPrevSearchResult');
        var event = $.Event('keydown', { keyCode: 38 });
        $(container).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('for the down arrow', function() {
        var stub = sinon.stub(autoComplete, 'highlightNextSearchResult');
        var event = $.Event('keydown', { keyCode: 40 });
        $(container).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
    });

    describe('search results', function() {

      it('emits the location event when one is selected', function() {
        var locations = [
          { id: 1 }
        ];
        var expectedParams = [locations[0], 'foo'];
        var stub = sinon.stub(autoComplete, 'emit');

        autoComplete.currentSearchTerm = 'foo';
        autoComplete.searchResultsData = locations;
        autoComplete.searchResults.append('<li>foo</li>');
        autoComplete.searchResults.find('li:eq(0)').trigger('mousedown');

        expect(stub.calledWith('location', expectedParams)).toBe(true);
        stub.restore();
      });
    });

    describe('events', function() {

      it('should react to search starting', function() {
        expect(autoComplete._searchSubmitted).toBe(false);
        $.emit('locservices:ui:component:search:start');
        expect(autoComplete._searchSubmitted).toBe(true);
        expect(autoComplete.requestedSearchTerm).toBe(undefined);
      });

      it('should reset requestedSearchTerm on search start', function() {
        autoComplete.requestedSearchTerm = 'foo';
        $.emit('locservices:ui:component:search:start');
        expect(autoComplete.requestedSearchTerm).toBe(undefined);
      });

      it('should reset requestedSearchTerm on search:clear', function() {
        autoComplete.requestedSearchTerm = 'foo';
        $.emit('locservices:ui:component:search:clear');
        expect(autoComplete.requestedSearchTerm).toBe(undefined);
      });

      it('should reset currentSearchTerm on search:clear', function() {
        autoComplete.currentSearchTerm = 'foo';
        $.emit('locservices:ui:component:search:clear');
        expect(autoComplete.currentSearchTerm).toBe('');
      });

      it('should call clear on search:clear', function() {
        var stub = sinon.stub(autoComplete, 'clear');
        $.emit('locservices:ui:component:search:clear');
        expect(stub.callCount).toBe(1);
      });

    });

    describe('prepareSearchTerm()', function() {

      it('returns a string when term is a string', function() {
        expect(typeof autoComplete.prepareSearchTerm('foo')).toEqual('string');
      });

      it('returns an empty string when term is null', function() {
        var result = autoComplete.prepareSearchTerm(null);
        expect(typeof result).toEqual('string');
        expect(result).toEqual('');
      });

      it('returns an empty string when term is undefined', function() {
        var result = autoComplete.prepareSearchTerm(undefined);
        expect(typeof result).toEqual('string');
        expect(result).toEqual('');
      });

      it('returns a string when term is a number', function() {
        expect(typeof autoComplete.prepareSearchTerm(123)).toEqual('string');
      });

      it('returns a string when term is a string', function() {
        expect(typeof autoComplete.prepareSearchTerm('foo')).toEqual('string');
      });

      it('removes all spaces from the right and left of the search term', function() {
        expect(autoComplete.prepareSearchTerm('  foo  ')).toEqual('foo');
      });

    });

    describe('highlightTerm()', function() {
      it('wraps a term in strong tags', function() {
        var term = 'World';
        var str = 'Hello World';
        expect(autoComplete.highlightTerm(str, term)).toEqual('Hello <strong>World</strong>');
      });
    });

    describe('autoComplete()', function() {

      var autoCompleteDelay = 500;

      it('calls clear if the search term is too short', function() {
        var stub = sinon.stub(autoComplete, 'clear');
        inputElement.val('c');
        autoComplete.currentSearchTerm = 'car';
        autoComplete.autoComplete();
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('sets currentSearchTerm to \'\' if the search term is too short', function() {
        var stub = sinon.stub(autoComplete, 'clear');
        inputElement.val('c');
        autoComplete.currentSearchTerm = 'car';
        autoComplete.autoComplete();
        expect(autoComplete.currentSearchTerm).toBe('');
        stub.restore();
      });

      it('always prepares the search term before using it', function() {
        var stub = sinon.stub(autoComplete, 'prepareSearchTerm');
        stub.returns('');
        autoComplete.autoComplete();
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('sets currentSearchTerm to the prepared value if term is valid', function() {
        var expectedValue = 'foo';
        sinon.stub(autoComplete, 'prepareSearchTerm').returns(expectedValue);
        inputElement.val(expectedValue);
        autoComplete.currentSearchTerm = '';
        autoComplete.autoComplete();
        expect(autoComplete.currentSearchTerm).toBe(expectedValue);
      });

      it('calls the api after the prefigured delay', function() {
        var stub = sinon.stub(window, 'setTimeout');
        inputElement.val('card');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('does not call api.autoComplete if a search has been started', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete');
        inputElement.val('card');
        autoComplete.autoComplete();
        autoComplete._searchSubmitted = true;
        clock.tick(autoCompleteDelay);
        expect(stub.callCount).toBe(0);
      });

      it('does not call api.autoComplete if a search term has already been requested', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete');
        inputElement.val('card');
        autoComplete.requestedSearchTerm = 'card';
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);
        expect(stub.callCount).toBe(0);
      });

      it('calls autoComplete on the api with the search term', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete');
        inputElement.val('card');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith('card')).toBe(true);

        stub.restore();
      });

      it('should not be called unless input value changes', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete');
        inputElement.val('card');

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);
        autoComplete._waitingForResults = false;

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(stub.calledOnce).toBe(true);

        stub.restore();
      });

      it('emits the results on autoComplete success', function() {
        var results = { results: true };
        var metadata = { metadata: true };
        var stub = sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.success({ results: results, metadata: metadata });
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('card');

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(emitStub.calledOnce).toBe(true);
        expect(emitStub.calledWith('results', [results, metadata])).toBe(true);

        emitStub.restore();
        stub.restore();
      });

      it('sets the internal _waitingForResults before and after call to autoComplete success', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          expect(autoComplete._waitingForResults).toBe(true);
          options.success({ results: 1, metadata: 1 });
          expect(autoComplete._waitingForResults).toBe(false);
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('card');

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        stub.restore();
        emitStub.restore();
      });

      it('sets requestedSearchTerm to undefined on autoComplete success', function() {
        sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.success({ results: 1, metadata: 1 });
        });
        autoComplete.requestedSearchTerm = 'foo';
        inputElement.val('card');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);
        expect(autoComplete.requestedSearchTerm).toBe(undefined);
      });

      it('sets requestedSearchTerm to undefined on autoComplete success', function() {
        sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.error({ results: 1, metadata: 1 });
        });
        autoComplete.requestedSearchTerm = 'foo';
        inputElement.val('card');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);
        expect(autoComplete.requestedSearchTerm).toBe(undefined);
      });

      it('does not emit results on success if _searchSubmitted is true', function() {
        sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.success({ results: 1, metadata: 1 });
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('card');
        autoComplete.autoComplete();
        autoComplete._searchSubmitted = true;
        clock.tick(autoCompleteDelay);

        expect(emitStub.callCount).toBe(0);
      });

      it('does not emit results on success if currentSearchTerm !== requestedSearchTerm', function() {
        sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.success({ results: 1, metadata: 1 });
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('foo');
        autoComplete.autoComplete();
        autoComplete.currentSearchTerm = 'bar';
        clock.tick(autoCompleteDelay);

        expect(emitStub.callCount).toBe(0);
      });

      it('emits results on success is not searching and input value is unchanged', function() {
        sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.success({ results: 1, metadata: 1 });
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('foo');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);
        expect(emitStub.callCount).toBe(1);
      });

      it('sets the internal _waitingForResults before and after call to autoComplete error', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          expect(autoComplete._waitingForResults).toBe(true);
          options.error();
          expect(autoComplete._waitingForResults).toBe(false);
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('card');

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        stub.restore();
        emitStub.restore();
      });

      it('emits and error event when autoComplete fails', function() {
        var stub = sinon.stub(autoComplete._api, 'autoComplete', function(term, options) {
          options.error();
        });
        var emitStub = sinon.stub(autoComplete, 'emit');
        inputElement.val('card');

        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(emitStub.calledWith('error')).toBe(true);

        stub.restore();
        emitStub.restore();
      });
    });

    describe('clear()', function() {

      it('removes the markup from the dom', function() {
        autoComplete.searchResults = $('<div />');
        var stub = sinon.stub(autoComplete.searchResults, 'empty');
        autoComplete.clear();
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('does not emit an event by default', function() {
        var stub = sinon.stub(autoComplete, 'emit');
        autoComplete.clear();
        expect(stub.callCount).toBe(0);
      });

      it('emit an event if emitEvent is true', function() {
        var stub = sinon.stub(autoComplete, 'emit');
        autoComplete.clear(true);
        expect(stub.callCount).toBe(1);
      });

    });

    describe('render()', function() {

      var results = [
        { id: 12, name: 'Pontypridd' },
        { id: 13, name: 'Cardiff', container: 'Cardiff' }
      ];

      it('appends the search results to the container', function() {
        autoComplete.currentSearchTerm = 'foo';
        autoComplete.render(results);
        expect(container.find('ul li').length).toEqual(results.length);
      });

      it('highlights the search term for each entry', function() {
        var stub = sinon.stub(autoComplete, 'highlightTerm');
        autoComplete.currentSearchTerm = 'foo';
        autoComplete.render(results);
        expect(stub.calledTwice).toBe(true);
        stub.restore();
      });

      it('uses the name and container properties to render label', function() {
        autoComplete.currentSearchTerm = 'foo';
        autoComplete.render(results);
        expect(container.find('ul li:eq(1) a').text()).toEqual('Cardiff, Cardiff');
      });

      it('highlights the result on mouse over', function() {
        autoComplete.currentSearchTerm = 'foo';
        autoComplete.render(results);

        var stub = sinon.stub(autoComplete, 'highlightSearchResultByIndex');
        var li = container.find('ul li:eq(0)');

        li.trigger('mouseover');
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
    }); // render
  }); // auto-complete
});
