/*global describe, it, beforeEach */

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/controller/primary',
  'locservices/ui/translations/en'
], function($, Api, Controller, Translations) {

  describe('The primary search', function() {
    'use strict';

    var api,
        container,
        controller,
        translations;

    describe('constructor', function() {

      beforeEach(function() {
        api = new Api();
        container = $('<div />');
        translations = new Translations();
        controller = new Controller({
          api: api,
          container: container,
          translations: translations
        });
      });

      it('should set the namespace', function() {
        expect(controller.namespace).toBe('locservices:ui');
      });

      it('should set the search', function() {
        expect(controller.search).toBeDefined();
      });

      it('should set the geolocation', function() {
        expect(controller.geolocation).toBeDefined();
      });

      it('should set the message', function() {
        expect(controller.message).toBeDefined();
      });

      it('should set the results', function() {
        expect(controller.results).toBeDefined();
      });

      it('should set the userLocations', function() {
        expect(controller.userLocations).toBeDefined();
      });

      it('should set the closeButton', function() {
        expect(controller.closeButton).toBeDefined();
      });

      it('should require api option', function() {
        var failure = function() {
          container = $('<div />');
          translations = new Translations();
          controller = new Controller({
            container: container,
            translations: translations
          });
        };
        expect(failure).toThrow(new Error('Primary Controller requires an api option.'));
      });

      it('should require translations option', function() {
        var failure = function() {
          api = new Api();
          container = $('<div />');
          controller = new Controller({
            api: api,
            container: container
          });
        };
        expect(failure).toThrow(new Error('Primary Controller requires an translations option.'));
      });

      it('should require container option', function() {
        var failure = function() {
          api = new Api();
          translations = new Translations();
          controller = new Controller({
            api: api,
            translations: translations
          });
        };
        expect(failure).toThrow(new Error('Primary Controller requires an container option.'));
      });
    });
  });
});
