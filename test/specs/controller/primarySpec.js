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

    describe('events', function() {

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

      it('should emit an active event on internal error', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:error');
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:active');

        $.emit.restore();
      });

      it('should update itself if geolocation is available', function() {
        var spy = sinon.spy(controller.container, 'addClass');
        $.emit('locservices:ui:component:geolocation:available');
        expect(spy.getCall(0).args[0]).toEqual('li-ui-ctrl-geolocation');

        controller.container.addClass.restore();
      });

      it('should emit an active event when search becomes focused', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:search:focus');
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:active');

        $.emit.restore();
      });

      it('should emit a location when located using geolocation', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:geolocation:location', [{}]);
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:location');

        $.emit.restore();
      });

      it('should emit a location when a location is selected from the results', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:search_results:location', [{}]);
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:location');

        $.emit.restore();
      });

      it('should emit a location when a location is selected from the auto complete', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:auto_complete:location', [{}, '']);
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:location');

        $.emit.restore();
      });

      it('should emit a location when a location is selected from the user locations', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:user_locations:location', [{}]);
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:location');

        $.emit.restore();
      });

      it('should emit an inactive event when the close button is clicked', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:close_button:clicked');
        expect(spy.getCall(2).args[0]).toEqual('locservices:ui:controller:inactive');

        $.emit.restore();
      });
    });
  });
});
