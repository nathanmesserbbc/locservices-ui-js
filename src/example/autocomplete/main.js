require([
  'jquery',
  'locservices/ui/component/autocomplete',
  'locservices/ui/translations/en',
  'locservices/core/api'
], function($, AutoComplete, En, Api) {

  var autoComplete = new AutoComplete({
    api: new Api(),
    translations: new En(),
    element: $('#autocomplete-form input[type=text]')
  });

});