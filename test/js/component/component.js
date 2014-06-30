/*global describe, beforeEach, locservices, it:false*/

describe('The component module', function() {
  'use strict';

  var component;
  var translations;

  beforeEach(function() {
    component = new locservices.ui.component.Component();
  });

  describe('setComponentOptions()', function() {

    beforeEach(function() {
      translations = new locservices.ui.translations.En();
      component.setComponentOptions({
        translations: translations,
        container: null
      });
    });

    // event namespace

    it('should default to eventNamespaceBase "locservices:ui"', function() {
      expect(component.eventNamespaceBase).toBe('locservices:ui');
    });

    it('should set eventNamespaceBase from options.eventNamespace', function() {
      var eventNamespace = 'foo:bar';
      component.setComponentOptions({
        translations: translations,
        eventNamespace: eventNamespace,
        container: null
      });
      expect(component.eventNamespaceBase).toBe(eventNamespace);
    });

    it('should default to eventNamespace "locservices:ui:component:component"', function() {
      expect(component.eventNamespace).toBe('locservices:ui:component:component');
    });

    it('should set eventNamespace from options.eventNamespace', function() {
      var eventNamespace = 'foo:bar';
      var expectedValue = eventNamespace + ':component:component';
      component.setComponentOptions({
        translations: translations,
        eventNamespace: eventNamespace,
        container: null
      });
      expect(component.eventNamespace).toBe(expectedValue);
    });

    // componentId

    it('should default this.componentId to "component"', function() {
      expect(component.componentId).toBe('component');
    });

    it('should set this.componentId from options.componentId', function() {
      var expectedValue = 'foo';
      component.setComponentOptions({
        translations: translations,
        componentId: expectedValue,
        container: null
      });
      expect(component.componentId).toBe(expectedValue);
    });

    // translations

    it('should throw an exception if no trnslation module option', function() {
      var failure = function() {
        component.setComponentOptions({
          container: null
        });
      };
      expect(failure).toThrow(new Error('Component requires a translations parameter.'));
    });

    it('should set this.tranlations from options.translations', function() {
      expect(component.translations).toEqual(translations);
    });

    // container

    it('should throw an exception if options do not container an element', function() {
      var failure = function() {
        component.setComponentOptions({
          translations: translations
        });
      };
      expect(failure).toThrow(new Error('Component requires container parameter.'));
    });

  });

});
