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
    'locservices/ui/translations/en',
    'locservices/ui/component/dialog',
    'pubsub'
  ], function($, Translation, Dialog) {

  'use strict';

  var comp = $('.dialog-component');
  var translations = new Translation();
  var dialog = new Dialog({
    container: comp,
    message: 'This is a dialog.'
  });

});
