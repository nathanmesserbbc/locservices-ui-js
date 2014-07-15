/* global require, alert */

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
    translations: translations,
    container: comp
  });

  dialog.render(comp, 'This is a dialog message.');

});
