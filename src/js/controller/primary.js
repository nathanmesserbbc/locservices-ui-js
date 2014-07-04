/*global define */

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/search',
  'locservices/ui/component/message',
  'locservices/ui/component/geolocation',
  'locservices/ui/component/search_results',
  'locservices/ui/component/user_locations',
  'locservices/ui/component/close_button'
], function(
  $,
  Api,
  Search,
  Message,
  Geolocation,
  SearchResults,
  UserLocations,
  CloseButton
) {
  'use strict';

  var verify = function(options) {
    var requiredOptions = ['api', 'translations', 'container'];
    var count = requiredOptions.length;

    for (var i = 0; i < count; i++) {
      var option = requiredOptions[i];

      if (options[option]) {
        continue;
      }
      throw('Primary controller requires an ' + option + ' option.');
    }
  };

  var outside  = $('<div />').addClass('ls-ui-o');
  var searchEl = $('<div />').addClass('ls-ui-ctrl-primary-search');

  function Primary(options) {
    verify(options);

    var self = this;

    self.userLocations,
    self.results,
    self.message = undefined;
    self.api = new Api(options.api);
    self.container = options.container;
    self.container.addClass('ls-ui-ctrl-primary');
    self.container.append(outside.append(searchEl));

    var namespace = options.namespace || 'locservices:ui';

    $.on(namespace + ':error', function() {
      $.emit(namespace + ':controller:active');
      self.container.addClass('ls-ui-ctrl-active');
    });

    $.on(namespace + ':component:search:results', function() {
      self.container.find('.ls-ui-comp-userLocations').addClass('ls-ui-hidden');
    });

    $.on(namespace + ':component:geolocation:available', function() {
      self.container.addClass('li-ui-ctrl-geolocation');
    });

    $.on(namespace + ':component:search:focus', function() {
      $.emit(namespace + ':controller:active');
      self.container.addClass('ls-ui-ctrl-active');
    });

    $.on(namespace + ':component:geolocation:location', function(location) {
      $.emit(namespace + ':controller:location', [location]);
    });

    $.on(namespace + ':component:search_results:location', function(location) {
      $.emit(namespace + ':controller:location', [location]);
    });

    $.on(namespace + ':component:close_button:clicked', function() {
      self.message.clear();
      self.results.clear();
      $.emit(namespace + ':controller:inactive');
      self.container.removeClass('ls-ui-ctrl-active');
    });

    self.search = new Search({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: searchEl
    });

    self.geolocation = new Geolocation({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: outside
    });

    self.message = new Message({
      translations: options.translations,
      eventNamespace: namespace,
      container: outside
    });

    self.results = new SearchResults({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: outside
    });

    self.userLocations = new UserLocations({
      translations: options.translations,
      eventNamespace: namespace,
      container: outside
    });

    self.closeButton = new CloseButton({
      translations: options.translations,
      eventNamespace: namespace,
      container: outside
    });
  }

  return Primary;
});
