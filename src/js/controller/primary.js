/*global define */

define([
  'jquery',
  'locservices/core/api',
  'locservices/ui/component/geolocation',
  'locservices/ui/component/message',
  'locservices/ui/component/search'
], function(
  $,
  Api,
  Search,
  Message,
  Geolocation
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
    var namespace = options.namespace || 'locservices:ui:primary';

    this.api = new Api(options.api);

    new Search({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace
    });

    new Message({
      translations: options.translations,
      eventNamespace: namespace
    });

    new Geolocation({
      api: this.api,
      translations: options.translations,
      eventNamespace: namespace
    });
  }

  return Primary;
});
