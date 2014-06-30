/*global console,debugger:false*/

require.config({
  baseUrl: '/',
  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
  'jquery',
  'js/translations/en',
  'js/component/user_locations'
], function($, En, UserLocations) {

  var userLocations = new UserLocations({
    //api: new Api(),
    translations: new En(),
    container: $('.locservices-ui-container')
  });

});
