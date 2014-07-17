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

    describe('registerNamespace()', function() {

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

      describe('registers auto_complete events for', function() {
        it('location selected event', function() {
          var location = { id: 123 };
          var expectedLabels = {
            locationId: location.id,
            searchTerm: 'foo',
            searchTermLength: 3
          };
          $.emit(ns + ':component:auto_complete:location', [location, 'foo']);
          expect(stub.calledWith('auto_complete_location', 'locservicesui', expectedLabels)).toBe(true);
        });
      });

      describe('registers geolocation events for', function() {

        it('the geolocation:location event', function() {
          var location = { id: 123 };
          var labels = { locationId: location.id };
          $.emit(ns + ':component:geolocation:location', [location]);
          expect(stub.calledWith('geolocation_location', 'locservicesui', labels)).toBe(true);
        });

        it('the geolocation error of browser denied permissions', function() {
          var error = { code: 'geolocation.error.browser.permission' };
          $.emit(ns + ':component:geolocation:error', [error]);
          expect(stub.calledWith('geolocation_denied', 'locservicesui')).toBe(true);
        });

        it('a geolocation button click', function() {
          $.emit(ns + ':component:geolocation:click');
          expect(stub.calledWith('geolocation_click', 'locservicesui')).toBe(true);
        });
      });

      describe('registers user_locations events for', function() {
        it('the main_select event', function() {
          var locationId = 123;
          var labels = { locationId: 123 };
          $.emit(ns + ':component:user_locations:main_select', [locationId]);
          expect(stub.calledWith('user_locations_location_main_select', 'locservicesui', labels)).toBe(true);
        });
        it('the user_locations location event', function() {
          var location = { id: 123 };
          var labels = { locationId: 123 };
          $.emit(ns + ':component:user_locations:location', [location]);
          expect(stub.calledWith('user_locations_location_select', 'locservicesui', labels)).toBe(true);
        });
      });
    });

  });
});
