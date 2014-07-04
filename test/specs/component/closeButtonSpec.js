/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/close_button',
  'locservices/ui/translations/en'
], function($, CloseButton, En) {

  describe('A close button', function() {
    'use strict';

    var button,
        translations;

    describe('constructor', function() {

      beforeEach(function() {
        translations = new En();
        button = new CloseButton({
          translations: translations,
          container: $('<div />')
        });
      });

      it('should set this.componentId to "close_button"', function() {
        expect(button.componentId).toBe('close_button');
      });

      it('should set this.eventNamespace to "locservices:ui:component:close_button"', function() {
        expect(button.eventNamespace).toBe('locservices:ui:component:close_button');
      });

      it('should throw an exception if options do not api an element', function() {
        var failure = function() {
          new CloseButton({
            translations: translations,
            container: null
          });
        };
        expect(failure).toThrow();
      });
    });

    describe('click', function() {

      beforeEach(function() {
        translations = new En();
        button = new CloseButton({
          translations: translations,
          container: $('<div />')
        });
      });

      it('should emit an event when clicked', function() {
        var spy = sinon.spy($, 'emit');
        button.button.trigger('click');
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:component:close_button:clicked');
        $.emit.restore();
      });

    });
  });
});
