/* global require */

require.config({
  baseUrl: '/',

  paths: {
    'pubsub' : 'vendor/events/pubsub',
    'jquery' : 'vendor/jquery/dist/jquery',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
    'jquery',
    'locservices/core/api',
    'locservices/ui/translations/en',
    'locservices/ui/component/search',
    'pubsub'
  ], function($, Api, Translation, Search) {

  'use strict';

  var output = $('.output');
  var comp = $('.search-component');
  var api  = new Api();
  var translations = new Translation();
  var search = new Search({
    api: api,
    translations: translations,
    container: comp,
    eventNamespace: comp.data('namespace')
  });

  $.on('primary-search:component:search:start', function() {
    output.html('');
    output.append(
      $('<li />').text('Starting search...')
    );
  });

  $.on('primary-search:component:search:results', function(results, metadata) {
    output.append(
      $('<li />').text('Results for ' + metadata.searchTerm)
    );

    for(var i = 0; i < results.length; i++) {
      output.append(
        $('<li />').text(results[i].name + ', ' + results[i].container)
      );
    }
  });

  $.on('primary-search:component:search:error', function(msg) {
    output.append(
      $('<li />').text(msg)
    );
  });

  $.on('primary-search:component:search:end', function() {
    output.append(
      $('<li />').text('Search ended...')
    );
  });
});
