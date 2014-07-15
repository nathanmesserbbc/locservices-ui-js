/*global define */

define([
  'jquery',
  'locservices/core/api',
  'locservices/core/preferred_location',
  'locservices/core/bbc_cookies',
  'locservices/core/cookies',
  'locservices/ui/component/search',
  'locservices/ui/component/message',
  'locservices/ui/component/geolocation',
  'locservices/ui/component/auto_complete',
  'locservices/ui/component/search_results',
  'locservices/ui/component/user_locations',
  'locservices/ui/component/close_button',
  'locservices/ui/component/dialog'
], function(
  $,
  Api,
  PreferredLocation,
  BBCCookies,
  Cookies,
  Search,
  Message,
  Geolocation,
  AutoComplete,
  SearchResults,
  UserLocations,
  CloseButton,
  Dialog
) {
  'use strict';

  var outside  = $('<div />').addClass('ls-ui-o');
  var searchEl = $('<div />').addClass('ls-ui-ctrl-primary-search');

  var verify = function(options) {
    var required = ['api', 'translations', 'container'];
    var count    = required.length;

    for (var i = 0; i < count; i++) {
      var option = required[i];

      if (!options[option]) {
        throw new Error('Primary Controller requires an ' + option + ' option.');
      }
    }
  };

  var preferredLocation = new PreferredLocation();
  var bbcCookies = new BBCCookies();
  var cookies = new Cookies();
  var cookiesColdStartKey = 'locserv_uics';

  function Primary(options) {
    verify(options);

    var self = this;
    var alwaysOpen = options.alwaysOpen || false;

    var events = {

      onLocation: function(location) {

        var emitLocation = function() {
          $.emit(self.namespace + ':controller:location', [location]);
        };

        var shouldDisplayColdStartDialog = function() {
          return (
            false === preferredLocation.isSet() && 
            false === bbcCookies.isPersonalisationDisabled() && 
            cookies.isSupported() && 
            '1' !== cookies.get(cookiesColdStartKey)
          );
        };

        var setAsPreferredLocation = function() {
          preferredLocation.setLocation(location.id, {
            success: function() {
              emitLocation();
            },
            error: function() {
              // @todo handle this
            }
          });
        };

        var declinePreferredLocation = function() {
          // @todo path and domain
          // @todo clear this if ever setting a preferred location ?!
          cookies.set(cookiesColdStartKey, '1');
          emitLocation();
        };

        // @todo test this
        if (shouldDisplayColdStartDialog()) {
          new Dialog({
            element: outside, 
            message: 'Save location?', 
            confirmLabel: self.translations.get('user_locations.dialog.confirm'),
            cancelLabel: self.translations.get('user_locations.dialog.cancel'),
            success: function() {
              setAsPreferredLocation();
            },
            cancel: function() {
              declinePreferredLocation();
            }
          });
        } else {
          emitLocation();
        }

      },
      onActive: function() {
        $.emit(self.namespace + ':controller:active');
        self.container.addClass('ls-ui-ctrl-active');
      },
      onGeolocation: function() {
        self.container.addClass('li-ui-ctrl-geolocation');
      },
      onSearchResults: function() {
        self.container.find('.ls-ui-comp-user_locations').addClass('ls-ui-hidden');
      },
      onClose: function() {
        self.message.clear();
        self.results.clear();
        self.autoComplete.clear();
        $.emit(self.namespace + ':controller:inactive');
        self.container.removeClass('ls-ui-ctrl-active');
        self.container.find('.ls-ui-comp-user_locations').removeClass('ls-ui-hidden');
      }
    };

    self.translations = options.translations;
    self.api = new Api(options.api);
    self.container = options.container;

    self.container.addClass('ls-ui-ctrl-primary')
                  .append(outside.append(searchEl));

    self.namespace = options.namespace || 'locservices:ui';

    $.on(self.namespace + ':error', events.onActive);
    $.on(self.namespace + ':component:search:focus', events.onActive);
    $.on(self.namespace + ':component:auto_complete:render', events.onSearchResults);
    $.on(self.namespace + ':component:search:results', events.onSearchResults);
    $.on(self.namespace + ':component:geolocation:location', events.onLocation);
    $.on(self.namespace + ':component:auto_complete:location', events.onLocation);
    $.on(self.namespace + ':component:user_locations:location', events.onLocation);
    $.on(self.namespace + ':component:search_results:location', events.onLocation);
    $.on(self.namespace + ':component:geolocation:available', events.onGeolocation);
    $.on(self.namespace + ':component:close_button:clicked', events.onClose);

    self.search = new Search({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      container: searchEl
    });

    self.autoComplete = new AutoComplete({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      element: self.search.input,
      container: outside
    });

    self.message = new Message({
      translations: self.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.results = new SearchResults({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.geolocation = new Geolocation({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.userLocations = new UserLocations({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    if (!alwaysOpen) {
      self.closeButton = new CloseButton({
        translations: self.translations,
        eventNamespace: self.namespace,
        container: outside
      });
    }

    if (alwaysOpen) {
      self.container.addClass('ls-ui-ctrl-open');
      $.emit(self.namespace + ':component:search:focus');
    }
  }

  return Primary;
});
