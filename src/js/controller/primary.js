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

  function Primary(options) {
    verify(options);

    var self = this;
    var userLocations,
        namespace = options.namespace || 'locservices:ui:primary';

    this.api = new Api(options.api);
    this.container = options.container;
    this.container.addClass('ls-ui-controller-primary');

    $.on(namespace + ':component:search:results', function() {
      userLocations.container.addClass('ls-ui-hidden');
    });

    $.on(namespace + ':component:geolocation:available', function() {
      self.container.addClass('li-ui-ctrl-geolocation');
    });

    new Search({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-search')
    });

    new Geolocation({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-geolocation')
    });

    new Message({
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-message')
    });

    new SearchResults({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-search-results')
    });

    userLocations = new UserLocations({
      translations: options.translations,
      eventNamespace: namespace,
      container: this.container.find('.ls-ui-user-locations')
    });
  }

  return Primary;
});
