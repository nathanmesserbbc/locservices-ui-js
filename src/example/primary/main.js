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

  var namespace = 'primary';
  var element   = $('.primary-search');
  new SearchController({
    api: {
      env: 'int',
      protocol: 'http',
      filter: 'domestic',
      'place-types': ['road', 'settlement', 'airport'],
      order: 'importance'
    },
    namespace: namespace,
    container: element,
    translations: new En(),
    alwaysOpen: true
  });

  $.on(namespace + ':controller:active', function() {
    element.addClass('active');
  });

  $.on(namespace + ':controller:inactive', function() {
    element.removeClass('active');
  });

  $.on(namespace + ':controller:location', function(location) {
    window.location = 'http://beta.bbc.co.uk/travelbeta/' + location.id + '/incidents/road';
  });

});
