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

    if (typeof options.api !== 'object') {
      throw new Error('Gelocation requires an API option.');
    }

    this.api = options.api;

    var self = this;

    this.setComponentOptions(options);

    var label = this.translations.get('geolocation.button.label');
    this.container.append(template.replace('{text}', label));

    this._button = this.container.find('button');

    this._button.on('click', function(e) {
      e.preventDefault();
      $(this).attr('disabled', 'disabled').addClass('disabled');
      self.reverseGeocode();
    });
  }

  Geolocation.prototype = new Component();
  Geolocation.prototype.constructor = Geolocation;

  /**
   * Make a reverse geocode request
   */
  Geolocation.prototype.reverseGeocode = function() {

    var self = this;

    // make a call to the api reverse Geocode method
    function onSuccess(position) {

      var lon = position.coords.longitude;
      var lat = position.coords.latitude;

      self.api.reverseGeocode(lat, lon, {
        // handle the location data. this will emit error if the location is
        // outside of the uk.
        success: function(data) {
          var location = data.results[0];
          // outside of context
          if (!location.isWithinContext) {
            self.emit('error', [{
              code: 'geolocation.error.outsideContext',
              message: 'Your location is not currently supported by this application'
            }]);
          } else {
            self._button.removeAttr('disabled').removeClass('disabled');
            self.emit('geolocation:location', [location]);
          }
        },
        // http error
        error: function() {
          self.emit('error', [{
            code: 'geolocation.error.http',
            message: 'We were unable to make a location api request'
          }]);
        }
      });
    }

    // browser geolocation PositionError
    function onError(error) {

      var code = 'geolocation.error.browser';
      var message = 'An error occurred obtaining the browsers position. Error code ' + error.code;

      // permission
      if (error.code === 1) {
        code += '.permission';
      }

      this.emit('error', [{ code: code, message: message }]);
    }

    // browser geolocation
    geolocation.getCurrentPosition(bind(onSuccess, this), bind(onError, this));
  };

  return Geolocation;

});
