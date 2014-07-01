/*global describe, beforeEach, afterEach, locservices, it:false*/

define([
  'locservices/ui/component/search_results',
  'locservices/ui/translations/en',
  'jquery',
  'fixtures/multiple-results',
  'fixtures/single-result'
],
  function(SearchResults, En, $, response, singleResult) {

  describe('The search-results', function() {
    'use strict';

    var searchResults;

    beforeEach(function() {
      $('body').append('<div id="search-results"></div>');

      searchResults = new SearchResults({
        translations: new En(),
        container: $('#search-results')
      });
    });

    afterEach(function() {
      $('#search-results').remove();
    });

    describe('constructor()', function() {

      it('should set this.componentId to "search-results"', function() {
        expect(searchResults.componentId).toBe('search-results');
      });

      it('should set this.eventNamespace to "locservices:ui:component:search-results"', function() {
        expect(searchResults.eventNamespace).toBe('locservices:ui:component:search-results');
      });

    });

    describe('render()', function() {

      it('should listen to events from search component and call render()', function() {
        var render = sinon.spy(SearchResults.prototype, 'render');
        var results = new SearchResults({
          translations: new En(),
          container: $('#search-results')
        });

        $.emit('locservices:ui:component:search:results', [response.metadata, response.results]);

        expect(render.called).toBe(true);

        SearchResults.prototype.render.restore();
      });

      it('should render results to unordered list', function() {

        $.emit('locservices:ui:component:search:results', [response.metadata, response.results]);

        expect($('#search-results ul li').length).toEqual(response.results.length);

      });

      it('should not call render() if single result returned', function () {
        var render = sinon.spy(SearchResults.prototype, 'render');
        var results = new SearchResults({
          translations: new En(),
          container: $('#search-results')
        });

        $.emit('locservices:ui:component:search:results', [singleResult.metadata, singleResult.results]);

        expect(render.called).toBe(false);

        SearchResults.prototype.render.restore();
      });

    });

  });
});
