define([
  'jquery',
  'locservices/ui/component/component',
  'locservices/core/geolocation',
  'locservices/core/api'
], function($, Component, geolocation, Api) {

  var template = '<button type="button" class="locservices-ui-component locservices-ui-component-geolocation">';
  template += '<span class="locservices-ui-component-geolocation-label">{text}</span>';
  template += '<span class="locservices-ui-component-geolocation-icon"></span></button>';

  /**
   * Bind a context to a function.
   *
   * @param {Function} callback
   * @param {Object} context
   * @returns {Function}
   */
  function bind(callback, context) {
    return function() {
      return callback.apply(context, arguments);
    };
  }

  /**
   * Geolocation.
   *
   * @param {Object} options
   * @constructor
   */
  function Geolocation(options) {

    this.isSupported = geolocation.isSupported;

    if (this.isSupported === false) {
      return;
    }

    options = options || {};
    options.componentId = 'geolocation';

    var self = this;

    this.setComponentOptions(options);

    var label = this.translations.get('geolocation.button.label');
    this.container.append(template.replace('{text}', label));

    this._button = this.container.find('button');
    this._api = new Api();

    this._button.on('click', function(e) {
      e.preventDefault();
      geolocation.getCurrentPosition(
        function(position) {
          self._api.reverseGeocode(
            position.coords.latitude,
            position.coords.longitude,
            {
              success: bind(self.onSuccess, self),
              error: bind(self.onError, self)
            }
          );
        },
        bind(self.onError, self)
      );
    });
  }

  Geolocation.prototype = new Component();

  /**
   * Success handler.
   *
   * @param {Object} data the response data from the API call
   */
  Geolocation.prototype.onSuccess = function(data) {
    $.emit(this.eventNamespace + ':result', [data.results[0]]);
  };

  /**
   * Error handler
   */
  Geolocation.prototype.onError = function() {
    $.emit(this.eventNamespace + ':error');
  };

  return Geolocation;

});
