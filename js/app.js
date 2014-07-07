/*global console,debugger:false,unused:false */
console.log('demo start...');

require(['jquery', 'vendor/events/pubsub'], function(jQuery) {
  require.config({ baseUrl: '/' });

  require([
    'js/component/search',
    'vendor/locator-core-js/src/api'
  ], function(Search, Api) {

    var search = new Search({
      api: new Api(),
      $: jQuery
    });
  });
});
