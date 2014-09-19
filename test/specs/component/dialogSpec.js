/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/dialog',
  'locservices/ui/component/component',
  'locservices/ui/translations/en'
], function($, Dialog, Component, En) {

  describe('The dialog component', function() {
    'use strict';

    var element;
    var translations = new En();

    beforeEach(function() {
      element = $('<div/>');
    });

    describe('constructor', function() {

      it('calls setComponentOptions()', function() {
        var setComponentOptions = sinon.spy(Component.prototype, 'setComponentOptions');
        var expectedOptions = {
          container: element,
          translations: translations,
          message: 'A message.',
          componentId: 'foo'
        };
        new Dialog(expectedOptions);
        expect(setComponentOptions.callCount).toBe(1);
        expect(setComponentOptions.args[0][0]).toBe(expectedOptions);
        Component.prototype.setComponentOptions.restore();
      });

      it('displays the expected message', function() {
        var expectedMessage = 'This is a test message.';
        new Dialog({
          container: element,
          translations: translations,
          message: expectedMessage
        });
        expect(element.find('p').text()).toBe(expectedMessage);
      });

      it('displays the expected message when message includes html', function() {
        var expectedMessage = 'This is a <strong>html</strong> test message.';
        new Dialog({
          container: element,
          translations: translations,
          message: expectedMessage
        });
        expect(element.find('p').children().length).toBe(1);
      });

      it('displays the expected confirm label', function() {
        var expectedLabel = 'Foo';
        new Dialog({
          container: element,
          translations: translations,
          confirmLabel: expectedLabel
        });
        expect(element.find('.ls-ui-comp-dialog-confirm button').text()).toBe(expectedLabel);
      });

      it('displays the expected cancel label', function() {
        var expectedLabel = 'Bar';
        new Dialog({
          container: element,
          translations: translations,
          cancelLabel: expectedLabel
        });
        expect(element.find('.ls-ui-comp-dialog-cancel button').text()).toBe(expectedLabel);
      });

      it('calls confirm callback when clicking confirm', function() {
        var hasCalledCallback;
        new Dialog({
          container: element,
          translations: translations,
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
          translations: translations,
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
          translations: translations,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      it('clicking cancel removes dialog', function() {
        new Dialog({
          container: element,
          translations: translations,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        element.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      /*

      // @todo fix this (does not pass in phantomjs)

      it('sets focus to the confirm button', function() {
        element.addClass('test-attached-to-dom');
        $('body').append(element);
        new Dialog({
          container: element,
          translations: translations,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog-confirm button').is(':focus')).toBe(true);
        $('.test-attached-to-dom').detach();
      });
      */

      it('scrolls the dialog container into view', function() {
        var stub, domEl, spy;

        domEl = element.get(0);
        spy = sinon.spy(domEl, 'scrollIntoViewIfNeeded');
        stub = sinon.stub(element, 'get');
        stub.withArgs(0).returns(domEl);

        new Dialog({
          container: element,
          translations: translations,
          message: 'Test'
        });

        expect(spy.calledOnce).toBe(true);

        stub.restore();
      });

    }); // constructor

    describe('remove()', function() {

      it('removes the dialog from the container', function() {
        var dialog = new Dialog({
          container: element,
          translations: translations,
          message: 'Test'
        });
        expect(element.find('.ls-ui-comp-dialog').length).toBe(1);
        dialog.remove();
        expect(element.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    }); // remove

  }); // component

});
