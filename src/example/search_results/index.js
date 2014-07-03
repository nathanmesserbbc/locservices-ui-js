/* global require */

require.config({
  baseUrl: '/',

  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'pubsub': 'vendor/events/pubsub',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
    'jquery',
    'locservices/core/api',
    'locservices/ui/translations/en',
    'locservices/ui/component/search_results',
    'pubsub'
  ], function($, API, Translation, SearchResults) {

  'use strict';

  var api = new API();
  var translations = new Translation();
  var searchResults = new SearchResults({
    translations: translations,
    container: $('#search-results'),
    api: api
  });
  api.search('cardiff', {
    success: function(res) {
      $.emit('locservices:ui:component:search:results', [res.metadata, res.results]);
    }
  });
});
