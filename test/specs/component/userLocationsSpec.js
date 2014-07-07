/*global describe, beforeEach, it:false*/

define([
  'jquery',
  'locservices/ui/component/user_locations',
  'locservices/ui/translations/en'
],
function(
    $,
    UserLocations,
    En
  )
{

  describe('The User Locations module', function() {
    'use strict';

    var container;
    var userLocations;
    var translations;

    var testLocations = [
      { id: '0', name: 'Location 0', placeType: 'settlement', country: 'GB' },
      { id: '1', name: 'Location 2', placeType: 'settlement', country: 'GB' },
      { id: '2', name: 'Location 3', placeType: 'settlement', country: 'GB' },
      { id: '3', name: 'Location 4', placeType: 'settlement', country: 'GB' },
      { id: '4', name: 'Location 5', placeType: 'settlement', country: 'GB' },
      { id: '5', name: 'Location 6', placeType: 'settlement', country: 'GB' },
      { id: '6', name: 'Location 7', placeType: 'settlement', country: 'GB' }
    ];

    beforeEach(function() {
      container = $('<div/>');
      translations = new En();
      userLocations = new UserLocations({
        translations: translations,
        container: container
      });
    });

    describe('constructor()', function() {

      it('should set this.componentId to "user_locations"', function() {
        expect(userLocations.componentId).toBe('user_locations');
      });

      it('calls this.removeLocationById with expected ID when clicking on remove', function() {
        var stub;
        var expectedId;
        expectedId = '123';
        stub = sinon.stub(userLocations, 'removeLocationById');
        container.find('div').html(
          '<a class="ls-ui-comp-userLocations-remove" href="?locationId=' + expectedId + '">Location</a>'
        );
        container.find('a').trigger('click');
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedId)).toBe(true);
      });

      it('calls this.setPreferredLocationById with expected ID when clicking on prefer', function() {
        var stub;
        var expectedId;
        expectedId = '123';
        stub = sinon.stub(userLocations, 'setPreferredLocationById');
        container.find('div').html(
          '<a class="ls-ui-comp-userLocations-recent" href="?locationId=' + expectedId + '">Location</a>'
        );
        container.find('a').trigger('click');
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedId)).toBe(true);
      });

      it('calls this.addRecentLocation on search_results location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations, 'addRecentLocation');
        $.emit('locservices:ui:component:search_results:location', [expectedLocation]);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

      it('calls this.addRecentLocation on geolocation location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations, 'addRecentLocation');
        $.emit('locservices:ui:component:geolocation:location', [expectedLocation]);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

      it('calls this.addRecentLocation on auto_complete location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations, 'addRecentLocation');
        $.emit('locservices:ui:component:auto_complete:location', [expectedLocation]);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

    });

    describe('setPreferredLocationById()', function() {

      it('calls this.preferredLocation.set() with the expected location object', function() {
        var stub;
        stub = sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations, 'getLocations').returns(testLocations);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(testLocations[0].id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.calledWith(testLocations[0])).toEqual(true);
      });

      it('calls this.render()', function() {
        var stub;
        sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations, 'getLocations').returns(testLocations);
        stub = sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(testLocations[0].id);
        expect(stub.calledOnce).toEqual(true);
      });

    });

    describe('removeLocationById()', function() {

      it('calls this.recentLocations.remove() with locationId', function() {
        var locationId = '999';
        var stub;
        stub = sinon.stub(userLocations.recentLocations, 'remove');
        sinon.stub(userLocations, 'render');
        userLocations.removeLocationById(locationId);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.calledWith(locationId)).toEqual(true);
      });

      it('calls this.render()', function() {
        var locationId = '999';
        var stub;
        sinon.stub(userLocations.recentLocations, 'remove');
        stub = sinon.stub(userLocations, 'render');
        userLocations.removeLocationById(locationId);
        expect(stub.calledOnce).toEqual(true);
      });

    });

    describe('render()', function() {

      it('renders empty this.element if no locations', function() {
        sinon.stub(userLocations, 'getLocations').returns([]);
        userLocations.render();
        expect(container.find('li').length).toEqual(0);
      });

      it('renders a single location without container name', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferable: true
        };
        var expectedHtml = '<div class="ls-ui-comp-userLocations">' +
          '<p>Your locations (1)</p>' +
          '<ul><li class="ls-ui-comp-userLocations-preferable">' +
          '<a class="ls-ui-comp-userLocations-action" href="?locationId=' + expectedLocation.id + '">Prefer</a>' +
          '<a class="ls-ui-comp-userLocations-name" href="?locationId=' + expectedLocation.id + '"><strong>' + expectedLocation.name + '</strong></a>' +
          '<a class="ls-ui-comp-userLocations-remove" href="?locationId=' + expectedLocation.id + '">Remove</a>' +
          '</li></ul></div>';
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(container.html()).toEqual(expectedHtml);
      });

      it('renders a single un-preferrable location without prefer link', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferrable: false
        };
        var expectedHtml = '<div class="ls-ui-comp-userLocations">' +
          '<p>Your locations (1)</p>' +
          '<ul><li>' +
          '<a class="ls-ui-comp-userLocations-name" href="?locationId=' + expectedLocation.id + '"><strong>' + expectedLocation.name + '</strong></a>' +
          '<a class="ls-ui-comp-userLocations-remove" href="?locationId=' + expectedLocation.id + '">Remove</a>' +
          '</li></ul></div>';
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(container.html()).toEqual(expectedHtml);
      });

      it('renders a single location with container', function() {
        var expectedLocation = {
          id: '1234',
          name: 'Llandaff',
          container: 'Cardiff'
        };
        var expectedHtml = '<strong>' + expectedLocation.name + '</strong>, ' +
        expectedLocation.container;
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(container.find('.ls-ui-comp-userLocations-name').html()).toEqual(expectedHtml);
      });

      it('renders multiple locations', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5'
        };
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation, expectedLocation, expectedLocation]);
        userLocations.render();
        expect(container.find('li').length).toEqual(3);
      });

      it('renders a preferred location with a preferred class', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferred: true,
          isPreferrable: true
        };
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(container.find('li.ls-ui-comp-userLocations-preferred').length).toEqual(1);
      });

      it('renders a preferable location with a preferable class', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferred: true,
          isPreferrable: true
        };
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(container.find('li.ls-ui-comp-userLocations-preferable').length).toEqual(1);
      });

    });

    describe('getLocations()', function() {

      var stubPreferredLocationIsSet;
      var stubPreferredLocationGet;
      var stubRecentLocationsIsSupported;
      var stubRecentLocationsAll;

      beforeEach(function() {
        stubPreferredLocationIsSet = sinon.stub(userLocations.preferredLocation, 'isSet');
        stubPreferredLocationGet = sinon.stub(userLocations.preferredLocation, 'get');
        stubRecentLocationsIsSupported = sinon.stub(userLocations.recentLocations, 'isSupported');
        stubRecentLocationsAll = sinon.stub(userLocations.recentLocations, 'all');
      });

      it('returns an empty array if no locations are available', function() {
        expect(userLocations.getLocations()).toEqual([]);
      });

      it('returns a single preferred location if no recents are set', function() {
        var locations;
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        locations = userLocations.getLocations();
        expect(locations.length).toEqual(1);
        expect(locations[0]).toEqual(testLocations[0]);
      });

      it('sets isPreferred to true for preferred location', function() {
        var locations;
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        locations = userLocations.getLocations();
        expect(locations[0].isPreferred).toEqual(true);
      });

      it('sets isPreferable to true for preferred location', function() {
        var locations;
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        locations = userLocations.getLocations();
        expect(locations[0].isPreferable).toEqual(true);
      });

      it('returns at most 5 recent locations if no preferred location is set', function() {
        var locations;
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getLocations();
        expect(locations.length).toEqual(5);
      });

      it('sets a recent locations isPreferable via this.preferredLocation.isValidLocation', function() {
        var locations;
        var stub;
        var expectedValue;
        expectedValue = 'foo';
        stubPreferredLocationIsSet.returns(false);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns([testLocations[0]]);
        stub = sinon.stub(userLocations.preferredLocation, 'isValidLocation');
        stub.returns(expectedValue);
        locations = userLocations.getLocations();
        console.log('locations', locations);
        expect(stub.calledOnce).toEqual(true);
        expect(locations[0].isPreferable).toEqual(expectedValue);
      });

      it('returns 1 preferred and 4 recent locations if both are set', function() {
        var locations;
        var preferredLocation = { id: 'CF5', name: 'Preferred' };
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(preferredLocation);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getLocations();
        expect(locations.length).toEqual(5);
        expect(locations[0]).toEqual(preferredLocation);
        expect(locations[1]).toEqual(testLocations[0]);
        expect(locations[2]).toEqual(testLocations[1]);
        expect(locations[3]).toEqual(testLocations[2]);
        expect(locations[4]).toEqual(testLocations[3]);
      });

      it('does not include recent if same id as preferred', function() {
        var locations;
        var preferredLocation = { id: '2', name: 'Preferred' };
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(preferredLocation);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getLocations();
        expect(locations.length).toEqual(5);
        expect(locations[0]).toEqual(preferredLocation);
        expect(locations[1]).toEqual(testLocations[0]);
        expect(locations[2]).toEqual(testLocations[1]);
        expect(locations[3]).toEqual(testLocations[3]);
        expect(locations[4]).toEqual(testLocations[4]);
      });

    });

  });

});
