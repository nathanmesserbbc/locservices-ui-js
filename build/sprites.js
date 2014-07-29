'use strict';

module.exports = function() {

  return {
    // standard size icons
    standard: {
      src: 'src/img/x1/*.png',
      destImg: 'src/img/sprites/locservices_ui_x1.png',
      destCSS: 'src/img/sprites/locservices_ui_x1.css',
      padding: 2
    },
    retina: {
      src: 'src/img/x2/*.png',
      destImg: 'src/img/sprites/locservices_ui_x2.png',
      destCSS: 'src/img/sprites/locservices_ui_x2.css',
      padding: 2
    }
  };
};
