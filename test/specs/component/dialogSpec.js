/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/dialog',
  'locservices/ui/translations/en'
], function($, Dialog, En) {

  describe('The dialog component', function() {
    'use strict';

    var dialog,
        translations,
        container,
        element;

    beforeEach(function() {
      container = $('<div />');
      element = $('<div/>');
      translations = new En();
      dialog = new Dialog({
        translations: translations,
        container: container
      });
    });

    describe('constructor', function() {

      it('should set this.componentId to "dialog"', function() {
        expect(dialog.componentId).toBe('dialog');
      });

      it('should set this.eventNamespace to "locservices:ui:component:dialog"', function() {
        expect(dialog.eventNamespace).toBe('locservices:ui:component:dialog');
      });

    }); // constructor

    describe('render()', function() {

      it('displays the expected message', function() {
        var expectedMessage = 'This is a test message.';
        dialog.render(element, expectedMessage);
        expect(element.find('p').text()).toBe(expectedMessage);
      });

      it('calls confirm callback when clicking confirm', function() {
        var hasCalledCallback;
        dialog.render(element, 'Test', function() {
          hasCalledCallback = true;
        });
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(hasCalledCallback).toBe(true);
      });

      it('calls cancel callback when clicking cancel', function() {
        var hasCalledCallback;
        dialog.render(element, 'Test', undefined, function() {
          hasCalledCallback = true;
        });
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(hasCalledCallback).toBe(true);
      });

      it('clicking confirm removes dialog', function() {
        dialog.render(element, 'Test');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      it('clicking cancel removes dialog', function() {
        dialog.render(element, 'Test');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    }); // render

  }); // component

});
