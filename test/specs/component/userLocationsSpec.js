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
      { id: '1', name: 'Location 1', placeType: 'settlement', country: 'GB' },
      { id: '2', name: 'Location 2', placeType: 'settlement', country: 'GB' },
      { id: '3', name: 'Location 3', placeType: 'settlement', country: 'GB' },
      { id: '4', name: 'Location 4', placeType: 'settlement', country: 'GB' },
      { id: '5', name: 'Location 5', placeType: 'settlement', country: 'GB' },
      { id: '6', name: 'Location 6', placeType: 'settlement', country: 'GB' }
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
          '<a class="ls-ui-comp-user_locations-remove" href="?locationId=' + expectedId + '">Location</a>'
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
          '<a class="ls-ui-comp-user_locations-recent" href="?locationId=' + expectedId + '">Location</a>'
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
        sinon.stub(userLocations, 'getRecentLocations').returns(testLocations);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(testLocations[0].id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.calledWith(testLocations[0])).toEqual(true);
      });

      it('calls this.render()', function() {
        var stub;
        sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations, 'getRecentLocations').returns(testLocations);
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

      var stubPreferredLocationIsSet;
      var stubPreferredLocationGet;
      var stubGetRecentLocations;

      beforeEach(function() {
        stubPreferredLocationIsSet = sinon.stub(userLocations.preferredLocation, 'isSet');
        stubPreferredLocationGet = sinon.stub(userLocations.preferredLocation, 'get');
        stubGetRecentLocations = sinon.stub(userLocations, 'getRecentLocations');
      });

      it('renders no preferred location if not set', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred li').length).toEqual(0);
      });

      it('adds a no-location class to preferred location ul if no preferred location if set', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferable: true
        };

        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(expectedLocation);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred-no-location').length).toEqual(1);
      });

      it('renders a single preferred location if set', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5',
          isPreferable: true
        };

        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(expectedLocation);
        stubGetRecentLocations.returns([]);
        var expectedHtml = '<li class="ls-ui-comp-user_locations-location-preferred ls-ui-comp-user_locations-location-preferable">' +
          '<a class="ls-ui-comp-user_locations-action" href="?locationId=CF5">Prefer</a>' +
          '<a class="ls-ui-comp-user_locations-name" href="?locationId=CF5"><strong>CF5</strong></a>' +
          '<a class="ls-ui-comp-user_locations-remove" href="?locationId=CF5">Remove</a>' +
          '</li>';
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred').html()).toEqual(expectedHtml);
      });

      it('renders the expected number of recents locations', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([testLocations[0], testLocations[1]]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-recent li').length).toEqual(2);
      });

      it('renders a recent location with container', function() {
        var expectedLocation = {
          id: '1234',
          name: 'Llandaff',
          container: 'Cardiff'
        };
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([expectedLocation]);
        var expectedHtml = '<strong>' + expectedLocation.name + '</strong>, ' +
          expectedLocation.container;
        userLocations.render();
        expect(container.find('.ls-ui-comp-user_locations-name').html()).toEqual(expectedHtml);
      });

      it('renders a recent location without container', function() {
        var expectedLocation = {
          id: '1234',
          name: 'Llandaff'
        };
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([expectedLocation]);
        var expectedHtml = '<strong>' + expectedLocation.name + '</strong>';
        userLocations.render();
        expect(container.find('.ls-ui-comp-user_locations-name').html()).toEqual(expectedHtml);
      });

      it('renders a preferable location with expected class and link', function() {
        var expectedLocation = {
          id: '1234',
          name: 'Llandaff',
          isPreferable: true
        };
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([expectedLocation]);
        userLocations.render();
        expect(
          container.find('ul.ls-ui-comp-user_locations-recent li.ls-ui-comp-user_locations-location-preferable').length
        ).toEqual(1);
        expect(
          container.find('ul.ls-ui-comp-user_locations-recent li.ls-ui-comp-user_locations-location-preferable a.ls-ui-comp-user_locations-action').length
        ).toEqual(1);
      });

    });

    describe('getRecentLocations()', function() {

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
        expect(userLocations.getRecentLocations()).toEqual([]);
      });

      it('returns at most 4 recent locations if a preferred location is set', function() {
        var locations;
        stubPreferredLocationIsSet.returns(true);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(4);
      });

      it('returns at most 5 recent locations if no preferred location is set', function() {
        var locations;
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
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
        locations = userLocations.getRecentLocations();
        expect(stub.calledOnce).toEqual(true);
        expect(locations[0].isPreferable).toEqual(expectedValue);
      });

      it('does not include recent if same id as preferred', function() {
        var locations;
        var preferredLocation = { id: '2', name: 'Preferred' };
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(preferredLocation);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(4);
        expect(locations[0]).toEqual(testLocations[0]);
        expect(locations[1]).toEqual(testLocations[1]);
        expect(locations[2]).toEqual(testLocations[3]);
        expect(locations[3]).toEqual(testLocations[4]);
      });

    });

  });

});
