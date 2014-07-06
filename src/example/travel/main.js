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
      'place-types': ['road', 'settlement']
    },
    namespace: namespace,
    container: element,
    translations: new En()
  });

  $.on(namespace + ':controller:active', function() {
    element.addClass('active');
    $('.site-name').addClass('site-name-invert');
  });

  $.on(namespace + ':controller:inactive', function() {
    element.removeClass('active');
    $('.site-name').removeClass('site-name-invert');
  });

  $.on(namespace + ':controller:location', function(location) {
    window.location = 'http://beta.bbc.co.uk/travelbeta/' + location.id + '/incidents/road';
  });

});
