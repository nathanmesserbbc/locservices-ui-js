/*global describe, beforeEach, it:false*/

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
        expect(message.element.text()).toBe('Sample message');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should remove the content', function() {
        message.set('Sample message');
        expect(message.element.text()).toBe('Sample message');
        message.clear();
        expect(message.element.text()).toBe('');
        expect(message.element.hasClass('ls-ui-active')).toBe(false);
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
        expect(message.element.text()).toBe('');
        $.emit('message-test:error', ['An emitted error']);
        expect(message.element.text()).toBe('An emitted error');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should set content on when search results are available', function() {
        message.set('');
        $.emit('message-test:component:search:results', [[], { search: 'Cardiff', totalResults: 1 }]);
        expect(message.element.text()).toBe('Search results for "Cardiff"');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should set content on when search results returns nothing', function() {
        message.set('');
        $.emit('message-test:component:search:results', [[], { search: 'Cardiff', totalResults: 0 }]);
        expect(message.element.text()).toBe('We could not find any results for "Cardiff"');
        expect(message.element.hasClass('ls-ui-active')).toBe(true);
      });

      it('should remove content on search completes', function() {
        message.set('Detecting your location');
        $.emit('message-test:component:search:end');
        expect(message.element.text()).toBe('');
        expect(message.element.hasClass('ls-ui-active')).toBe(false);
      });

      it('should remove content on geolocation end', function() {
        message.set('');
        $.emit('message-test:component:search:end');
        expect(message.element.text()).toBe('');
        expect(message.element.hasClass('ls-ui-active')).toBe(false);
      });

      it('should remove content on auto complete rendering results', function() {
        message.set('Detecting your location');
        $.emit('message-test:component:auto_complete:render');
        expect(message.element.text()).toBe('');
        expect(message.element.hasClass('ls-ui-active')).toBe(false);
      });

    });

  });
});
