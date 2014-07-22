/*global describe, it, beforeEach, afterEach */

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

      it('should create preferredLocation passing an api', function() {
        expect(typeof controller.preferredLocation).toEqual('object');
        expect(typeof controller.preferredLocation.api).toEqual('object');
      });

      it('should create bbcCookies', function() {
        expect(typeof controller.bbcCookies).toEqual('object');
      });

      it('should create cookies passing api', function() {
        expect(typeof controller.cookies).toEqual('object');
      });

      it('should set cookiesColdStartKey to \'locserv_uics\'', function() {
        expect(controller.cookiesColdStartKey).toEqual('locserv_uics');
      });
    });

    describe('events', function() {

      it('should emit an active event on internal error', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:error');
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:active');

        $.emit.restore();
      });

      it('should emit on geolocation active event when it becomes available', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:geolocation:available');
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:geolocation:available');

        $.emit.restore();
      });

      it('should update itself if geolocation is available', function() {
        var spy = sinon.spy(controller.container, 'addClass');
        $.emit('locservices:ui:component:geolocation:available');
        expect(spy.getCall(0).args[0]).toEqual('ls-ui-ctrl-geolocation');

        controller.container.addClass.restore();
      });

      it('should emit an active event when search becomes focused', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:search:focus');
        expect(spy.getCall(1).args[0]).toEqual('locservices:ui:controller:active');

        $.emit.restore();
      });

      it('should call setLocation when a location is selected via geolocation', function() {
        var location = { id: 'foo' };
        var stub = sinon.stub(controller, 'selectLocation');
        $.emit('locservices:ui:component:geolocation:location', [location]);
        expect(stub.args[0][0]).toEqual(location);
      });

      it('should call setLocation when a location is selected via search results', function() {
        var location = { id: 'foo' };
        var stub = sinon.stub(controller, 'selectLocation');
        $.emit('locservices:ui:component:search_results:location', [location]);
        expect(stub.args[0][0]).toEqual(location);
      });

      it('should call setLocation when a location is selected via auto complete', function() {
        var location = { id: 'foo' };
        var stub = sinon.stub(controller, 'selectLocation');
        $.emit('locservices:ui:component:auto_complete:location', [location]);
        expect(stub.args[0][0]).toEqual(location);
      });

      it('should call setLocation when a location is selected via auto complete', function() {
        var location = { id: 'foo' };
        var stub = sinon.stub(controller, 'selectLocation');
        $.emit('locservices:ui:component:user_locations:location', [location]);
        expect(stub.args[0][0]).toEqual(location);
      });

      it('should emit an inactive event when the close button is clicked', function() {
        var spy = sinon.spy($, 'emit');
        $.emit('locservices:ui:component:close_button:clicked');
        expect(spy.getCall(2).args[0]).toEqual('locservices:ui:controller:inactive');

        $.emit.restore();
      });

    }); // events

    describe('selectLocation()', function() {

      var location;
      var stubShouldColdStartDialogBeDisplayed;

      beforeEach(function() {
        location = {
          id: '2644160',
          name: 'Llandaff',
          container: 'Cardiff',
          placeType: 'settlement',
          country: 'GB'
        };
        stubShouldColdStartDialogBeDisplayed = sinon.stub(controller, 'shouldColdStartDialogBeDisplayed').returns(false);
      });

      afterEach(function() {
        container.find('.ls-ui-comp-dialog').remove();
      });

      it('should emit an event when not displaying cold start dialog', function() {
        var spy = sinon.spy($, 'emit');
        controller.selectLocation(location);
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:location');
        expect(spy.getCall(0).args[1]).toEqual([location]);
        $.emit.restore();
      });

      it('should not emit location event if displaying cold start dialog', function() {
        var spy = sinon.spy($, 'emit');
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        expect(spy.callCount).toEqual(0);
        $.emit.restore();
      });

      it('should display cold start dialog when required', function() {
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(1);
      });

      it('should display cold start dialog with expected location name', function() {
        var message;
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        message = container.find('.ls-ui-comp-dialog p').text();
        expect(message.indexOf(location.name)).toBeGreaterThan(-1);
      });

      it('should not display cold start dialog if location is not preferrable', function() {
        location = {
          id: 'CF5 2YQ',
          name: 'CF5 2YQ',
          placeType: 'postcode',
          country: 'GB'
        };
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(0);
      });

      it('should emit location event after confirming dialog', function() {
        var spy = sinon.spy($, 'emit');
        stubShouldColdStartDialogBeDisplayed.returns(true);
        sinon.stub(controller.preferredLocation, 'set', function(id, options) {
          options.success(true);
        });
        controller.selectLocation(location);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(1);
        container.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:location');
        expect(spy.getCall(0).args[1]).toEqual([location]);
        $.emit.restore();
      });

      it('should emit location event after confirming dialog and failing to set cookie', function() {
        var spy = sinon.spy($, 'emit');
        stubShouldColdStartDialogBeDisplayed.returns(true);
        sinon.stub(controller.preferredLocation, 'set', function(id, options) {
          options.error(true);
        });
        controller.selectLocation(location);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(1);
        container.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:location');
        expect(spy.getCall(0).args[1]).toEqual([location]);
        $.emit.restore();
      });

      it('should set cookie after canceling dialog', function() {
        var stub = sinon.stub(controller.cookies, 'set');
        var args;
        var actualExpires;
        var expectedExpires;
        var expectedCookieDomain;

        expectedExpires = new Date();
        expectedExpires.setFullYear(expectedExpires.getFullYear() + 1);
        expectedCookieDomain = '.foo.bar';

        sinon.stub(controller.preferredLocation, 'getCookieDomain').returns(expectedCookieDomain);

        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        container.find('.ls-ui-comp-dialog-cancel button').trigger('click');

        args = stub.getCall(0).args;
        actualExpires = args[2];
        actualExpires = new Date(actualExpires);
        expect(args[0]).toEqual('locserv_uics');
        expect(args[1]).toEqual('1');
        expect(actualExpires.getTime() > (expectedExpires.getTime() - 5000)).toEqual(true);
        expect(args[3]).toEqual('/');
        expect(args[4]).toEqual(expectedCookieDomain);
      });

      it('should emit location event after canceling dialog', function() {
        var spy = sinon.spy($, 'emit');
        stubShouldColdStartDialogBeDisplayed.returns(true);
        controller.selectLocation(location);
        expect(container.find('.ls-ui-comp-dialog').length).toEqual(1);
        container.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:controller:location');
        expect(spy.getCall(0).args[1]).toEqual([location]);
        $.emit.restore();
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
