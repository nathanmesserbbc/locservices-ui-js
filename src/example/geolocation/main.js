require([
  'jquery',
  'locservices/ui/component/geolocation',
  'locservices/ui/translations/en',
  'locservices/core/api',
  'vendor/events/pubsub'
], function($, Geolocation, En, Api) {

  var geolocation = new Geolocation({
    container: $('.locservices-geolocation-example-container'),
    translations: new En(),
    api: new Api()
  });

  geolocation.on('geolocation:location', function(location) {
    $('.location-result').text('Reverse Geocode Location: ' + location.name + "," + location.container);
  });

});