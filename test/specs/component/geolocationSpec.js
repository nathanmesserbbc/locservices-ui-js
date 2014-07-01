/*global define, beforeEach, afterEach */
define([
  'jquery',
  'locservices/ui/component/geolocation',
  'locservices/ui/translations/en',
  'locservices/core/geolocation'
], function($, Geolocation, En, geo) {

  var geolocation, container, translations;

  beforeEach(function() {
    container = $('<div />');
    translations = new En();
    geolocation = new Geolocation({
      container: container,
      translations: translations
    });

    container.appendTo($('body'));
  });

  afterEach(function() {
    container.remove();
  });

  describe('Geolocation', function() {

    it('sets the component id to geolocation', function() {
      expect(geolocation.componentId).toBe('geolocation');
    });

    it('appends the markup to the container', function() {
      expect(container.find('button').length).toBe(1);
    });

    it('sets the button label using the translations instance', function() {
      var stub = sinon.stub(translations, 'get');
      geolocation = new Geolocation({
        container: container,
        translations: translations
      });
      expect(stub.calledOnce).toBe(true);
      stub.restore();
    });

    it('calls getCurrentPosition on button click', function() {
      var stub = sinon.stub(geo, 'getCurrentPosition');
      geolocation._button.trigger('click');
      expect(stub.calledOnce).toBe(true);
      stub.restore();
    });

//    describe('onSuccess() success handled', function() {
//      var stub = sinon.stub(geolocation._api, 'reverseGeocode');
//      var position = {
//        coords: {
//          longitude: 0,
//          latitude: 0
//        }
//      };
//      geolocation.onSuccess(position);
//      expect(stub.calledOnce).toBe(true);
//    });
  });
});