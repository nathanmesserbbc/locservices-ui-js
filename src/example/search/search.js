/* global require */

require.config({
  baseUrl: '/',

  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
    'jquery',
    'locservices/core/api',
    'locservices/ui/translations/en',
    'locservices/ui/component/search'
  ], function($, Api, Translation, Search) {

  'use strict';

  var api = new Api();
  var translations = new Translation();
  var search = new Search({
    api: api,
    translations: translations,
    container: $('form.locator-container')
  });
});
