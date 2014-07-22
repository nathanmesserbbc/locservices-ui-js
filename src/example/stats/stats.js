/*global console,debugger:false*/

require.config({
  baseUrl: '/',
  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'pubsub' : 'vendor/events/pubsub',
    'echo' : 'vendor/echo/echo',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
  'jquery',
  'locservices/ui/translations/en',
  'locservices/ui/controller/primary',
  'locservices/ui/utils/stats',
  'pubsub'
], function($, En, PrimaryController, Stats) {

  var controller = new PrimaryController({
    api: {
      env: 'test',
      protocol: 'http',
      placetypes: ['road', 'settlement']
    },
    container: $('.locservices-ui-container'),
    translations: new En()
  });

  var stats = new Stats();
  stats.registerEventNamespace('locservices:ui');

});
