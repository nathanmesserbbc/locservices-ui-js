/*global define */

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/search',
  'locservices/ui/component/message',
  'locservices/ui/component/geolocation',
  'locservices/ui/component/auto_complete',
  'locservices/ui/component/search_results',
  'locservices/ui/component/user_locations',
  'locservices/ui/component/close_button'
], function(
  $,
  Api,
  Search,
  Message,
  Geolocation,
  AutoComplete,
  SearchResults,
  UserLocations,
  CloseButton
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

  function Primary(options) {
    verify(options);

    var self = this;
    var alwaysOpen = options.alwaysOpen || false;

    var events = {
      onLocation: function(location) {
        $.emit(self.namespace + ':controller:location', [location]);
      },
      onActive: function() {
        $.emit(self.namespace + ':controller:active');
        self.container.addClass('ls-ui-ctrl-active');
      },
      onGeolocation: function() {
        self.container.addClass('ls-ui-ctrl-geolocation');
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
      translations: options.translations,
      eventNamespace: self.namespace,
      container: searchEl
    });

    self.autoComplete = new AutoComplete({
      api: this.api,
      translations: options.translations,
      eventNamespace: self.namespace,
      element: self.search.input,
      container: outside
    });

    self.message = new Message({
      translations: options.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.results = new SearchResults({
      api: this.api,
      translations: options.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.geolocation = new Geolocation({
      api: this.api,
      translations: options.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    self.userLocations = new UserLocations({
      api: this.api,
      translations: options.translations,
      eventNamespace: self.namespace,
      container: outside
    });

    if (!alwaysOpen) {
      self.closeButton = new CloseButton({
        translations: options.translations,
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
