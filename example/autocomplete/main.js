require.config({
    baseUrl: '/locservices-ui-js',
    paths: {
        jquery: '/vendor/jquery/dist/jquery',
        'locservices/ui': '/js',
        'locservices/core': '/vendor/locservices-core-js/src'
    }
});

require([
  'jquery',
  'locservices/ui/component/autocomplete',
  'locservices/ui/translations/en',
  'locservices/core/api',
  'vendor/events/pubsub'
], function($, AutoComplete, En, Api) {

  var container = $('.autocomplete-container');
  var input = $('#search-input-text');
  var resultContainer = $('#selected-location');

  var autoComplete = new AutoComplete({
    api: new Api(),
    translations: new En(),
    element: input,
    container: container
  });

  autoComplete.on('location', function(location) {console.log(arguments);
    var name = location.name;
    if (location.container) {
      name += ', ' + location.container;
    }
    resultContainer.text('Selected Location: ' + name);
  });

});
