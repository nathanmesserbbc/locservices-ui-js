/*global define, beforeEach, afterEach */
define([
  'locservices/ui/utils/stats',
  'locservices/core/recent_locations',
  'jquery'
], function(Stats, RecentLocations, $) {

  // mock echo client interface
  var echoClient = {
    userActionEvent: function() {

    }
  };

  var testLocation = {
    id: 123,
    name: 'Pontypridd',
    container: 'Wales',
    country: 'GB',
    placeType: 'settlement'
  };

  var expectedLabels = {
    locationId: 123,
    locationName: 'Pontypridd, Wales',
    locationPlaceType: 'settlement',
    locationCountry: 'GB'
  };

  var recentLocationsIsSupported = (new RecentLocations()).isSupported();
  if (recentLocationsIsSupported) {
    expectedLabels.addedToRecentLocations = true;
  }

  describe('The Stats', function() {

    it('registers user capability and properties by a single event', function() {
      var stub = sinon.stub(echoClient, 'userActionEvent');
      new Stats(echoClient);

      expect(stub.calledOnce).toBe(true);

      var actionType = stub.args[0][0];
      var labels = stub.args[0][2];

      expect(actionType).toEqual('locservices_user');
      expect(labels.hasOwnProperty('capability_geolocation')).toBe(true);
      expect(labels.hasOwnProperty('capability_local_storage')).toBe(true);
      expect(labels.hasOwnProperty('capability_recent_locations')).toBe(true);
      expect(labels.hasOwnProperty('capability_cookies_enabled')).toBe(true);
      expect(labels.hasOwnProperty('capability_bbccookies_preference_enabled')).toBe(true);
      expect(labels.hasOwnProperty('has_locserv_cookie')).toBe(true);
      expect(labels.hasOwnProperty('has_recent_locations')).toBe(true);
      expect(labels.hasOwnProperty('recent_locations_total')).toBe(true);

      stub.restore();
    });

    it('registers user capabilities and properties only once', function() {

      var stub = sinon.stub(echoClient, 'userActionEvent');
      new Stats(echoClient);
      expect(stub.called).toBe(false);
      stub.restore();
    });

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
          var labels = $.extend({}, expectedLabels);
          labels.searchTerm = 'foo';
          labels.searchTermLength = 3;
          $.emit(ns + ':component:auto_complete:location', [testLocation, 'foo']);
          expect(stub.calledWith('auto_complete_location', 'locservicesui', labels)).toBe(true);
        });
      });

      describe('- geolocation events -', function() {

        it('captures the geolocation:location event', function() {
          $.emit(ns + ':component:geolocation:location', [testLocation]);
          expect(stub.calledWith('geolocation_location', 'locservicesui', expectedLabels)).toBe(true);
        });

        it('captures the geolocation_denied event', function() {
          var error = { code: 'geolocation.error.browser.permission' };
          $.emit(ns + ':error', [error]);
          expect(stub.calledWith('geolocation_denied', 'locservicesui')).toBe(true);
        });

        it('captures the geolocation_click event', function() {
          $.emit(ns + ':component:geolocation:click');
          expect(stub.calledWith('geolocation_click', 'locservicesui')).toBe(true);
        });
      });

      describe('- user_locations -', function() {

        it('captures the location_prefer event', function() {
          $.emit(ns + ':component:user_locations:location_prefer', [testLocation]);
          expect(stub.calledWith('user_locations_location_prefer', 'locservicesui', expectedLabels)).toBe(true);
        });
        it('captures the location_select event', function() {
          $.emit(ns + ':component:user_locations:location', [testLocation]);
          expect(stub.calledWith('user_locations_location_select', 'locservicesui', expectedLabels)).toBe(true);
        });
        it('captures the main location selected event', function() {
          var mainLocation = $.extend({}, testLocation); // clones the original test location
          mainLocation.isPreferred = true;
          $.emit(ns + ':component:user_locations:location', [mainLocation]);
          expect(stub.calledWith('user_locations_location_main_select', 'locservicesui', expectedLabels)).toBe(true);
        });
        it('captures the location_remove event', function() {
          $.emit(ns + ':component:user_locations:location_remove', [testLocation]);
          expect(stub.calledWith('user_locations_location_remove', 'locservicesui', expectedLabels)).toBe(true);
        });
      });

      describe('- search results -', function() {
        it('records a stat when search yielded no results', function() {
          $.emit(ns + ':component:search_results:results', {
            searchTerm: 'foo',
            offset: 0,
            totalResults: 0
          });
          expect(stub.calledWith('search_no_results', 'locservicesui')).toBe(true);
        });
        it('records a stat when a search result is selected', function() {
          var labels = $.extend({}, expectedLabels);
          labels.offset = 0;
          $.emit(ns + ':component:search_results:location', [testLocation, labels.offset]);
          expect(stub.calledWith('search_results_location', 'locservicesui', labels)).toBe(true);
        });
      });
    });

  });
});
