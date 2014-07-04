/*global define */

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/search',
  'locservices/ui/component/message',
  'locservices/ui/component/geolocation',
  'locservices/ui/component/search_results',
  'locservices/ui/component/user_locations'
], function(
  $,
  Api,
  Search,
  Message,
  Geolocation,
  SearchResults,
  UserLocations
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

  var closeBtn = function(translations) {
    return $('<button />')
            .addClass('ls-ui-close')
            .text(translations.get('primary_search.close'));
  };

  function Primary(options) {
    verify(options);

    var self = this;

    self.userLocations,
    self.results,
    self.message = undefined;
    self.api = new Api(options.api);
    self.container = options.container;
    self.container.addClass('ls-ui-ctrl-primary');
    self.closeButton = closeBtn(options.translations);
    self.container.find('.ls-ui-o').append(this.closeButton);

    var namespace = options.namespace || 'locservices:ui:primary';

    $.on(namespace + ':error', function() {
      $.emit(namespace + ':controller:active');
      self.container.addClass('ls-ui-ctrl-active');
    });

    $.on(namespace + ':component:search:results', function() {
      self.userLocations.container.addClass('ls-ui-hidden');
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

    self.closeButton.on('click', function(e) {
      e.preventDefault();
      self.message.clear();
      self.results.clear();
      $.emit(namespace + ':controller:inactive');
      self.container.removeClass('ls-ui-ctrl-active');
    });

    self.search = new Search({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-search')
    });

    self.geolocation = new Geolocation({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-geolocation')
    });

    self.message = new Message({
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-message')
    });

    self.results = new SearchResults({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-search-results')
    });

    self.userLocations = new UserLocations({
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-user-locations')
    });
  }

  return Primary;
});
