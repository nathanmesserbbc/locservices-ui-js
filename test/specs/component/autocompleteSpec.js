/*global define, describe, it, expect, beforeEach, afterEach */
define([
  'jquery',
  'locservices/ui/component/autocomplete',
  'locservices/ui/translations/en',
  'locservices/core/api'
], function($, AutoComplete, En, Api) {

  var api, translations, autoComplete, container, inputElement;

  beforeEach(function() {
    api = new Api();
    translations = new En();
    container = $('<div />');
    inputElement = $('<input type="text" />');
    autoComplete = new AutoComplete({
      api: api,
      translations: translations,
      container: container,
      element: inputElement
    });
  });

  afterEach(function() {

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

    describe('binds key events', function() {
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

  });

});
