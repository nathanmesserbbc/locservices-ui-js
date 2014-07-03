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

  var namespace = $('.primary-search').data('namespace');

  new SearchController({
    api: {
      env: 'live',
      protocol: 'http',
      placetypes: ['road', 'settlement']
    },
    namespace: namespace,
    container: $('.primary-search'),
    translations: new En()
  });

  $.on(namespace + ':controller:active', function() {
    $('body').addClass('active');
  });

  $.on(namespace + ':controller:inactive', function() {
    $('body').removeClass('active');
  });

});
