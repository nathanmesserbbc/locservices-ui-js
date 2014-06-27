/*global describe, beforeEach, locservices, it:false*/

describe("The component module", function() {
  "use strict";

  var component;
  var translations;

  beforeEach(function() {
    component = new locservices.ui.component.component();
  });

  describe("setComponentOptions()", function() {

    beforeEach(function() {
      translations = new locservices.ui.translations.en();
      component.setComponentOptions({
        translations: translations
      });
    });

    // event namespace

    it("should default to eventNamespaceBase \"locservices:ui\"", function() {
      expect(component.eventNamespaceBase).toBe("locservices:ui");
    });

    it("should set eventNamespaceBase from options.eventNamespace", function() {
      var eventNamespace = "foo:bar";
      component.setComponentOptions({
        translations: translations,
        eventNamespace: eventNamespace
      });
      expect(component.eventNamespaceBase).toBe(eventNamespace);
    });

    it("should default to eventNamespace \"locservices:ui:component:component\"", function() {
      expect(component.eventNamespace).toBe("locservices:ui:component:component");
    });

    it("should set eventNamespace from options.eventNamespace", function() {
      var eventNamespace = "foo:bar";
      var expectedValue = eventNamespace + ":component:component";
      component.setComponentOptions({
        translations: translations,
        eventNamespace: eventNamespace
      });
      expect(component.eventNamespace).toBe(expectedValue);
    });

    // componentId

    it("should default this.componentId to \"component\"", function() {
      expect(component.componentId).toBe("component");
    });

    it("should set this.componentId from options.componentId", function() {
      var expectedValue = "foo";
      component.setComponentOptions({
        translations: translations,
        componentId: expectedValue
      });
      expect(component.componentId).toBe(expectedValue);
    });

    // translations

    it("should throw an exception if no translations module option", function() {
      expect(component.setComponentOptions).toThrow();
    });

    it("should set this.tranlations from options.translations", function() {
      expect(component.translations).toEqual(translations);
    });

  });

});
