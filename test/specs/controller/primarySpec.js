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

    describe('constructor', function() {

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
      /*
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
        $.emit('locservices:ui:component:auto_complete:location', [{}]);
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
      */
    }); // events

    describe('selectLocation()', function() {

      var location;
      var stubShouldColdStartDialogBeDisplayed;

      beforeEach(function() {
        location = {
          id: 'CF5'
        };
        stubShouldColdStartDialogBeDisplayed = sinon.stub(controller, 'shouldColdStartDialogBeDisplayed').returns(false);
      });

      it('should emit an event when not displaying cold start dialog', function() {
        var spy = sinon.spy($, 'emit');
        controller.selectLocation(location);
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:location');
        expect(spy.getCall(0).args[1]).toEqual([location]);
        $.emit.restore();
      });

      it('should not emit location event id displaying cold start dialog', function() {
        var spy = sinon.spy($, 'emit');
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        expect(spy.callCount).toEqual(0);
        $.emit.restore();
      });

      it('should display cold start dialog when required', function() {
        stubShouldColdStartDialogBeDisplayed.returns(true);
console.log('container', container.find('.ls-ui-comp-dialog').html());
console.log('-------------');
        controller.selectLocation(location);
console.log('container', container.find('.ls-ui-comp-dialog').length);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(1);
      });

    });

    describe('shouldColdStartDialogBeDisplayed()', function() {

      var stubPreferredLocation;
      var stubBBCCookiesPersonalisationDisabled;
      var stubCookiesIsSupported;
      var stubCookiesGet;

      beforeEach(function() {
        stubPreferredLocation = sinon.stub(controller.preferredLocation, 'isSet').returns(false);
        stubBBCCookiesPersonalisationDisabled = sinon.stub(controller.bbcCookies, 'isPersonalisationDisabled').returns(false);
        stubCookiesIsSupported = sinon.stub(controller.cookies, 'isSupported').returns(true);
        stubCookiesGet = sinon.stub(controller.cookies, 'get').returns(null);
      });

      it('should return true when expected', function() {
        expect(controller.shouldColdStartDialogBeDisplayed()).toEqual(true);
      });

      it('should return false if preferred location is set', function() {
        stubPreferredLocation.returns(true);
        expect(controller.shouldColdStartDialogBeDisplayed()).toEqual(false);
      });

      it('should return false if personalisation cookies are disabled', function() {
        stubBBCCookiesPersonalisationDisabled.returns(true);
        expect(controller.shouldColdStartDialogBeDisplayed()).toEqual(false);
      });

      it('should return false if cookies are not supported', function() {
        stubCookiesIsSupported.returns(false);
        expect(controller.shouldColdStartDialogBeDisplayed()).toEqual(false);
      });

      it('should return false if client has previously declined cold start', function() {
        stubCookiesGet.returns('1');
        expect(controller.shouldColdStartDialogBeDisplayed()).toEqual(false);
      });

    });

  }); // module
});
