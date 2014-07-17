/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/dialog'
], function($, Dialog) {

  describe('The dialog component', function() {
    'use strict';

    var element;

    beforeEach(function() {
      element = $('<div/>');
    });

    describe('constructor', function() {

      it('displays the expected message', function() {
        var expectedMessage = 'This is a test message.';
        new Dialog({
          element: element,
          message: expectedMessage
        });
        expect(element.find('p').text()).toBe(expectedMessage);
      });

      it('calls confirm callback when clicking confirm', function() {
        var hasCalledCallback;
        new Dialog({
          element: element,
          message: 'Test', 
          confirm: function() {
            hasCalledCallback = true;
          }
        });
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(hasCalledCallback).toBe(true);
      });

      it('calls cancel callback when clicking cancel', function() {
        var hasCalledCallback;
        new Dialog({
          element: element,
          message: 'Test',
          cancel: function() {
            hasCalledCallback = true;
          }
        });
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(hasCalledCallback).toBe(true);
      });

      it('clicking confirm removes dialog', function() {
        new Dialog({
          element: element,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      it('clicking cancel removes dialog', function() {
        new Dialog({
          element: element,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    }); // render

  }); // component

});
