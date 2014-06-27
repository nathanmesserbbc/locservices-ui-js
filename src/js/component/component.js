(function(global, factory) {
  if (typeof define === "function" && define.amd) {
    return define(factory);
  } else {
    global.locservices = global.locservices || {};
    locservices.ui = locservices.ui || {};
    locservices.ui.component = locservices.ui.component || {};
    locservices.ui.component.component = factory();
  }
}(this, function() {

  "use strict";


  function Component() {}

  Component.prototype.setComponentOptions = function(options) {

    options = options || {};

    if (undefined === options.translations) {
      throw new Error('Component requires a translations option.');
    } else {
      this.translations = options.translations;
    }

    this.componentId = options.componentId || "component";

    this.eventNamespaceBase = "locservices:ui";
    if (options.eventNamespace) {
      this.eventNamespaceBase = options.eventNamespace;
    }
    this.eventNamespace = this.eventNamespaceBase +":component:" +this.componentId;

  };

  return Component;

}));
