/*global console,debugger:false*/
console.log("demo start...");

require(["jquery-1"], function(jQuery) {
  require.config({ baseUrl: "/" });

  require([
    "js/component/search",
    "vendor/locator-core-js/src/api"
  ], function(Search, Api) {

    var search = new Search({
      api: new Api(),
      $: jQuery
    });
  });
});
