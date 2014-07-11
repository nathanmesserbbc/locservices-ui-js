/*global define, beforeEach, afterEach */
define(['locservices/ui/utils/stats', 'jquery'], function(Stats, $) {

  // mock echo client interface
  var echoClient = {
    userActionEvent: function() {

    }
  };

  describe('The Stats', function() {

    describe('constructor', function() {

      it('throws an error if an echo client is not passed in as an options', function() {
        expect(function() { new Stats(123); }).toThrow();
      });

      it('registered a default namespace for locservices:ui', function() {
        var stub = sinon.stub(Stats.prototype, 'registerNamespace');
        var ns = 'locservices:ui';
        new Stats(echoClient);

        expect(stub.calledWith(ns)).toBe(true);
        stub.restore();
      });

    });

    describe('registerNamespace() method', function() {

      var stats, stub, ns;

      ns = 'locservices:ui';

      beforeEach(function() {
        stub = sinon.stub(echoClient, 'userActionEvent');
        stats = new Stats(echoClient);
      });

      afterEach(function() {
        stub.restore();
      });

      it('only registers listeners once per namespace', function() {
        var onStub = sinon.stub($, 'on');
        expect(stats.registerNamespace('foo')).toBe(true);
        expect(stats._registeredNamespaces['foo']).toBe(true);
        expect(stats.registerNamespace('foo')).toBe(false);
        onStub.restore();
      });

      it('registers an event for the geolocation:location event', function() {
        var location = { id: 123 };
        var labels = { locationId: location.id };
        $.emit(ns + ':component:geolocation:location', [location]);
        expect(stub.calledWith('geolocation_location', 'locservicesui', labels)).toBe(true);
      });

    });

  });
});
