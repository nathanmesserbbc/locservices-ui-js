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
    {id: 1234, name: 'Llandaff', container: 'Cardiff', placeType: 'settlement'},
    {id: 5678, name: 'The Mumbles', container: 'Swansea', placeType: 'settlement'},
    {id: 1324, name: 'London', container: 'Greater London', placeType: 'settlement'},
    {id: 5681, name: 'Salford', container: 'Salford', placeType: 'settlement'},
    {id: 3453, name: 'Bristol', container: 'Bristol', placeType: 'settlement'},
    {id: 8778, name: 'Bridgend', container: 'Aberdeenshire', placeType: 'settlement'},
    {id: 8778, name: 'Belfast City Airport', container: 'Belfast', placeType: 'settlement'},
    {id: 2654710, name: 'Brighton', container: 'Brighton and Hove', placeType: 'settlement'},
    {id: 2652002, name: 'Crewe', container: 'Cheshire East', placeType: 'settlement'},
    {id: 2645425, name: 'Hull', container: 'Kingston upon Hull', placeType: 'settlement'}
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
