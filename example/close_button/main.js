/* global require, alert */

require.config({
  baseUrl: '/locservices-ui-js',

  paths: {
    'pubsub' : 'vendor/events/pubsub',
    'jquery' : 'vendor/jquery/dist/jquery',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
    'jquery',
    'locservices/ui/translations/en',
    'locservices/ui/component/close_button',
    'pubsub'
  ], function($, Translation, CloseButton) {

  'use strict';

  var comp = $('.close-component');
  var translations = new Translation();
  new CloseButton({
    translations: translations,
    container: comp,
    eventNamespace: 'close-button'
  });

  $.on('close-button:component:close_button:clicked', function() {
    alert('Clicked');
  });

});
