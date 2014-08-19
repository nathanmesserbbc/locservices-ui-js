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
  'locservices/ui/component/dialog',
  'locservices/ui/utils/stats'
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
  Dialog,
  Stats
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

  /**
   * Primary Controller.
   *
   * @param {Object} options controller options.
   *
   * @constructor
   */
  function Primary(options) {

    verify(options);

    this.namespace = options.namespace || 'locservices:ui';

    if (typeof options.echoClient === 'object') {
      this._stats = new Stats(options.echoClient, {
        namespace: this.namespace
      });
    }

    var self = this;
    var alwaysOpen = options.alwaysOpen || false;

    var events = {
      onError: function() {

        // @todo test this
        self.results.clear();
        self.autoComplete.clear();
        self.container.find('.ls-ui-comp-user_locations').addClass('ls-ui-hidden');

      },
      onInputInteractionEnd: function() {
        if (self.coldStartDialog) {
          self.coldStartDialog.remove();
          self.coldStartDialog = undefined;
        }
      },
      onLocation: function(location) {
        self.message.clear();
        self.container.find('.ls-ui-comp-user_locations').addClass('ls-ui-hidden');
        self.selectLocation(location);
      },
      onActive: function() {
        $.emit(self.namespace + ':controller:active');
        self.container.addClass('ls-ui-ctrl-active');
      },
      onGeolocationAvailable: function() {
        $.emit(self.namespace + ':controller:geolocation:available');
        self.container.addClass('ls-ui-ctrl-geolocation');
      },
      onSearchResults: function() {
        self.container.find('.ls-ui-comp-user_locations').addClass('ls-ui-hidden');
      },
      onAutoCompleteResults: function() {
        self.message.clear();
        self.results.clear();
        self.container.find('.ls-ui-comp-user_locations').addClass('ls-ui-hidden');
      },
      onResultsClear: function() {

        // @todo test this
        self.message.clear();
        self.results.clear();

        self.container.find('.ls-ui-comp-user_locations').removeClass('ls-ui-hidden');
      },
      onClose: function() {
        self.close();
      }
    };

    self.translations = options.translations;
    self.api = new Api(options.api);
    self.container = options.container;

    self.preferredLocation = new PreferredLocation(self.api);
    self.bbcCookies = new BBCCookies();
    self.cookies = new Cookies();
    self.cookiesColdStartKey = 'locserv_uics';

    self.container.addClass('ls-ui-ctrl-primary')
                  .append(outside.append(searchEl));

    // @todo test this
    $.on(self.namespace + ':error', events.onError);

    $.on(self.namespace + ':component:search:focus', events.onActive);
    $.on(self.namespace + ':component:geolocation:click', events.onActive);

    $.on(self.namespace + ':component:search:clear', events.onInputInteractionEnd);
    $.on(self.namespace + ':component:search:end', events.onInputInteractionEnd);
    $.on(self.namespace + ':component:auto_complete:results', events.onInputInteractionEnd);

    $.on(self.namespace + ':component:search:results', events.onSearchResults);
    $.on(self.namespace + ':component:auto_complete:render', events.onAutoCompleteResults);

    $.on(self.namespace + ':component:auto_complete:clear', events.onResultsClear);
    $.on(self.namespace + ':component:search:clear', events.onResultsClear);

    $.on(self.namespace + ':component:geolocation:location', events.onLocation);
    $.on(self.namespace + ':component:auto_complete:location', events.onLocation);
    $.on(self.namespace + ':component:user_locations:location', events.onLocation);
    $.on(self.namespace + ':component:search_results:location', events.onLocation);

    $.on(self.namespace + ':component:geolocation:available', events.onGeolocationAvailable);

    $.on(self.namespace + ':component:close_button:clicked', events.onClose);

    self.search = new Search({
      api: this.api,
      translations: self.translations,
      eventNamespace: self.namespace,
      container: searchEl,
      locationName: options.locationName
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

  /**
   * Close the component
   */
  Primary.prototype.close = function() {
    // this results in message.clear, results.clear and autoComplete.clear
    // being called as they listen for search:clear
    this.search.clear();

    $.emit(this.namespace + ':controller:inactive');

    // @todo test this
    this.container.removeClass('ls-ui-ctrl-active');

    // @todo test this
    this.container.find('.ls-ui-comp-user_locations').removeClass('ls-ui-hidden');
  };

  /**
   * Handle selecting a single location
   *
   * @param {Object} location
   */
  Primary.prototype.selectLocation = function(location) {
    var self = this;
    var emitLocation = function() {
      $.emit(self.namespace + ':controller:location', [location]);
    };

    var setAsPreferredLocation = function() {
      self.preferredLocation.set(location.id, {
        success: function() {
          emitLocation();
        },
        error: function() {
          // @todo log/display error?
          emitLocation();
        }
      });
    };

    var declinePreferredLocation = function() {
      // @todo clear the cookiesColdStartKey cookie if
      // ever setting a preferred location ?!
      var expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      self.cookies.set(
        self.cookiesColdStartKey,
        '1',
        expires.toUTCString(),
        '/',
        self.preferredLocation.getCookieDomain()
      );
      emitLocation();
    };

    if (
      this.preferredLocation.isValidLocation(location) &&
      this.shouldColdStartDialogBeDisplayed()
    ) {
      this.coldStartDialog = new Dialog({
        container: outside,
        translations: this.translations,
        message: self.translations.get(
          'primary.cold_start',
          {
            name: location.name
          }
        ),
        confirmLabel: self.translations.get('primary.cold_start.confirm'),
        cancelLabel: self.translations.get('primary.cold_start.cancel'),
        confirm: function() {
          self.coldStartDialog = undefined;
          setAsPreferredLocation();
        },
        cancel: function() {
          self.coldStartDialog = undefined;
          declinePreferredLocation();
        }
      });
    } else {
      emitLocation();
    }

  };

  /**
   * Should the cold start dialog be displayed
   *
   * @return {Boolean}
   */
  Primary.prototype.shouldColdStartDialogBeDisplayed = function() {
    return (
      false === this.preferredLocation.isSet() &&
      false === this.bbcCookies.isPersonalisationDisabled() &&
      this.cookies.isSupported() &&
      '1' !== this.cookies.get(this.cookiesColdStartKey)
    );
  };

  return Primary;
});
