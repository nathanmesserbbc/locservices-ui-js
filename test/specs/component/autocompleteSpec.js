/*global define, describe, it, expect, beforeEach, afterEach */
define([
  'jquery',
  'locservices/ui/component/autocomplete',
  'locservices/ui/translations/en',
  'locservices/core/api'
], function($, AutoComplete, En, Api) {

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

  describe('The AutoComplete', function() {

    describe('constructor', function() {
      it('sets the componentId to autocomplete', function() {
        expect(autoComplete.componentId).toEqual('autocomplete');
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
        $(document).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });
      it('for the enter key', function() {
        var stub = sinon.stub(autoComplete, 'enterKeyHandler');
        var event = $.Event('keydown', { keyCode: 13 });
        $(document).trigger(event);
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      // @todo complete these - it should test the case statement in the constructor
//      it('for the up arrow', function() {
//        var stub = sinon.stub(autoComplete, 'highlightPrevSearchResult');
//        var event = $.Event('keydown', { keyCode: 38 });
//        $(document).trigger(event);
//        expect(stub.calledOnce).toBe(true);
//        stub.restore();
//      });
//      it('for the down arrow', function() {
//        var stub = sinon.stub(autoComplete, 'highlightNextSearchResult');
//        var event = $.Event('keydown', { keyCode: 40 });
//        $(document).trigger(event);
//        expect(stub.calledOnce).toBe(true);
//        stub.restore();
//      });
    });

    describe('events', function() {

      it('should react to search starting', function() {
        expect(autoComplete._searchSubmitted).toBe(false);

        $.emit('locservices:ui:component:search:start');
        expect(autoComplete._searchSubmitted).toBe(true);
      });
    });

    describe('prepareSearchTerm()', function() {
      it('removes all spaces from the right and left of the search term', function() {
        expect(autoComplete.prepareSearchTerm('  foo  ')).toEqual('foo');
      });
    });

    describe('isValidSearchTerm()', function() {
      it('returns false for invalid search terms', function() {

        var terms = [123, true, false, {}, 'C'];
        var assertionCount = 0;

        $.each(terms, function(i, term) {
          expect(autoComplete.isValidSearchTerm(term)).toBe(false);
          assertionCount++;
        });

        // test all the terms array has been tested
        expect(assertionCount).toEqual(terms.length);
      });
      it('returns true for invalid search terms', function() {

        var terms = ['Cardiff', ' Card  ', 'ca'];
        var assertionCount = 0;

        $.each(terms, function(i, term) {
          expect(autoComplete.isValidSearchTerm(term)).toBe(true);
          assertionCount++;
        });

        // test all the terms array has been tested
        expect(assertionCount).toEqual(terms.length);
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

      it('always prepares the search term before using it', function() {
        var stub = sinon.stub(autoComplete, 'prepareSearchTerm');
        autoComplete.autoComplete();
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('calls the api after the prefigured delay', function() {
        var stub = sinon.stub(window, 'setTimeout');
        inputElement.val('card');
        autoComplete.autoComplete();
        clock.tick(autoCompleteDelay);

        expect(stub.calledOnce).toBe(true);
        stub.restore();
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

      it('sets the internal _waitingForResults before and after call to autoComplete', function() {
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
  });

  describe('clearSearchResults()', function() {
    it('removes the markup from the dom', function() {
      autoComplete.searchResults = $('<div />');
      var stub = sinon.stub(autoComplete.searchResults, 'empty');
      autoComplete.clear();
      expect(stub.calledOnce).toBe(true);
      stub.restore();
    });
  });

  describe('renderSearchResults()', function() {

    var results = [
      { id: 12, name: 'Pontypridd' },
      { id: 13, name: 'Cardiff', container: 'Cardiff' }
    ];

    it('appends the search results to the container', function() {
      autoComplete.currentSearchTerm = 'foo';
      autoComplete.renderSearchResults(results);
      expect(container.find('ul li').length).toEqual(results.length);
    });

    it('highlights the search term for each entry', function() {
      var stub = sinon.stub(autoComplete, 'highlightTerm');
      autoComplete.currentSearchTerm = 'foo';
      autoComplete.renderSearchResults(results);
      expect(stub.calledTwice).toBe(true);
      stub.restore();
    });

    it('uses the name and container properties to render label', function() {
      autoComplete.currentSearchTerm = 'foo';
      autoComplete.renderSearchResults(results);
      expect(container.find('ul li:eq(1) a').text()).toEqual('Cardiff, Cardiff');
    });

    it('highlights the result on mouse over', function() {
      autoComplete.currentSearchTerm = 'foo';
      autoComplete.renderSearchResults(results);

      var stub = sinon.stub(autoComplete, 'highlightSearchResultByIndex');
      var li = container.find('ul li:eq(0)');

      li.trigger('mouseover');
      expect(stub.calledOnce).toBe(true);
      stub.restore();
    });
  });
});
