/*global console,debugger:false*/

require.config({
  baseUrl: '/',
  paths: {
    'jquery' : './vendor/jquery/dist/jquery',
    'pubsub' : './vendor/events/pubsub',
    'locservices/ui' : './js',
    'locservices/core': './vendor/locservices-core-js/src'
  }
});

require([
  'jquery',
  'locservices/ui/translations/en',
  'locservices/ui/component/user_locations',
  'pubsub'
], function($, En, UserLocations) {

  var userLocations = new UserLocations({
    //api: new Api(),
    translations: new En(),
    container: $('.locservices-ui-container')
  });


  var locations = [
    {id: 1234, name: 'Llandaff', container: 'Cardiff', placeType: 'settlement', country: 'GB'},
    {id: 5678, name: 'The Mumbles', container: 'Swansea', placeType: 'settlement', country: 'GB'},
    {id: 1324, name: 'London', container: 'Greater London', placeType: 'settlement', country: 'GB'},
    {id: 5681, name: 'Salford', container: 'Salford', placeType: 'settlement', country: 'GB'},
    {id: 3453, name: 'Bristol', container: 'Bristol', placeType: 'settlement', country: 'GB'},
    {id: 8778, name: 'Bridgend', container: 'Aberdeenshire', placeType: 'settlement', country: 'GB'},
    {id: 8778, name: 'Belfast City Airport', container: 'Belfast', placeType: 'settlement', country: 'GB'},
    {id: 2654710, name: 'Brighton', container: 'Brighton and Hove', placeType: 'settlement', country: 'GB'},
    {id: 2652002, name: 'Crewe', container: 'Cheshire East', placeType: 'settlement', country: 'GB'},
    {id: 2645425, name: 'Hull', container: 'Kingston upon Hull', placeType: 'settlement', country: 'GB'},
    {id: 1, name: 'M1 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: 4, name: 'M4 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: 42, name: 'M42 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: 5, name: 'M5 (Motorway)', container: 'United Kingdom', placeType: 'road', country: 'GB'},
    {id: 7891231, name: 'Paris', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: 7891232, name: 'Lille', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: 7891233, name: 'Marseille', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: 7891234, name: 'Calais', container: 'France', placeType: 'settlement', country: 'FR'},
    {id: 7891231, name: 'New York', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: 7891232, name: 'Washington', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: 7891233, name: 'Boston', container: 'United States', placeType: 'settlement', country: 'US'},
    {id: 7891234, name: 'Chicago', container: 'United States', placeType: 'settlement', country: 'US'}
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
