'use strict';

module.exports = function() {

  return {
    // standard size icons
    standard: {
      src: [
        'src/img/x1/main_star_dark_44px.png',
        'src/img/x1/close_dark_44px.png',
        'src/img/x1/delete_dark_44px.png',
        'src/img/x1/delete_light_44px.png',
        'src/img/x1/detect_dark_44px.png',
        'src/img/x1/detect_light_44px.png',
        'src/img/x1/close_light_44px.png',
        'src/img/x1/main_star_light_44px.png',
        'src/img/x1/other_star_dark_44px.png',
        'src/img/x1/other_star_light_44px.png',
        'src/img/x1/search_dark_44px.png',
        'src/img/x1/search_light_44px.png'
      ],
      algorithm: 'top-down',
      algorithmOpts: {
        sort: false
      },
      destImg: 'src/img/sprites/locservices_ui_x1.png',
      destCSS: 'src/img/sprites/locservices_ui_x1.css',
      padding: 2
    },
    retina: {
      src: [
        'src/img/x2/main_star_dark_88px.png',
        'src/img/x2/close_dark_88px.png',
        'src/img/x2/delete_dark_88px.png',
        'src/img/x2/delete_light_88px.png',
        'src/img/x2/detect_dark_88px.png',
        'src/img/x2/detect_light_88px.png',
        'src/img/x2/close_light_88px.png',
        'src/img/x2/main_star_light_88px.png',
        'src/img/x2/other_star_dark_88px.png',
        'src/img/x2/other_star_light_88px.png',
        'src/img/x2/search_dark_88px.png',
        'src/img/x2/search_light_88px.png'
      ],
      algorithm: 'top-down',
      algorithmOpts: {
        sort: false
      },
      destImg: 'src/img/sprites/locservices_ui_x2.png',
      destCSS: 'src/img/sprites/locservices_ui_x2.css',
      padding: 2
    }
  };
};
