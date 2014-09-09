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
    var api;
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

    var withPreferableClass = 'ls-ui-comp-user_locations-with_preferable';
    
    beforeEach(function() {
      container = $('<div/>');
      api = {
        getDefaultQueryParameters: function() {
          return {};
        }
      };
      translations = new En();
      userLocations = new UserLocations({
        api: api,
        translations: translations,
        container: container
      });
    });

    describe('constructor()', function() {

      beforeEach(function() {
        userLocations._locations[testLocations[0].id] = testLocations[0];
      });

      it('should set this.componentId to "user_locations"', function() {
        expect(userLocations.componentId).toBe('user_locations');
      });

      it('throws an error when an api is not present in options', function() {
        var fn = function() {
          userLocations = new UserLocations({
            container: container,
            translations: translations
          });
        };

        expect(fn).toThrow();
      });

      it('does not render is personalisation if disabled in bbccookies', function() {
        container = $('<div/>');
        window.bbccookies = {
          readPolicy: function() {
            return {
              personalisation: false
            };
          }
        };
        userLocations = new UserLocations({
          api: api,
          translations: translations,
          container: container
        });
        expect(container.html()).toEqual('');
        window.bbccookies = undefined;
      });

      it('returns early when handling click events if displaying a dialog', function() {
        var stub;
        stub = sinon.stub(userLocations, 'selectLocationById');
        userLocations.element.empty();
        userLocations.element.append(
          '<li><a class="ls-ui-comp-user_locations-name" href="#' + testLocations[0].id + '" data-id="' + testLocations[0].id + '" data-action="location"><strong>Location</strong>, Container</a></li>'
        );
        userLocations._isDisplayingDialog = true;
        userLocations.element.find('.ls-ui-comp-user_locations-name strong').trigger('click');

        expect(stub.callCount).toBe(0);
      });

      it('calls this.selectLocationById location event when clicking on a location name', function() {
        var stub;
        stub = sinon.stub(userLocations, 'selectLocationById');
        userLocations.element.empty();
        userLocations.element.append(
          '<li><a class="ls-ui-comp-user_locations-name" href="#' + testLocations[0].id + '" data-id="' + testLocations[0].id + '" data-action="location"><strong>Location</strong>, Container</a></li>'
        );
        userLocations.element.find('.ls-ui-comp-user_locations-name strong').trigger('click');

        expect(stub.callCount).toBe(1);
        expect(stub.calledWith(testLocations[0].id)).toBe(true);
      });

      it('calls this.selectLocationById location event when clicking on a location container', function() {
        var stub;
        stub = sinon.stub(userLocations, 'selectLocationById');
        userLocations.element.empty();
        userLocations.element.append(
          '<li><a class="ls-ui-comp-user_locations-name" href="#' + testLocations[0].id + '" data-id="' + testLocations[0].id + '" data-action="location"><strong>Location</strong>, Container</a></li>'
        );
        userLocations.element.find('.ls-ui-comp-user_locations-name').trigger('click');

        expect(stub.callCount).toBe(1);
        expect(stub.calledWith(testLocations[0].id)).toBe(true);
      });

      describe('clicking remove()', function() {

        var locationElement;
        var removeLocation;
        var removeElement;

        beforeEach(function() {
          removeLocation = {
            id: 'REMOVE',
            name: 'remove',
            placeType: 'settlement',
            country: 'GB'
          };
          userLocations._locations[removeLocation.id] = removeLocation;
          locationElement = $('<li><button class="ls-ui-comp-user_locations-action-remove" href="#' + removeLocation.id + '" data-id="' + removeLocation.id + '" data-action="remove">Location</button></li>');
          removeElement = locationElement.find('.ls-ui-comp-user_locations-action-remove');
          userLocations.element.append(locationElement);
        });

        it('calls this.removeLocationById when clicking on remove recent', function() {
          var stub;
          stub = sinon.stub(userLocations, 'removeLocationById');
          removeElement.trigger('click');
          expect(stub.callCount).toBe(1);
          expect(stub.args[0][0]).toBe(removeLocation.id);
        });

        it('calls this.displayDialog when clicking on remove preferred', function() {
          var stub;
          removeLocation.isPreferred = true;
          stub = sinon.stub(userLocations, 'displayDialog');
          removeElement.trigger('click');
          expect(stub.callCount).toBe(1);
          expect(stub.args[0][0][0]).toBe(locationElement[0]);
          expect(typeof stub.args[0][1]).toBe('string');
          expect(stub.args[0][1].indexOf(removeLocation.name)).toBeGreaterThan(-1);
          expect(typeof stub.args[0][2]).toBe('function');
        });

        it('calls this.removeLocationById when clicking on remove preferred then confirm', function() {
          var stub;
          removeLocation.isPreferred = true;
          stub = sinon.stub(userLocations, 'removeLocationById');
          removeElement.trigger('click');
          locationElement
            .find('.ls-ui-comp-dialog-confirm button')
            .trigger('click');
          expect(stub.callCount).toBe(1);
          expect(stub.args[0][0]).toBe(removeLocation.id);
        });

      });

      describe('clicking prefer()', function() {

        var locationElement;
        var preferElement;

        beforeEach(function() {
          locationElement = $('<li><button class="ls-ui-comp-user_locations-action-prefer" href="#' + testLocations[0].id + '" data-id="' + testLocations[0].id + '" data-action="prefer">Location</button></li>');
          preferElement = locationElement.find('.ls-ui-comp-user_locations-action-prefer');
          userLocations.element.append(locationElement);
        });

        it('calls this.displayDialog when clicking on prefer', function() {
          var stub;
          stub = sinon.stub(userLocations, 'displayDialog');
          preferElement.trigger('click');
          expect(stub.callCount).toBe(1);
          expect(stub.args[0][0][0]).toBe(locationElement[0]);
          expect(typeof stub.args[0][1]).toBe('string');
          expect(stub.args[0][1].indexOf(testLocations[0].name)).toBeGreaterThan(-1);
          expect(typeof stub.args[0][2]).toBe('function');
        });

        it('calls this.setPreferredLocationById when clicking on prefer then confirm', function() {
          var stub;
          stub = sinon.stub(userLocations, 'setPreferredLocationById');
          preferElement.trigger('click');
          locationElement
            .find('.ls-ui-comp-dialog-confirm button')
            .trigger('click');
          expect(stub.callCount).toBe(1);
          expect(stub.args[0][0]).toBe(testLocations[0].id);
        });

      });

      it('calls this.recentLocations.add on search_results location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations.recentLocations, 'add');
        $.emit('locservices:ui:component:search_results:location', [expectedLocation]);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

      it('calls this.recentLocations.add on geolocation location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations.recentLocations, 'add');
        $.emit('locservices:ui:component:geolocation:location', [expectedLocation]);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

      it('calls this.recentLocations.add on auto_complete location event', function() {
        var stub;
        var expectedLocation;
        expectedLocation = 'foo';
        stub = sinon.stub(userLocations.recentLocations, 'add');
        $.emit('locservices:ui:component:auto_complete:location', [expectedLocation, '']);
        expect(stub.calledOnce).toBe(true);
        expect(stub.calledWith(expectedLocation)).toBe(true);
      });

      // handleLocationEvent
      it('emits the location_added event when search results emits a location', function() {
        var location = { id: 123 };
        var emitStub = sinon.stub(userLocations, 'emit');
        var addStub = sinon.stub(userLocations.recentLocations, 'add', function() {
          return true;
        });

        $.emit('locservices:ui:component:search_results:location', [location]);
        expect(emitStub.calledWith('location_add', [location])).toBe(true);

        emitStub.restore();
        addStub.restore();
      });
      it('emits the location_added event when the geolocation:location event is emitted', function() {
        var location = { id: 123 };
        var emitStub = sinon.stub(userLocations, 'emit');
        var addStub = sinon.stub(userLocations.recentLocations, 'add', function() {
          return true;
        });

        $.emit('locservices:ui:component:geolocation:location', [location]);
        expect(emitStub.calledWith('location_add', [location])).toBe(true);

        emitStub.restore();
        addStub.restore();
      });
      it('emits the location_added event when the auto_complete:location event is emitted', function() {
        var location = { id: 123 };
        var emitStub = sinon.stub(userLocations, 'emit');
        var addStub = sinon.stub(userLocations.recentLocations, 'add', function() {
          return true;
        });

        $.emit('locservices:ui:component:auto_complete:location', [location, '']);
        expect(emitStub.calledWith('location_add', [location])).toBe(true);

        emitStub.restore();
        addStub.restore();
      });

      it('calls removeDialog on controller:inactive', function() {
        var stub = sinon.stub(userLocations, 'removeDialog');
        $.emit('locservices:ui:controller:inactive');
        expect(stub.callCount).toBe(1);
      });

      it('calls removeDialog on search:results', function() {
        var stub = sinon.stub(userLocations, 'removeDialog');
        $.emit('locservices:ui:component:search:results', [[], {}]);
        expect(stub.callCount).toBe(1);
      });

      it('calls removeDialog on auto_complete:render', function() {
        var stub = sinon.stub(userLocations, 'removeDialog');
        $.emit('locservices:ui:component:auto_complete:render');
        expect(stub.callCount).toBe(1);
      });

      it('has preferred location enabled by default', function() {
        expect(userLocations.isPreferredLocationEnabled).toBe(true);
      });

      it('adds a "with_preferable" class', function() {
        expect(userLocations.element.hasClass(withPreferableClass)).toBe(true);
      });

      describe('with preferred location disabled', function() {
        beforeEach(function() {
          userLocations = new UserLocations({
            api: api,
            translations: translations,
            container: container,
            isPreferredLocationEnabled: false
          });
        });

        it('should have preferred location disabled', function() {
          expect(userLocations.isPreferredLocationEnabled).toBe(false);
        });

        it('should not add a "with_preferable" class', function() {
          expect(userLocations.element.hasClass(withPreferableClass)).toBe(false);
        });

        it('should not have a preferred location list', function() {
          var preferredList = userLocations.element.find('.ls-ui-comp-user_locations-preferred');
          expect(preferredList.length).toBe(0);
        });

        it('should not have a preferred location message', function() {
          var message = userLocations.element.find('.ls-ui-comp-user_locations-message');
          expect(message.length).toBe(0);
        });

      });

    });

    describe('removeDialog()', function() {

      it('calls _dialog.remove()', function() {
        userLocations._isDisplayingDialog = true;
        userLocations._dialog = { remove: function() {}};
        userLocations._dialogElement = container;
        var stub = sinon.stub(userLocations._dialog, 'remove');
        userLocations.removeDialog();
        expect(stub.callCount).toEqual(1);
      });

      it('remove class from _dialogElement', function() {
        userLocations._dialog = { remove: function() {}};
        sinon.stub(userLocations._dialog, 'remove');
        userLocations._isDisplayingDialog = true;
        userLocations._dialogElement = container;
        container.addClass('ls-ui-comp-user_locations-location-with-dialog');
        userLocations.removeDialog();
        expect(
          container.hasClass('ls-ui-comp-user_locations-location-with-dialog')
        ).toEqual(false);
      });

    });

    describe('selectLocationById()', function() {

      it('emits location event with expected location', function() {
        var spy = sinon.spy($, 'emit');
        userLocations._locations = {};
        userLocations._locations[testLocations[0].id] = testLocations[0];
        userLocations.selectLocationById(testLocations[0].id);
        expect(spy.getCall(0).args[0]).toEqual('locservices:ui:component:user_locations:location');
        expect(spy.getCall(0).args[1][0]).toEqual(testLocations[0]);
        $.emit.restore();
      });

      it('does not emit location event with invalid location id', function() {
        var spy = sinon.spy($, 'emit');
        userLocations._locations = {};
        userLocations.selectLocationById('foo');
        expect(spy.callCount).toEqual(0);
        $.emit.restore();
      });

    });

    describe('displayDialog()', function() {

      var locationElement;

      beforeEach(function() {
        locationElement = $('<li></li>');
        userLocations.element.append(locationElement);
      });

      it('returns true if a dialog is displayed', function() {
        var result;
        result = userLocations.displayDialog(locationElement);
        expect(result).toBe(true);
      });

      it('returns false if a dialog is already being displayed', function() {
        var result;
        var additionalLocationElement = $('<li></li>');
        userLocations.element.append(additionalLocationElement);
        userLocations.displayDialog(locationElement);
        result = userLocations.displayDialog(additionalLocationElement);
        expect(result).toBe(false);
      });

      it('does not display a dialog if one is already being displayed', function() {
        var additionalLocationElement = $('<li></li>');
        userLocations.element.append(additionalLocationElement);
        userLocations.displayDialog(locationElement);
        expect(
          locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')
        ).toBe(true);
        userLocations.displayDialog(additionalLocationElement);
        expect(
          locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')
        ).toBe(true);
        expect(
          userLocations.element.find('.ls-ui-comp-user_locations-location-with-dialog').length
        ).toBe(1);
      });

      it('adds "ls-ui-comp-user_locations-location-with-dialog" class to element', function() {
        userLocations.displayDialog(locationElement);
        expect(
          locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')
        ).toBe(true);
      });

      it('renders message', function() {
        var expectedMessage = 'foo';
        userLocations.displayDialog(locationElement, expectedMessage);
        expect(
          locationElement.find('p').text()
        ).toBe(expectedMessage);
      });

      it('clicking confirm removes "ls-ui-comp-user_locations-location-with-dialog" class', function() {
        userLocations.displayDialog(locationElement, 'foo');
        expect(locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')).toBe(true);
        locationElement.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')).toBe(false);
      });

      it('clicking confirm calls success callback', function() {
        var hasCalledCallback = false;
        userLocations.displayDialog(locationElement, 'foo', function() {
          hasCalledCallback = true;
        });
        locationElement.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(hasCalledCallback).toBe(true);
      });

      it('clicking confirm removes dialog', function() {
        userLocations.displayDialog(locationElement, 'foo');
        expect(locationElement.find('.ls-ui-comp-dialog').length).toBe(1);
        locationElement.find('.ls-ui-comp-dialog-confirm button').trigger('click');
        expect(locationElement.find('.ls-ui-comp-dialog').length).toBe(0);
      });

      it('clicking cancel removes "ls-ui-comp-user_locations-location-with-dialog" class', function() {
        userLocations.displayDialog(locationElement, 'foo');
        expect(locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')).toBe(true);
        locationElement.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(locationElement.hasClass('ls-ui-comp-user_locations-location-with-dialog')).toBe(false);
      });

      it('clicking cancel removes dialog', function() {
        userLocations.displayDialog(locationElement, 'foo');
        expect(locationElement.find('.ls-ui-comp-dialog').length).toBe(1);
        locationElement.find('.ls-ui-comp-dialog-cancel button').trigger('click');
        expect(locationElement.find('.ls-ui-comp-dialog').length).toBe(0);
      });

    });

    describe('setPreferredLocationById()', function() {

      var expectedLocation;

      beforeEach(function() {
        expectedLocation = {
          id: '1234',
          placeType: 'settlement',
          country: 'GB'
        };
        userLocations._locations[expectedLocation.id] = expectedLocation;
        userLocations._locations[testLocations[0].id] = testLocations[0];
      });

      // ensure location is preferable

      it('does not call this.preferredLocation.get() if the location is not preferrable', function() {
        var stub;
        stub = sinon.stub(userLocations.preferredLocation, 'get');
        sinon.stub(userLocations.preferredLocation, 'isValidLocation').returns(false);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.callCount).toEqual(0);
      });

      it('does not call this.preferredLocation.set() if the location is not preferrable', function() {
        var stub;
        stub = sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations.preferredLocation, 'isValidLocation').returns(false);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.callCount).toEqual(0);
      });

      // removes the location being preferred from the list of recents

      it('removes the location being preferred from the list of recents', function() {
        var stub;
        stub = sinon.stub(userLocations.recentLocations, 'remove');
        sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations.preferredLocation, 'isSet').returns(true);
        sinon.stub(userLocations.preferredLocation, 'get').returns(expectedLocation);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.args[0][0]).toEqual(expectedLocation.id);
      });

      // remove the existing preferred location and adding to recents

      it('adds the current preferredLocation to the recent locations list', function() {
        var stub;
        stub = sinon.stub(userLocations.recentLocations, 'add');
        sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations.preferredLocation, 'isSet').returns(true);
        sinon.stub(userLocations.preferredLocation, 'get').returns(expectedLocation);
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(testLocations[0].id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.args[0][0]).toEqual(expectedLocation);
      });

      // set a new preferred location

      it('calls this.preferredLocation.set() with the expected location id', function() {
        var stub;
        stub = sinon.stub(userLocations.preferredLocation, 'set');
        sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.args[0][0]).toEqual(expectedLocation.id);
      });

      it('calls this.render() if location is valid', function() {
        var stub;
        userLocations.preferredLocation.set = function(id, options) {
          options.success({});
        };
        sinon.stub(userLocations, 'getRecentLocations').returns(testLocations);
        stub = sinon.stub(userLocations, 'render');
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
      });

      it('emits the location_prefer event when a location is valid', function() {
        var emitStub = sinon.stub(userLocations, 'emit');
        var stub = sinon.stub(userLocations.preferredLocation, 'set', function(locationId, options) {
          options.success();
        });

        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(emitStub.calledWith('location_prefer', [expectedLocation])).toBe(true);

        emitStub.restore();
        stub.restore();
      });

      it('emits the location with isPreferred property for main location select', function() {
        var prefLocSetStub = sinon.stub(userLocations.preferredLocation, 'isSet', function() {
          return true;
        });
        var prefLocStub = sinon.stub(userLocations.preferredLocation, 'get', function() {
          return expectedLocation;
        });
        var emitStub = sinon.stub(userLocations, 'emit');

        // make a clone of the original object under test. the additional
        // properties are added in render(). it's this location object that
        // we expect to be emitted as an event parameter. this test needs to pass
        // otherwise we'll lose the stats tracking for clicking the preferred location
        var location = $.extend(true, {}, expectedLocation);
        location.isPreferred = true;
        location.isPreferable = true;

        userLocations.render();
        userLocations.selectLocationById(expectedLocation.id);

        expect(emitStub.calledWith('location', [location])).toBe(true);

        prefLocStub.restore();
        emitStub.restore();
        prefLocSetStub.restore();
      });

      // setting preferred errors

      it('does not call this.render() if setting preferred fails', function() {
        var stub;
        stub = sinon.stub(userLocations, 'render');
        sinon.stub(userLocations.preferredLocation, 'set', function(id, options) {
          options.error();
        });
        sinon.stub(userLocations, 'getRecentLocations').returns(testLocations);
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.callCount).toEqual(0);
      });

      it('emits an error if setting preferred fails', function() {
        var stub;
        stub = sinon.stub(userLocations, 'emit');
        sinon.stub(userLocations.preferredLocation, 'set', function(id, options) {
          options.error();
        });
        sinon.stub(userLocations, 'getRecentLocations').returns(testLocations);
        userLocations.setPreferredLocationById(expectedLocation.id);
        expect(stub.args[0][0]).toEqual('error');
        expect(stub.args[0][1][0].code).toEqual('user_locations.error.preferred_location');
      });

    });

    describe('removeLocationById()', function() {

      var expectedLocation;

      beforeEach(function() {
        expectedLocation = {
          id: '1234'
        };
        userLocations._locations[expectedLocation.id] = expectedLocation;
      });

      it('calls this.preferredLocation.unset() if location is preferred', function() {
        var stub;
        stub = sinon.stub(userLocations.preferredLocation, 'unset');
        sinon.stub(userLocations, 'render');

        expectedLocation.isPreferred = true;

        userLocations.removeLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
      });

      it('calls this.recentLocations.remove() with locationId', function() {
        var stub;
        stub = sinon.stub(userLocations.recentLocations, 'remove');
        sinon.stub(userLocations, 'render');
        userLocations.removeLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
        expect(stub.calledWith(expectedLocation.id)).toEqual(true);
      });

      it('calls this.render() if locationId is valid', function() {
        var stub;
        sinon.stub(userLocations.recentLocations, 'remove');
        stub = sinon.stub(userLocations, 'render');
        userLocations.removeLocationById(expectedLocation.id);
        expect(stub.calledOnce).toEqual(true);
      });

      it('emits the location_remove event', function() {
        var emitStub = sinon.stub(userLocations, 'emit');
        userLocations.removeLocationById(expectedLocation.id);
        expect(emitStub.calledWith('location_remove', [expectedLocation])).toBe(true);
        emitStub.restore();
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

      // @todo test that this._locations is populated correctly

      it('does not render preferredLocation heading when user has no preferred or recent locations', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred').length).toEqual(0);
      });

      it('renders preferredLocation heading when user has a preferred location', function() {
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred').length).toEqual(1);
      });

      it('renders preferredLocation heading when user has a recent location', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([testLocations[0]]);
        userLocations.render();
        expect(container.find('ul.ls-ui-comp-user_locations-preferred').length).toEqual(1);
      });

      it('does not render message when user has no preferred or recent locations', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('p.ls-ui-comp-user_locations-message').length).toEqual(0);
      });

      it('renders message when user has a preferred location', function() {
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        stubGetRecentLocations.returns([]);
        userLocations.render();
        expect(container.find('p.ls-ui-comp-user_locations-message').length).toEqual(1);
      });

      it('renders message when user has a recent location', function() {
        stubPreferredLocationIsSet.returns(false);
        stubGetRecentLocations.returns([testLocations[0]]);
        userLocations.render();
        expect(container.find('p.ls-ui-comp-user_locations-message').length).toEqual(1);
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
        var expectedHtml = '<li class="ls-ui-comp-user_locations-location ls-ui-comp-user_locations-location-preferred ls-ui-comp-user_locations-location-preferable">' +
          '<button class="ls-ui-comp-user_locations-action" href="#CF5" data-id="CF5" data-action="none" aria-disabled="true">Prefer</button>' +
          '<a class="ls-ui-comp-user_locations-name" href="#CF5" data-id="CF5" data-action="location"><strong>CF5</strong></a>' +
          '<button class="ls-ui-comp-user_locations-remove" href="#CF5" data-id="CF5" data-action="remove">Remove</button>' +
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
          container.find('ul.ls-ui-comp-user_locations-recent li.ls-ui-comp-user_locations-location-preferable button.ls-ui-comp-user_locations-action').length
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

      it('returns at most 3 recent locations if recents contains the preferred location', function() {
        var locations;
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(testLocations[0]);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(3);
      });

      it('returns at most 4 recent locations if no preferred location is set', function() {
        var locations;
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(4);
      });

      it('sets a recent locations isPreferable via this.preferredLocation.isValidLocation', function() {
        var locations;
        var stub;
        var expectedValue;
        expectedValue = false;
        stubPreferredLocationIsSet.returns(false);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns([testLocations[0]]);
        stub = sinon.stub(userLocations.preferredLocation, 'isValidLocation');
        stub.returns(expectedValue);
        locations = userLocations.getRecentLocations();
        expect(stub.calledOnce).toEqual(true);
        expect(locations[0].isPreferable).toEqual(expectedValue);
      });

      it('sets isPreferable to false if preferred location is disabled', function() {
        var locations;
        var stub;
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns([testLocations[0]]);
        stub = sinon.stub(userLocations.preferredLocation, 'isValidLocation');
        stub.returns(true);
        userLocations.isPreferredLocationEnabled = false;
        locations = userLocations.getRecentLocations();
        expect(locations[0].isPreferable).toEqual(false);
      });

      it('does not include recent if same id as preferred', function() {
        var locations;
        var preferredLocation = { id: '2', name: 'Preferred' };
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(preferredLocation);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(3);
        expect(locations[0]).toEqual(testLocations[0]);
        expect(locations[1]).toEqual(testLocations[1]);
        expect(locations[2]).toEqual(testLocations[3]);
      });

      it('includes preferred location if one is set and preferred location is disabled', function() {
        var locations;
        var preferredLocation = { id: '2', name: 'Preferred' };
        stubPreferredLocationIsSet.returns(true);
        stubPreferredLocationGet.returns(preferredLocation);
        stubRecentLocationsIsSupported.returns(true);
        stubRecentLocationsAll.returns(testLocations);
        userLocations.isPreferredLocationEnabled = false;
        locations = userLocations.getRecentLocations();
        expect(locations.length).toEqual(4);
        expect(locations).toEqual(testLocations.slice(0,4));
      });

      describe('filtered', function() {

        beforeEach(function() {
          api = {
            getDefaultQueryParameters: function() {
              return {
                filter: 'international',
                countries: 'US'
              };
            }
          };
          userLocations = new UserLocations({
            api: api,
            translations: translations,
            container: container
          });
          stubRecentLocationsIsSupported = sinon.stub(userLocations.recentLocations, 'isSupported');
          stubRecentLocationsAll = sinon.stub(userLocations.recentLocations, 'all');
        });

        it('returns locations filtered by api configuration', function() {
          var locations;
          stubRecentLocationsIsSupported.returns(true);
          stubRecentLocationsAll.returns(testLocations);
          locations = userLocations.getRecentLocations();
          expect(locations.length).toEqual(0);
        });

      }); // filtered

    }); // getRecentLocations()

  }); // module

});
