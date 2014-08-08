/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/dialog',
  'locservices/ui/component/component'
], function($, Dialog, Component) {

  describe('The dialog component', function() {
    'use strict';

    var element;

    beforeEach(function() {
      element = $('<div/>');
    });

    describe('constructor', function() {

      it('calls setNamespaceOptions()', function() {
        var setNamespaceOptions = sinon.spy(Component.prototype, 'setNamespaceOptions');
        var expectedOptions = {
          container: element,
          message: 'A message.',
          componentId: 'foo'
        };
        new Dialog(expectedOptions);
        expect(setNamespaceOptions.callCount).toBe(1);
        expect(setNamespaceOptions.args[0][0]).toBe(expectedOptions);
        Component.prototype.setNamespaceOptions.restore();
      });

      it('displays the expected message', function() {
        var expectedMessage = 'This is a test message.';
        new Dialog({
          container: element,
          message: expectedMessage
        });
        expect(element.find('p').text()).toBe(expectedMessage);
      });

      it('displays the expected message when message includes html', function() {
        var expectedMessage = 'This is a <strong>html</strong> test message.';
        new Dialog({
          container: element,
          message: expectedMessage
        });
        expect(element.find('p').children().length).toBe(1);
      });

      it('displays the expected confirm label', function() {
        var expectedLabel = 'Foo';
        new Dialog({
          container: element,
          confirmLabel: expectedLabel
        });
        expect(element.find('.ls-ui-comp-dialog-confirm button').text()).toBe(expectedLabel);
      });

      it('displays the expected cancel label', function() {
        var expectedLabel = 'Bar';
        new Dialog({
          container: element,
          cancelLabel: expectedLabel
        });
        expect(element.find('.ls-ui-comp-dialog-cancel button').text()).toBe(expectedLabel);
      });

      it('calls confirm callback when clicking confirm', function() {
        var hasCalledCallback;
        new Dialog({
          container: element,
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
          container: element,
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
          container: element,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      it('clicking cancel removes dialog', function() {
        new Dialog({
          container: element,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    }); // render

    describe('remove()', function() {

      it('removes the dialog from the container', function() {
        var dialog = new Dialog({
          container: element,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        dialog.remove();
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    }); // remove

  }); // component

});
