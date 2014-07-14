/*global console,debugger:false*/

require.config({
  baseUrl: '/',
  paths: {
    'jquery' : 'vendor/jquery/dist/jquery',
    'pubsub' : 'vendor/events/pubsub',
    'locservices/ui' : 'js',
    'locservices/core': 'vendor/locservices-core-js/src'
  }
});

require([
  'jquery',
  'locservices/core/api',
  'locservices/ui/translations/en',
  'locservices/ui/component/user_locations',
  'pubsub'
], function($, Api, En, UserLocations) {

  var userLocations = new UserLocations({
    api: new Api({
      env: 'int',
      'place-types': ['road', 'settlement', 'airport']
    }),
    translations: new En(),
    container: $('.locservices-ui-container')
  });


  var locations = [
    {id: "2644160", name: 'Llandaff', container: 'Cardiff', placeType: 'settlement', country: 'GB'},
    {id: "2641971", name: 'The Mumbles', container: 'Swansea', placeType: 'settlement', country: 'GB'},
    {id: "2643743", name: 'London', container: 'Greater London', placeType: 'settlement', country: 'GB'},
    {id: "2638671", name: 'Salford', container: 'Salford', placeType: 'settlement', country: 'GB'},
    {id: "2654675", name: 'Bristol', container: 'Bristol', placeType: 'settlement', country: 'GB'},
    {id: "2654755", name: 'Bridgend', container: 'Aberdeenshire', placeType: 'settlement', country: 'GB'},
    {id: "6296570", name: 'Belfast City Airport', container: 'Belfast', placeType: 'settlement', country: 'GB'},
    {id: "2654710", name: 'Brighton', container: 'Brighton and Hove', placeType: 'settlement', country: 'GB'},
    {id: "2652002", name: 'Crewe', container: 'Cheshire East', placeType: 'settlement', country: 'GB'},
    {id: "2645425", name: 'Hull', container: 'Kingston upon Hull', placeType: 'settlement', country: 'GB'},
    {id: "8714914", name: 'M1 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: "8715007", name: 'M4 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: "8715009", name: 'M42 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: "8715013", name: 'M5 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: "2988507", name: 'Paris', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: "2998324", name: 'Lille', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: "2995469", name: 'Marseille', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: "3029162", name: 'Calais', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: "5128581", name: 'New York', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: "4140963", name: 'Washington', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: "4930956", name: 'Boston', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: "4887398", name: 'Chicago', container: 'United States', placeType: 'settlement', country: 'US'}
  ];
  $('.addLocation').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();
    userLocations.recentLocations.add(
      locations[Math.floor(Math.random() * locations.length)]
    );
    userLocations.render();
  });

});
