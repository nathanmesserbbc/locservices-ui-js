Changes
=======

1.4.0 - 2015-06-02
------------------

* [feature] - Stats events for a search with no results now include a search term (#124)
* [feature] - The location object emitted by the controller:location event includes a wasSetAsPreferredLocationDueToColdStart: true property if the location was set as the preferred location due to the cold start dialog. (#126)

1.3.1 - 2015-03-16
------------------

* [fix] - Location prefer / delete buttons correctly shows pointer cursor (was hand) (#119, #118)
* [fix] - Key events in the auto-complete component now bound to the instances container (was document) (#123)

1.3.0 - 2014-09-22
------------------

* [feature] - Addition of non-responsive CSS stylesheet, renamed all.min.css to locservices-ui.min.css (#105)
* [fix] - Remove cold start dialog to prevent duplicate display (#74, #79, #80)
* [fix] - VoiceOver improvements for user location dialogs (#86)
* [fix] - Long placenames wrap over multiple lines in IE11 (#111)
* [fix] - Ensure cold start dialog is visible in viewport on iOS (#113)
* [fix] - Remove "with results" class from when results are cleared (#81)
* [fix] - reverseGeocode method in geolocation module  emits start event instead of click event (#64)
* [fix] - Added main entry for bower metadata (#49)
* [fix] - Reverted iOS6 focus fix (#92) when loading more search results (#115)  


1.2.1 - 2014-09-16
------------------

* [fix] - Better checking for local storage capability (#70)
* [fix] - Focus set to first search result after searching (#84)
* [fix] - Converted links to buttons in user locations for better VoiceOver visiblity (#85)
* [fix] - Convert search clear input link to button for VoiceOver visibility (#100)
* [fix] - Ensure cold start dialog is visible in viewport after selecting a location from search results (#93)
* [fix] - Focus set to correct place after tapping more search results button in iOS6 when VoiceOver is active (#92) 
* [fix] - Allow long location names to break mid word to wrap across lines (#98)
* [fix] - Added missing full stops in some welsh tranlsations (#76)
* [fix] - Removed duplicate styling rules in distribution css (#78)


1.2.0 - 2014-07-28
------------------

* [feature] - Allow disabling preferred location in user locations component (#66)
* [feature] - Allow disabling geolocation (#68)


1.1.0 - 2014-07-21
------------------

* [feature] - Allow setting a location name to be displayed when the user is not interacting with search   
* [fix] - User locations module is now displayed when in alwaysOpen mode (#62)
* [fix] - Welsh translation for "Show more results"


1.0.0 - 2014-07-18
------------------

* First release of the UI components.
