/*global describe, beforeEach, it:false*/

define([
  'locservices/ui/component/user_locations',
  'locservices/ui/translations/en'
],
function(
    UserLocations,
    En
  )
{

  describe('The User Locations module', function() {
    'use strict';

    var userLocations;
    var translations;

    var testLocations = [
      { id: '0', name: 'Location 0' },
      { id: '1', name: 'Location 2' },
      { id: '2', name: 'Location 3' },
      { id: '3', name: 'Location 4' },
      { id: '4', name: 'Location 5' },
      { id: '5', name: 'Location 6' },
      { id: '6', name: 'Location 7' }
    ];

    beforeEach(function() {
      translations = new En();
      userLocations = new UserLocations({
        translations: translations,
        container: null
      });
    });

    describe('constructor()', function() {

      it('should set this.componentId to "user_locations"', function() {
        expect(userLocations.componentId).toBe('user_locations');
      });

      // @todo
      // sets this.preferredLocation
      // sets this.recentLocations

      it('calls this.removeLocationById with expected ID when clicking on remove', function() {
        var stub;
        var expectedId;
        expectedId = '123';
        stub = sinon.stub(userLocations, 'removeLocationById');
        userLocations.element.html(
          '<a href="?locationId=' + expectedId + '">Location' +
          '<span class="ls-ui-comp-user_locations-remove">remove</span>' +
          '</a>'
        );
        userLocations.element.find('span').trigger('click');
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedId)).toBe(true);
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
        expect(userLocations.element.html()).toEqual('');
      });

      it('renders a single location without container', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5'
        };
        var expectedHtml = '<ul><li><a href="?locationId=' + expectedLocation.id + '">' +
          expectedLocation.name +
          '<span class="ls-ui-comp-user_locations-remove">remove</span>' +
          '</a></li></ul>';
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(userLocations.element.html()).toEqual(expectedHtml);
      });

      it('renders a single location with container', function() {
        var expectedLocation = {
          id: '1234',
          name: 'Llandaff',
          container: 'Cardiff'
        };
        var expectedHtml = '<ul><li><a href="?locationId=' + expectedLocation.id + '">' +
          expectedLocation.name + ', ' + expectedLocation.container +
          '<span class="ls-ui-comp-user_locations-remove">remove</span>' +
          '</a></li></ul>';
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation]);
        userLocations.render();
        expect(userLocations.element.html()).toEqual(expectedHtml);
      });

      it('renders multiple locations', function() {
        var expectedLocation = {
          id: 'CF5',
          name: 'CF5'
        };
        sinon.stub(userLocations, 'getLocations').returns([expectedLocation, expectedLocation, expectedLocation]);
        userLocations.render();
        expect(userLocations.element.find('li').length).toEqual(3);
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

      it('returns at most 5 recent locations if no preferred location is set', function() {
        var locations;
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getLocations();
        expect(locations.length).toEqual(5);
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
