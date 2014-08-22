define(function() {

  'use strict';

  var dictionary = {
    'auto_complete.error.search': 'Mae\'n ddrwg gennym, mae yna broblemau technegol ar hyn o bryd.',
    'user_locations.heading.preferred': 'Prif leoliad',
    'user_locations.heading.other': 'Lleoliadau eraill',
    'user_locations.heading.recent': 'Recent locations',
    'user_locations.action.recent': 'Dewis',
    'user_locations.action.remove': 'Dileu',
    'user_locations.dialog.confirm': 'Cadarnhau',
    'user_locations.dialog.cancel': 'Canslo',
    'user_locations.dialog.remove_preferred': 'Fyddwn ni ddim yn defnyddio <strong>{name}</strong> i roi gwybodaeth leol berthnasol i chi ar draws y BBC',
    'user_locations.dialog.prefer': 'Byddwn ni nawr yn defnyddio <strong>{name}</strong> i roi gwybodaeth leol berthnasol i chi ar draws y BBC',
    'user_locations.message.preferred': 'Byddwn ni\'n defnyddio eich lleoliad i roi gwybodaeth leol berthnasol i chi ar draws y BBC',
    'user_locations.message.change_preferred': 'I newid eich prif leoliad, defnyddiwch y seren i ddewis un o\'ch lleoliadau eraill',
    'user_locations.error.preferred_location': 'Mae\'n ddrwg gennym, mae yna broblemau technegol ar hyn o bryd.',
    'close_button.label': 'Cau',
    'search.placeholder': 'Rhowch dref, ddinas neu god post yn y DU yma',
    'search.clear': 'Clirio',
    'search.submit': 'Chwilio',
    'search.submit.title': 'Chwilio am leoliad',
    'search_results.more': 'Dangos mwy o ganlyniadau',
    'geolocation.button.label': 'Defnyddiwch fy lleoliad',
    'geolocation.error.http': 'Nid oes modd i ni ddefnyddio eich lleoliad.',
    'geolocation.error.browser': 'Nid oes modd i ni ddefnyddio eich lleoliad.',
    'geolocation.error.browser.permission': 'Rhaid galluogi\'r Gwasanaethau Lleoliad ymlaen yng ngosodiadau eich dyfais neu\'r porwr.',
    'geolocation.error.outsideContext': 'Dyw\'r system ddim yn medru defnyddio\'r lleoliad yma',
    'message.geolocation.detect': 'Dod o hyd i\'ch lleoliad',
    'message.no_results': 'Wedi methu dod o hyd i ganlyniadau ar gyfer "{searchTerm}"',
    'message.results': 'Canlyniadau Chwilio ar gyfer "{searchTerm}"',
    'message.total_results': 'Dangos {current} o {total}',
    'primary.cold_start': 'Ydych chi eisiau defnyddio <strong>{name}</strong> fel eich prif leoliad i roi gwybodaeth leol berthnasol i chi ar draws y BBC?',
    'primary.cold_start.confirm': 'Ydw',
    'primary.cold_start.cancel': 'Nac ydw',
    'primary_search.close': 'Cau',
    'test.interpolation': 'Value {a} and value {b}.'
  };

  function TranslationsCy() {}

  /**
   * Returns translation for given key or false if
   * key is not present
   *
   * @param {String} key for translation
   * @param {Object} interpolationDictionary
   * @return {String|Boolean}
   */
  TranslationsCy.prototype.get = function(key, interpolationDictionary) {
    var result;
    if (!dictionary.hasOwnProperty(key)) {
      return false;
    }
    result = dictionary[key];
    if ('object' === typeof interpolationDictionary) {
      result = String(result).replace(
        /\{([^{}]*)\}/g,
        function(valueToReplace, interpolationKey) {
          if (interpolationDictionary.hasOwnProperty(interpolationKey)) {
            return interpolationDictionary[interpolationKey];
          } else {
            return valueToReplace;
          }
        }
      );
    }
    return result;
  };

  /**
   * Sets the translation for a given key
   *
   * @param {String} key for translation
   * @param {String} value translation value for given key
   * @return {Boolean}
   */
  TranslationsCy.prototype.set = function(key, value) {

    if ('string' !== typeof key || '' === key || undefined === value) {
      return false;
    }
    dictionary[key] = value;
    return true;
  };

  return TranslationsCy;

});
