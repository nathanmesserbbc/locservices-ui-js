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
  'locservices/ui/controller/primary',
  'locservices/ui/translations/en',
  'vendor/events/pubsub'
], function($, SearchController, En) {

  new SearchController({
    api: {
      env: 'live',
      protocol: 'http',
      placetypes: ['road', 'settlement']
    },
    namespace: $('.primary-search').data('namespace'),
    container: $('.primary-search'),
    translations: new En()
  });

});
