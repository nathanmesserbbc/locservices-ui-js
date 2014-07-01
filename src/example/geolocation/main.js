require([
  'jquery',
  'locservices/ui/component/geolocation',
  'locservices/ui/translations/en'
], function($, Geolocation, En) {

  var geolocation = new Geolocation({
    container: $('.locservices-geolocation-example-container'),
    translations: new En()
  });

});