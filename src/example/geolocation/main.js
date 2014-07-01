require([
  'jquery',
  'locservices/ui/component/geolocation',
  'locservices/ui/translations/en',
  'vendor/events/pubsub'
], function($, Geolocation, En) {

  var geolocation = new Geolocation({
    container: $('.locservices-geolocation-example-container'),
    translations: new En()
  });

  $.on('locservices:ui:component:geolocation:result', function(location) {
    $('.location-result').text('Reverse Geocode Location: ' + location.name + "," + location.container);
  });

});