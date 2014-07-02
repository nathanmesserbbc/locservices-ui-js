/*global define, beforeEach, afterEach */
define([
  'jquery',
  'locservices/ui/component/geolocation',
  'locservices/ui/translations/en',
  'locservices/core/geolocation',
  'locservices/core/api'
], function($, Geolocation, En, geo, Api) {

  var geolocation, container, translations, api;

  geo.isSupported = true;
  api = new Api();

  beforeEach(function() {
    container = $('<div />');
    translations = new En();
    geolocation = new Geolocation({
      container: container,
      translations: translations,
      api: api
    });
  });

  afterEach(function() {
    container.remove();
  });

  describe('Geolocation', function() {

    it('throws an error when an api is not present in options', function() {
      var fn = function() {
        geolocation = new Geolocation({
          container: container,
          translations: translations
        });
      };

      expect(fn).toThrow();
    });

    it('sets the component id to geolocation', function() {
      expect(geolocation.componentId).toEqual('geolocation');
    });

    it('uses the translations object to get the translation', function() {
      var stub = sinon.stub(translations, 'get');
      geolocation = new Geolocation({
        container: container,
        translations: translations,
        api: api
      });
      expect(stub.calledOnce).toBe(true);
      stub.restore();
    });

    it('appends the button to the container', function() {
      expect(container.find('button').length).toEqual(1);
    });

    describe('clicking on the button', function() {

      it('calls reverseGeocode', function() {
        var stub = sinon.stub(geolocation, 'reverseGeocode');
        geolocation._button.trigger('click');
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('disables the button', function() {
        var stub = sinon.stub(geolocation, 'reverseGeocode');
        geolocation._button.trigger('click');

        expect(geolocation._button.attr('disabled')).toEqual('disabled');
        expect(geolocation._button.hasClass('disabled')).toBe(true);
        stub.restore();
      });
    });

    describe('reverseGeocode()', function() {
      it('calls geolocation.getCurrentPosition', function() {
        var stub = sinon.stub(geo, 'getCurrentPosition');
        geolocation.reverseGeocode();
        expect(stub.calledOnce).toBe(true);
        stub.restore();
      });

      it('emits a geolocation error when browser geolocation fails', function() {
        var stub = sinon.stub(geo, 'getCurrentPosition', function(success, error) {
          error({ code: 1, message: 'foo' });
        });
        var emitStub = sinon.stub(geolocation, 'emit');
        geolocation.reverseGeocode();

        expect(emitStub.calledOnce).toBe(true);
        expect(emitStub.calledWith('error')).toBe(true);
        stub.restore();
      });

      it('emits a http error when api reverseGeocode fails', function() {
        var geoStub = sinon.stub(geo, 'getCurrentPosition', function(success) {
          success({ coords: { longitude: 0, latitude: 0 }});
        });
        var revStub = sinon.stub(geolocation.api, 'reverseGeocode', function(lat, lon, options) {
          options.error();
        });
        var emitStub = sinon.stub(geolocation, 'emit');

        geolocation.reverseGeocode();

        expect(emitStub.calledOnce).toBe(true);

        var errorObject = emitStub.args[0][1][0];
        expect(errorObject.code).toEqual('geolocation.error.http');

        geoStub.restore();
        revStub.restore();
        emitStub.restore();
      });

      it('emits an error if the location is outside of uk context', function() {
        var geoStub = sinon.stub(geo, 'getCurrentPosition', function(success) {
          success({ coords: { longitude: 0, latitude: 0 }});
        });
        var revStub = sinon.stub(geolocation.api, 'reverseGeocode', function(lat, lon, options) {
          options.success({
            results: [{
              isWithinContext: false
            }]
          });
        });
        var emitStub = sinon.stub(geolocation, 'emit');

        geolocation.reverseGeocode();
        expect(emitStub.calledOnce).toBe(true);

        var errorObject = emitStub.args[0][1][0];
        expect(errorObject.code).toEqual('geolocation.error.outsideContext');

        geoStub.restore();
        revStub.restore();
        emitStub.restore();
      });

      it('emits the geolocation event on success', function() {
        var location = {
          isWithinContext: true,
          id: 123,
          name: 'Pontypridd'
        };
        var geoStub = sinon.stub(geo, 'getCurrentPosition', function(success) {
          success({ coords: { longitude: 0, latitude: 0 }});
        });
        var revStub = sinon.stub(geolocation.api, 'reverseGeocode', function(lat, lon, options) {
          options.success({ results: [location] });
        });
        var emitStub = sinon.stub(geolocation, 'emit');

        geolocation.reverseGeocode();

        expect(emitStub.calledOnce).toBe(true);
        expect(emitStub.calledWith('geolocation:location', [location])).toBe(true);

        geoStub.restore();
        revStub.restore();
        emitStub.restore();
      });

      it('re-enables the button on success', function() {
        var geoStub = sinon.stub(geo, 'getCurrentPosition', function(success) {
          success({ coords: { longitude: 0, latitude: 0 }});
        });
        var revStub = sinon.stub(geolocation.api, 'reverseGeocode', function(lat, lon, options) {
          options.success({ results: [{ isWithinContext: true }] });
        });

        geolocation.reverseGeocode();

        expect(geolocation._button.attr('disabled')).toBe(undefined);
        expect(geolocation._button.hasClass('disabled')).toBe(false);

        geoStub.restore();
        revStub.restore();
      });
    });
  });
});
