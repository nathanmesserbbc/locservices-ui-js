/* global require */

require.config({
  baseUrl: '/',

  paths: {
    'pubsub' : './vendor/events/pubsub',
    'jquery' : './vendor/jquery/dist/jquery',
    'locservices/ui' : './js',
    'locservices/core': './vendor/locservices-core-js/src'
  }
});

require([
    'jquery',
    'locservices/ui/translations/en',
    'locservices/ui/component/message',
    'pubsub'
  ], function($, En, Message) {

  'use strict';

  var namespace = $('.message-component').data('namespace');
  var message = new Message({
    translations: new En(),
    container: $('.message-component'),
    eventNamespace: namespace
  });

  $.emit(namespace + ':error', ['Sample error message']);
});
