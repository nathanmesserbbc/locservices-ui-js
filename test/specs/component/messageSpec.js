/*global describe, beforeEach, afterEach, locservices, it:false*/

define([
  'jquery',
  'locservices/ui/component/message',
  'locservices/ui/translations/en'
], function($, Message, En) {

  describe('The message', function() {
    'use strict';

    var message,
        translations;

    describe('constructor', function() {

      beforeEach(function() {
        translations = new En();
        message = new Message({
          translations: translations,
          container: $('<div />')
        });
      });

      it('should set this.componentId to "message"', function() {
        expect(message.componentId).toBe('message');
      });

      it('should set this.eventNamespace to "locservices:ui:component:message"', function() {
        expect(message.eventNamespace).toBe('locservices:ui:component:message');
      });
    });

    describe('message', function() {

      var container;

      beforeEach(function() {
        container = $('<div />');
        translations = new En();
        message = new Message({
          translations: translations,
          container: container
        });
      });

      it('should set the content', function() {
        message.set('Sample message');
        expect(container.text()).toBe('Sample message');
        expect(container.hasClass('active')).toBe(true);
      });

      it('should remove the content', function() {
        message.set('Sample message');
        expect(container.text()).toBe('Sample message');
        message.clear();
        expect(container.text()).toBe('');
        expect(container.hasClass('active')).toBe(false);
      });

    });

    describe('events', function() {

      var container;

      beforeEach(function() {
        container = $('<div />');
        translations = new En();
        message = new Message({
          translations: translations,
          container: container,
          eventNamespace: 'message-test'
        });
      });

      it('should respond to errors', function() {
        expect(container.text()).toBe('');
        $.emit('message-test:error', ['An emitted error']);
        expect(container.text()).toBe('An emitted error');
        expect(container.hasClass('active')).toBe(true);
      });

      it('should remove contents after end events', function() {
        message.set('Detecting your location');
        $.emit('message-test:component:message:end', 'An emitted error');
        expect(container.text()).toBe('');
        expect(container.hasClass('active')).toBe(false);
      });

    });

  });
});
