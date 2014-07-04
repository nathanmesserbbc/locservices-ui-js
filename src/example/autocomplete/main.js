require([
  'jquery',
  'locservices/ui/component/autocomplete',
  'locservices/ui/translations/en',
  'locservices/core/api',
  'vendor/events/pubsub'
], function($, AutoComplete, En, Api) {

  var container = $('.autocomplete-container');
  var input = $('#autocomplete-form input[type=text]');

  var autoComplete = new AutoComplete({
    api: new Api(),
    translations: new En(),
    element: input,
    container: container
  });

  autoComplete.on('location', function(location) {
    console.log(location);
  });

});