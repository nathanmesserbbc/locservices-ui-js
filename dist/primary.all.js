!function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/api",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.API=t(),void 0)}(this,function(){function e(e,t){var o;for(o in e)e.hasOwnProperty(o)&&!t.hasOwnProperty(o)&&(t[o]=e[o]);return t}function t(t){var n,r="";this._defaultParams={},this._options=e({env:"live",protocol:"http"},t||{});var s=o(this._options);for(n in s)s.hasOwnProperty(n)&&"env"!==n&&"protocol"!==n&&(this._defaultParams[n]=s[n]);"live"!==this._options.env&&(r="."+this._options.env),this._baseUri=this._options.protocol+"://open."+this._options.env+".bbc.co.uk/locator",this._palBaseUri=this._options.protocol+"://www"+r+".bbc.co.uk"}function o(e){var t,o={};for(t in e)e.hasOwnProperty(t)&&((typeof e[t]).match(/string|number/)?o[t]=e[t]:"[object Array]"===Object.prototype.toString.call(e[t])&&(o[t]=e[t].join(",")));return o}t.prototype.getDefaultQueryParameters=function(){return this._defaultParams},t.prototype.getLocation=function(t,r){var s="",i="location";r.params=e(this._defaultParams,o(r||{})),r.detailTypes&&"[object Array]"===Object.prototype.toString.call(r.detailTypes)&&(i="details",s="/details/"+r.detailTypes.join(","),r.params.vv=2);var a=this._baseUri+"/locations/"+encodeURIComponent(t)+s;n(a,r,i)},t.prototype.search=function(t,r){function s(){var e=r.success,o=t,n=r.params.start;return function(t){t.metadata.search=o,n&&(t.metadata.start=n),e(t)}}r.params=e(this._defaultParams,o(r||{})),r.params.s=t,r.success=s(),n(this._baseUri+"/locations",r,"search")},t.prototype.autoComplete=function(t,r){r.params=e(this._defaultParams,o(r||{})),r.params.s=t,r.params.a="true",n(this._baseUri+"/locations",r,"autoComplete")},t.prototype.reverseGeocode=function(t,r,s){s.params=e(this._defaultParams,o(s||{})),s.params.lo=r,s.params.la=t,n(this._baseUri+"/locations",s,"reverseGeocode")},t.prototype.getCookie=function(e,t){t.params=t.params||{},t.params.id=e,n(this._palBaseUri+"/locator/default/shared/location.json",t,"cookie")};var n=function(e,t,o){var n,i;i="_locservices_core_api_cb_"+(new Date).getTime()+Math.round(1e5*Math.random()),t.params.format="jsonp",t.params.jsonp=i,window[i]=function(e){delete window[i],document.body.removeChild(n),t.success&&t.success(r(e,o))},n=document.createElement("script"),n.src=e+s(t.params),"function"==typeof t.error&&(n.onerror=t.error),document.body.appendChild(n)},r=function(e,t){var o={};switch(t){case"cookie":o=e;break;case"location":o.location=e.response;break;case"details":o.location=e.response.metadata.location,o.details=e.response.content.details.details;break;case"search":o.results=e.response.locations,o.metadata={totalResults:e.response.totalResults};break;case"autoComplete":o.results=e.response.results.results,o.metadata={totalResults:e.response.results.totalResults};break;case"reverseGeocode":o.results=e.response.results.results}return o},s=function(e){var t=[];for(var o in e)e.hasOwnProperty(o)&&t.push(o+"="+encodeURIComponent(e[o]));return"?"+t.join("&")};return t}),define("locservices/ui/component/component",["jquery"],function(e){function t(){}return t.prototype.setComponentOptions=function(e){if(e=e||{},void 0===e.translations)throw new Error("Component requires a translations parameter.");if(this.translations=e.translations,void 0===e.container)throw new Error("Component requires container parameter.");this.container=e.container,this.componentId=e.componentId||"component",this.eventNamespaceBase="locservices:ui",e.eventNamespace&&(this.eventNamespaceBase=e.eventNamespace),this.eventNamespace=this.eventNamespaceBase+":component:"+this.componentId},t.prototype.emit=function(t,o){o=o||[];var n=this.eventNamespace;"error"===t&&(n=this.eventNamespaceBase),e.emit(n+":"+t,o)},t.prototype.on=function(t,o){var n=this.eventNamespace;"error"===t&&(n=this.eventNamespaceBase),e.on(n+":"+t,o)},t}),define("locservices/ui/component/search",["jquery","locservices/ui/component/component"],function(e,t){function o(e){var t=this;if(e=e||{},e.componentId="search",void 0===e.api)throw new Error("Search requires api parameter");t.api=e.api,t.setComponentOptions(e),t.isSearching=!1,a(t.translations,t.container),t.input=t.container.find("input[type=text]"),t.form=t.container.find("form"),t.form.on("submit",function(e){e.preventDefault(),t.search(t.input.val())}),t.input.on("focus",function(){t.emit("focus")}),t.container.find("input[type=submit]").on("click",function(){t.form.trigger("submit"),t.emit("focus")})}var n=e("<div />").addClass("ls-ui-container"),r=function(){return e("<form />").attr("method","post").attr("action","#").addClass("ls-ui-form").addClass("ls-ui-comp-search")},s=function(t){return e("<input />").attr("type","text").attr("class","ls-ui-input").attr("placeholder",t.get("search.placeholder"))},i=function(t){return e("<input />").attr("type","submit").attr("class","ls-ui-submit").attr("value",t.get("search.submit")).attr("title",t.get("search.submit.title"))};o.prototype=new t,o.prototype.constructor=o,o.prototype.search=function(e){var t=this;e=(e||"").replace(/^\s+|\s+$/g,""),e&&!0!==t.isSearching&&(t.emit("start",[e]),t.isSearching=!0,t.api.search(e,{success:function(e){t.emit("end"),t.isSearching=!1,t.emit("results",[e.results,e.metadata])},error:function(){t.emit("end"),t.isSearching=!1,t.emit("error",[{code:"search.error.search",message:"There was an API error searching for "+e}])}}))};var a=function(e,t){var o=s(e),a=i(e);t.append(r().append(n.append(o)).append(a))};return o}),define("locservices/ui/component/message",["jquery","locservices/ui/component/component"],function(e,t){function o(t){var o=this;t=t||{},t.componentId="message",o.setComponentOptions(t),n(o.container),o.element=o.container.find("p"),o.on("error",function(e){return"object"==typeof e?void o.set(o.translations.get(e.code)):void o.set(e)}),e.on(o.eventNamespaceBase+":component:search:end",function(){o.clear()}),e.on(o.eventNamespaceBase+":component:search_results:location",function(){o.clear()}),e.on(o.eventNamespaceBase+":component:search_results:results",function(e){if(0===e.totalResults)return void o.set(o.translations.get("message.no_results")+'"'+e.searchTerm+'"');var t=e.offset+10;t=t>e.totalResults?e.totalResults:t,o.set(o.translations.get("message.showing")+t+o.translations.get("message.of")+e.totalResults)}),e.on(o.eventNamespaceBase+":component:geolocation:end",function(){o.clear()}),e.on(this.eventNamespaceBase+":component:auto_complete:render",function(){o.clear()})}o.prototype=new t,o.prototype.constructor=o,o.prototype.clear=function(){this.element.removeClass("ls-ui-active"),this.element.text("")},o.prototype.set=function(e){return"string"==typeof e?(this.element.addClass("ls-ui-active"),this.element.text(e),!0):!1};var n=function(t){var o=e("<div / >").addClass("ls-ui-comp-message");t.append(o.append(e("<p />")))};return o}),function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/geolocation",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.geolocation=t(),void 0)}(this,function(){function e(){return"geolocation"in navigator}function t(t,o,n){return n=n||{timeout:1e3,maximumAge:60,enableHighAccuracy:!0},e()?(navigator.geolocation.getCurrentPosition(t,o,n),!0):!1}return{isSupported:e(),getCurrentPosition:t}}),define("locservices/ui/component/geolocation",["jquery","locservices/ui/component/component","locservices/core/geolocation"],function(e,t,o){function n(e,t){return function(){return e.apply(t,arguments)}}function r(t){if(this.isSupported=o.isSupported,this.isSupported!==!1){if(t=t||{},t.componentId="geolocation","object"!=typeof t.api)throw new Error("Gelocation requires an API option.");this.api=t.api;var n=this;this.setComponentOptions(t),this.emit("available");var r=this.translations.get("geolocation.button.label");this.container.append(s.replace("{text}",r)),this._button=this.container.find("button"),this._button.on("click",function(t){t.preventDefault(),e(this).attr("disabled","disabled").addClass("disabled"),n.emit("click"),n.reverseGeocode()})}}var s='<button type="button" class="ls-ui-comp ls-ui-comp-geolocation">';return s+='<span class="ls-ui-comp-geolocation-label">{text}</span>',s+='<span class="ls-ui-comp-geolocation-icon"></span></button>',r.prototype=new t,r.prototype.constructor=r,r.prototype.reverseGeocode=function(){function e(e){var t=e.coords.longitude,o=e.coords.latitude;r.api.reverseGeocode(o,t,{success:function(e){var t=e.results[0];t.isWithinContext?(r._button.removeAttr("disabled").removeClass("disabled"),r.emit("location",[t])):r.emit("error",[{code:"geolocation.error.outsideContext",message:"Your location is not currently supported by this application"}])},error:function(){r.emit("error",[{code:"geolocation.error.http",message:"We were unable to make a location api request"}])}})}function t(e){var t="geolocation.error.browser",o="An error occurred obtaining the browsers position. Error code "+e.code;1===e.code&&(t+=".permission"),this.emit("error",[{code:t,message:o}])}var r=this;o.getCurrentPosition(n(e,this),n(t,this))},r}),define("locservices/ui/component/auto_complete",["jquery","locservices/ui/component/component"],function(e,t){function o(t){var o=this;if(t=t||{},t.componentId="auto_complete","object"!=typeof t.api)throw new Error("AutoComplete requires an api option");if(!t.element instanceof e)throw new Error("AutoComplete requires an element option");o._waitingForResults=!1,o._searchSubmitted=!1,o._timeoutId=void 0,o._highlightedSearchResultIndex=null,o._api=t.api,o.input=t.element.attr("autocomplete","off"),o.searchResultsData=null,o.currentSearchTerm="",o.setComponentOptions(t),o.searchResults=e("<ul />").addClass("ls-ui-comp-auto_complete"),o.container.append(o.searchResults),o.on("results",function(e){o.render(e)}),e.on(o.eventNamespaceBase+":component:search:start",function(){o.currentSearchTerm=o.prepareSearchTerm(o.input.val()),o._searchSubmitted=!0}),o.input.on("keyup",function(e){var t=e.keyCode;t!==n.escape&&t!==n.enter&&t!==n.upArrow&&t!==n.downArrow&&o.autoComplete()}),o.searchResults.on("mouseover","li",function(){o.highlightSearchResultByIndex(e(this).index(),!1)}),o.searchResults.on("mouseout","li",function(){e(this).removeClass("ls-ui-active")}),o.searchResults.on("mousedown","li",function(){var t=o.searchResultsData[e(this).index()];o.emit("location",[t,o.currentSearchTerm]),o.clear()}),e(document).on("keydown",function(e){switch(e.keyCode){case n.escape:o.escapeKeyHandler();break;case n.enter:o.enterKeyHandler(e);break;case n.upArrow:e.preventDefault(),o.highlightPrevSearchResult();break;case n.downArrow:o.highlightNextSearchResult()}})}var n={enter:13,escape:27,upArrow:38,downArrow:40},r=2,s=500;return o.prototype=new t,o.prototype.constructor=o,o.prototype.autoComplete=function(){var e=this.prepareSearchTerm(this.input.val()),t=this;this._waitingForResults||!this.isValidSearchTerm(e)||e.length<r||(clearTimeout(this._timeoutId),this._timeoutId=setTimeout(function(){!0!==t._searchSubmitted&&e!==t.currentSearchTerm&&(t._waitingForResults=!0,t.currentSearchTerm=e,t._api.autoComplete(e,{success:function(e){t._waitingForResults=!1,!0!==t._searchSubmitted&&t.emit("results",[e.results,e.metadata])},error:function(){!0!==t._searchSubmitted&&t.emit("error",[{code:"auto_complete.error.search",message:"There was a problem searching for the search term"}])}}))},s),this._searchSubmitted=!1)},o.prototype.clear=function(){this.searchResultsData=null,this._highlightedSearchResultIndex=null,this.searchResults.empty(),this.emit("clear")},o.prototype.render=function(e){if(0===e.length)return void this.clear();var t,o,n="",r="",s={};for(t=this,t.searchResultsData=e,t.emit("render"),o=0;o<e.length;o++)s=e[o],r=s.name,s.container&&(r+=", "+s.container),r=t.highlightTerm(r,this.currentSearchTerm),n+='<li><a href="#" data-index="'+o+'">'+r+"</a></li>";this.searchResults.empty(),this.searchResults.append(n),this.searchResults.find("li a").on("click",function(e){e.preventDefault(),e.stopPropagation()})},o.prototype.escapeKeyHandler=function(){null!==this._highlightedSearchResultIndex&&this.input.val(this.currentSearchTerm),this.clear()},o.prototype.enterKeyHandler=function(e){if(null!==this._highlightedSearchResultIndex){e.preventDefault();var t=this.searchResultsData[this._highlightedSearchResultIndex];this.emit("location",[t])}this.clear()},o.prototype.prepareSearchTerm=function(e){return String(e).replace(/^\s\s*/,"").replace(/\s\s*$/,"")},o.prototype.isValidSearchTerm=function(e){var t,o;return"string"!=typeof e?!1:(t=this.prepareSearchTerm(e),o=t.length>=r)},o.prototype.highlightTerm=function(e,t){var o=new RegExp(t,"i"),n=e.search(o);return n>=0?e.substr(0,n)+"<strong>"+e.substr(n,n+t.length)+"</strong>"+e.substr(n+t.length):e},o.prototype.highlightNextSearchResult=function(){var e=this._highlightedSearchResultIndex;if(null===e)e=0;else if(e++,this.searchResultsData.length<=e)return void this.removeSearchResultHighlight(!0);this.highlightSearchResultByIndex(e,!0)},o.prototype.highlightPrevSearchResult=function(){var e=this._highlightedSearchResultIndex;if(null===e)e=this.searchResultsData.length-1;else if(e--,0>e)return void this.removeSearchResultHighlight(!0);this.highlightSearchResultByIndex(e,!0)},o.prototype.highlightSearchResultByIndex=function(t,o){var n=this.searchResultsData[t],r=n.name;n.container&&(r+=", "+n.container),this.removeSearchResultHighlight(),this._highlightedSearchResultIndex=t,e(this.searchResults.find("li")[t]).addClass("ls-ui-active"),o&&this.input.val(r)},o.prototype.removeSearchResultHighlight=function(e){this._highlightedSearchResultIndex=null,this.searchResults.find("li.ls-ui-active").removeClass("ls-ui-active"),e&&this.input.val(this.currentSearchTerm)},o}),define("locservices/ui/component/search_results",["jquery","locservices/ui/component/component"],function(e,t){function o(t){var o=this;if(t=t||{},t.componentId="search_results",void 0===t.api)throw new Error("SearchResults requires api parameter");o.api=t.api,o.setComponentOptions(t),e.on(this.eventNamespaceBase+":component:search:results",function(e,t){if(1===t.totalResults){var n=e[0];return void o.emit("location",[n])}o.render(e,t)}),e.on(this.eventNamespaceBase+":component:auto_complete:render",function(){o.clear()}),o._data={},o.setup()}return o.prototype=new t,o.prototype.constructor=o,o.prototype.setup=function(){var t=e("<div />").addClass("li-ui-comp-search_results");this.list=e("<ul />"),this.moreResults=e("<a />").attr("href","").addClass("ls-ui-comp-search_results-more").text("Show more results"),t.append(this.list).append(this.moreResults),this.container.append(t);var o=this;this.list.on("click",function(t){var n,r;return t.preventDefault(),n=e(t.target).data("id"),r=e(t.target).data("offset"),o.emit("location",[o._data[n],r]),o.clear(),!1}),this.moreResults.on("click",function(e){return e.preventDefault(),o.api.search(o.searchTerm,{start:o.offset+10,success:function(e){o.render(e.results,e.metadata)}}),!1})},o.prototype.render=function(e,t){var o,n,r,s="";for(this.offset=t.start||0,this.searchTerm=t.search,o=0;o<e.length;o++)n=e[o],this._data[n.id]=n,r=n.name,n.container&&(r+=", "+n.container),s+='<li><a href="" data-id="'+n.id+'" data-offset="'+this.offset+'">'+r+"</a></li>";0===this.offset?this.list.html(s):this.list.append(s),t.totalResults>10&&this.offset+10<t.totalResults?this.moreResults.addClass("ls-ui-comp-search_results-active"):this.moreResults.removeClass("ls-ui-comp-search_results-active"),this.emit("results",{searchTerm:this.searchTerm,offset:this.offset,totalResults:t.totalResults})},o.prototype.clear=function(){this.moreResults.removeClass("ls-ui-comp-search_results-active"),this.list.empty(),this._data={}},o}),function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/bbc_cookies",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.BBCCookies=t(),void 0)}(this,function(){function e(){this._isSupported="object"==typeof window.bbccookies,this._isSupported&&(this._policy=window.bbccookies.readPolicy())}return e.prototype.isSupported=function(){return this._isSupported},e.prototype.readPolicy=function(){return this._isSupported?this._policy:!1},e.prototype.isPersonalisationDisabled=function(){return this._isSupported?!1===this._policy.personalisation:!1},e}),function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/recent_locations",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.RecentLocations=t(),void 0)}(this,function(){function e(e){return e=e||{},e.hasOwnProperty("placeType")&&("postcode"===e.placeType||"district"===e.placeType||e.hasOwnProperty("container"))?e.id&&"string"==typeof e.id&&e.name:!1}function t(){this._prefix="locservices-recent-locations"}function o(){this.isSupported()&&(this._storageAdapter=new t)}var n="object"==typeof window.JSON&&"object"==typeof window.localStorage;return t.prototype.get=function(){var e=[],t=localStorage[this._prefix];if(!t)return e;try{e=JSON.parse(localStorage[this._prefix])}catch(o){}return e},t.prototype.set=function(e){return"[object Array]"!==Object.prototype.toString.call(e)?!1:void(localStorage[this._prefix]=JSON.stringify(e))},o.prototype.isSupported=function(){return n},o.prototype.all=function(){return this._storageAdapter.get()},o.prototype.add=function(t){if(!e(t))return!1;if(this.contains(t.id))return this.remove(t.id),this.add(t),!0;var o=this._storageAdapter.get();return o.unshift(t),4<o.length&&(o=o.slice(0,4)),this._storageAdapter.set(o),!0},o.prototype.remove=function(e){var t,o=[],n=this._storageAdapter.get();for(t in n)n.hasOwnProperty(t)&&n[t].id.toString()!==e.toString()&&o.push(n[t]);this._storageAdapter.set(o)},o.prototype.clear=function(){this._storageAdapter.set([])},o.prototype.contains=function(e){var t,o=!1,n=this._storageAdapter.get();for(t in n)n.hasOwnProperty(t)&&n[t].id===e&&(o=!0);return o},o}),function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/preferred_location",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.PreferredLocation=t(),void 0)}(this,function(){function e(e){this.api=e}var t="locserv",o="/";e.prototype.isValidLocation=function(e){var t,o;return"object"!=typeof e?!1:(t=e.placeType,o=e.country,"settlement"!==t&&"airport"!==t&&"district"!==t?!1:"GB"!==o&&"GG"!==o&&"IM"!==o&&"JE"!==o?!1:!0)},e.prototype.isSet=function(){return null!==this.getLocServCookie()},e.prototype.unset=function(){var e=this.getCookieDomain();return!1===e?!1:(this.setDocumentCookie(t+"=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/; domain="+e+";"),!0)},e.prototype.getHostname=function(){return window.location.hostname},e.prototype.getDocumentCookie=function(){return window.document.cookie},e.prototype.setDocumentCookie=function(e){window.document.cookie=e},e.prototype.getCookieDomain=function(){var e,t;return this.cookieDomain?this.cookieDomain:(t=this.getHostname(),"string"!=typeof t?!1:(e=t.match(/bbc\.co(\.uk|m)$/),this.cookieDomain=e&&2===e.length?"."+e[0]:!1,this.cookieDomain))},e.prototype.getLocServCookie=function(){var e,o;return e=this.getDocumentCookie(),o=e.match(new RegExp(t+"=(.*?)(;|$)")),!o||o.length<2?null:o[1]},e.prototype.get=function(){var e,t,o,a,c,l;if(c=function(e){var t,o,n,r,s={};for(o=e.substr(0,1),e=e.substr(3),n=e.split(":"),t=0;t<n.length;t++)r=n[t].split("="),r[1]=r[1].replace(/\+/g,"%20"),s[r[0]]=decodeURIComponent(r[1]);return{name:o,data:s}},t=this.getLocServCookie(),!t)return null;for(e={id:null,name:null,nation:null,news:null,weather:null},o=t.substr(2).split("@"),l=0;l<o.length;l++)a=c(o[l]),"l"===a.name?(e.id=a.data.i,e.name=a.data.n,a.data.c&&(e.container=a.data.c),a.data.y&&(e.country=a.data.y),a.data.p&&(e.placeType=a.data.p),a.data.h&&(e.nation=i[a.data.h])):"w"===a.name?e.weather={id:a.data.i,name:a.data.p}:"n"===a.name&&(e.news={id:a.data.r,path:n[a.data.r],tld:s[a.data.r],name:r[a.data.r]});return e},e.prototype.set=function(e,n){var r,s=this;return n=n||{},void 0===this.api||"string"!=typeof e||""===e.replace(/^\s+|\s+$/g,"")?void("function"==typeof n.error&&n.error()):(this.cookieLocation=void 0,r=s.getCookieDomain(),!1===r&&"function"==typeof n.error&&n.error(),void this.api.getCookie(e,{success:function(e){var i,a;a=new Date(1e3*e.expires).toUTCString(),i=t+"="+e.cookie+"; ",i+="expires="+a+"; ",i+="domain="+r+"; ",i+="path="+o+";",s.setDocumentCookie(i),"function"==typeof n.success&&n.success(s.get())},error:function(e){"function"==typeof n.error&&n.error(e)}}))};var n={3:"england/berkshire",4:"england/birmingham_and_black_country",7:"england/bristol",8:"england/cambridgeshire",11:"england/cornwall",12:"england/coventry_and_warwickshire",13:"england/cumbria",16:"england/derbyshire",17:"england/devon",18:"england/dorset",19:"scotland/edinburgh_east_and_fife",20:"england/essex",22:"scotland/glasgow_and_west",23:"england/gloucestershire",26:"world/europe/guernsey",27:"england/hampshire",28:"england/hereford_and_worcester",30:"scotland/highlands_and_islands",31:"england/humberside",32:"world/europe/isle_of_man",33:"world/europe/jersey",34:"england/kent",35:"england/lancashire",36:"england/leeds_and_west_yorkshire",37:"england/leicester",38:"england/lincolnshire",39:"england/merseyside",40:"england/london",41:"england/manchester",42:"wales/mid_wales",43:"england/norfolk",44:"england/northamptonshire",45:"scotland/north_east_orkney_and_shetland",46:"wales/north_east_wales",21:"northern_ireland",47:"wales/north_west_wales",49:"england/nottingham",50:"england/oxford",57:"england/south_yorkshire",51:"england/shropshire",52:"england/somerset",53:"wales/south_east_wales",55:"scotland/south_scotland",56:"wales/south_west_wales",58:"england/stoke_and_staffordshire",59:"england/suffolk",66:"england/surrey",60:"england/sussex",61:"scotland/tayside_and_central",62:"england/tees",1:"england/beds_bucks_and_herts",63:"england/tyne_and_wear",65:"england/wiltshire",48:"england/york_and_north_yorkshire"},r={56:"South West Wales",28:"Hereford &amp; Worcester",36:"Leeds and Bradford",60:"Sussex",61:"Tayside &amp; Central Scotland",62:"Tees",63:"Tyne and Wear",35:"Lancashire",66:"Surrey",34:"Kent",26:"Guernsey",27:"Hampshire",20:"Essex",21:"Northern Ireland",48:"York &amp; North Yorkshire",49:"Nottinghamshire",46:"North East Wales",47:"North West Wales",44:"Northampton",45:"North East Scotland Orkney &amp; Shetland",42:"Mid Wales",43:"Norfolk",40:"London",41:"Manchester",1:"Beds Herts &amp; Bucks",3:"Berkshire",4:"Birmingham and Black Country",7:"Bristol",8:"Cambridgeshire",13:"Cumbria",12:"Coventry &amp; Warwickshire",30:"Highlands &amp; Islands",58:"Stoke &amp; Staffordshire",11:"Cornwall",39:"Liverpool",38:"Lincolnshire",59:"Suffolk",22:"Glasgow &amp; West of Scotland",17:"Devon",16:"Derby",19:"Edinburgh Fife &amp; East of Scotland",18:"Dorset",31:"Humberside",23:"Gloucestershire",51:"Shropshire",50:"Oxford",53:"South East Wales",52:"Somerset",33:"Jersey",55:"South Scotland",37:"Leicestershire",32:"Isle of Man",57:"Sheffield &amp; South Yorkshire",65:"Wiltshire"},s={56:"southwestwales",42:"midwales",50:"oxford",60:"sussex",61:"taysideandcentralscotland",62:"tees",63:"tyne",49:"nottingham",66:"surrey",52:"somerset",53:"southeastwales",26:"guernsey",27:"hampshire",20:"essex",21:"northernireland",22:"glasgowandwestscotland",23:"gloucestershire",46:"northeastwales",47:"northwestwales",44:"northampton",45:"northeastscotlandnorthernisles",28:"herefordandworcester",43:"norfolk",40:"london",41:"manchester",1:"threecounties",3:"berkshire",4:"birmingham",7:"bristol",8:"cambridgeshire",39:"liverpool",38:"lincolnshire",58:"stoke",11:"cornwall",51:"shropshire",13:"cumbria",12:"coventry",59:"suffolk",48:"york",17:"devon",16:"derby",19:"edinburghandeastscotland",18:"dorset",31:"humberside",30:"highlandsandislands",37:"leicester",36:"leeds",35:"lancashire",34:"kent",33:"jersey",55:"southscotland",32:"isleofman",57:"sheffield",65:"wiltshire"},i={e:"england",n:"northernireland",s:"scotland",w:"wales"};return e}),function(e,t){return"function"==typeof define&&define.amd?define("locservices/core/filter",t):("undefined"==typeof e.locservices&&(e.locservices={}),"undefined"==typeof e.locservices.core&&(e.locservices.core={}),e.locservices.core.filter=t(),void 0)}(this,function(){var e={placeType:"settlement, airport",country:"GB, GG, IM, JE"},t={placeType:"settlement, airport, country"},o=function(e,t){return"undefined"==typeof t||"undefined"==typeof e?e:"string"==typeof t.filter?n(e,t):(e=r(e,"placeType",t.placeType),r(e,"country",t.country))},n=function(n,r){if("domestic"!==r.filter&&"international"!==r.filter)return r.filter=void 0,o(n,r);var s="domestic"===r.filter?e:t;return"undefined"!=typeof r.placeType&&(s.placeType=r.placeType),"undefined"!=typeof r.country&&(s.country=r.country),o(n,s)},r=function(e,t,o){var n=(o||"").replace(/^\s+|\s+$/g,"");if(""===n)return e;for(var r=[],s=e.length,i=0;s>i;i++){var a=e[i];a.hasOwnProperty(t)&&-1!==n.indexOf(a[t])&&r.push(a)}return r};return o}),define("locservices/ui/component/user_locations",["jquery","locservices/ui/component/component","locservices/core/bbc_cookies","locservices/core/recent_locations","locservices/core/preferred_location","locservices/core/filter"],function(e,t,o,n,r,s){function i(t){var s,i,c,l=this;if(t=t||{},t.componentId="user_locations",void 0===t.api)throw new Error("User locations requires api parameter");if(s=t.api,this.setComponentOptions(t),i=new o,!i.isPersonalisationDisabled()){this._locations=[],c=s.getDefaultQueryParameters(),this._filter={filter:c.filter,country:c.countries,placeType:c["place-types"]},this.preferredLocation=new r(s),this.recentLocations=new n,this.element=a.element(),this.container.append(this.element),this.render(),this.element.on("click",function(t){var o,n,r,s;t.preventDefault(),t.stopPropagation(),o=e(t.target),n=String(o.data("id")),s=l._locations[n],s&&(r=o.data("action"),"location"===r?l.selectLocationById(n):"prefer"===r?l.displayDialog(o.parent("li"),l.translations.get("user_locations.dialog.prefer"),function(){l.setPreferredLocationById(n)}):"remove"===r&&(s.isPreferred?l.displayDialog(o.parent("li"),l.translations.get("user_locations.dialog.remove_preferred"),function(){l.removeLocationById(n)}):l.removeLocationById(n)))});var p=function(e){l.recentLocations.add(e)&&(l.emit("location_add",[e]),l.render())};e.on(this.eventNamespaceBase+":component:search_results:location",function(e){p(e)}),e.on(this.eventNamespaceBase+":component:geolocation:location",function(e){p(e)}),e.on(this.eventNamespaceBase+":component:auto_complete:location",function(e){p(e)})}}var a={element:function(){return e("<div />").addClass("ls-ui-comp-user_locations")},preferredLocationList:e("<ul/>").addClass("ls-ui-comp-user_locations-preferred"),preferredLocationHeading:function(t){return e("<p />").addClass("ls-ui-comp-user_locations-heading").text(t.get("user_locations.heading.preferred"))},recentLocationsList:e("<ul/>").addClass("ls-ui-comp-user_locations-recent"),recentLocationsHeading:function(t,o){return e("<p />").addClass("ls-ui-comp-user_locations-heading").addClass("ls-ui-comp-user_locations-recent-heading").text(t.get("user_locations.heading.recent")+" ("+o+")")},location:function(t,o){var n=o.id,r=e("<a/>").addClass("ls-ui-comp-user_locations-name").attr("href","#"+n).attr("data-id",n).attr("data-action","location").html(e("<strong/>").text(o.name));o.container&&r.append(", "+o.container);var s=e("<a/>").addClass("ls-ui-comp-user_locations-action").attr("href","#"+n).attr("data-id",n).attr("data-action",o.isPreferred?"none":"prefer").text(t.get("user_locations.action.recent")),i=e("<a/>").addClass("ls-ui-comp-user_locations-remove").attr("href","#"+n).attr("data-id",n).attr("data-action","remove").text(t.get("user_locations.action.remove")),a=e("<li />");return a.addClass("ls-ui-comp-user_locations-location"),o.isPreferred&&a.addClass("ls-ui-comp-user_locations-location-preferred"),o.isPreferable&&(a.addClass("ls-ui-comp-user_locations-location-preferable"),a.append(s)),a.append(r).append(i),a},message:function(t,o){var n=t.get("user_locations.message.preferred");return o&&(n+=" "+t.get("user_locations.message.change_preferred")),e("<p/>").addClass("ls-ui-comp-user_locations-message").text(n)},dialog:function(t,o){var n=e("<div/>").addClass("ls-ui-comp-user_locations-dialog"),r=e("<p/>").text(o),s=e("<div/>").addClass("ls-ui-comp-user_locations-dialog-buttons"),i=e("<span/>").append(e("<button/>"));i.addClass("ls-ui-comp-user_locations-dialog-confirm").find("button").text(t.get("user_locations.dialog.confirm"));var a=e("<span/>").append(e("<button/>"));return a.addClass("ls-ui-comp-user_locations-dialog-cancel").find("button").text(t.get("user_locations.dialog.cancel")),s.append(i).append(a),n.append(r).append(s),n}};return i.prototype=new t,i.prototype.constructor=i,i.prototype.displayDialog=function(e,t,o){var n=function(){e.find(".ls-ui-comp-user_locations-dialog").remove(),e.removeClass("ls-ui-comp-user_locations-location-with-dialog")};e.addClass("ls-ui-comp-user_locations-location-with-dialog"),e.append(a.dialog(this.translations,t)),e.find(".ls-ui-comp-user_locations-dialog-confirm button").on("click",function(){n(),"function"==typeof o&&o()}),e.find(".ls-ui-comp-user_locations-dialog-cancel button").on("click",function(){n()})},i.prototype.selectLocationById=function(e){var t;t=this._locations[e],t&&this.emit("location",[t])},i.prototype.setPreferredLocationById=function(e){var t,o,n;t=this,o=this._locations[e],o&&this.preferredLocation.isValidLocation(o)&&(this.recentLocations.remove(e),this.element.find(".ls-ui-comp-user_locations-location-preferred").removeClass("ls-ui-comp-user_locations-location-preferred"),this.element.find('a[data-id="'+e+'"]').parent().addClass("ls-ui-comp-user_locations-location-preferred"),this.preferredLocation.isSet()&&(n=this.preferredLocation.get(),this.recentLocations.add(n)),this.preferredLocation.set(o.id,{success:function(){t.render(),t.emit("make_main",[e])},error:function(){t.emit("error",[{code:"user_locations.error.preferred_location",message:"There was an error setting preferred location to "+o.id}])}}))},i.prototype.removeLocationById=function(e){var t;t=this._locations[e],t&&(t.isPreferred?this.preferredLocation.unset():this.recentLocations.remove(e),this.render(),this.emit("location_remove",[e]))},i.prototype.render=function(){var e,t,o,n,r,s,i,c;if(o=this.preferredLocation.isSet(),n=this.getRecentLocations(),i=n.length,s=i>0,e=o||s,this._locations={},this.element.empty(),a.preferredLocationList.empty(),a.recentLocationsList.empty(),e&&this.element.append(a.preferredLocationHeading(this.translations)),o?(t=this.preferredLocation.get(),this._locations[t.id]=t,t.isPreferred=!0,t.isPreferable=!0,a.preferredLocationList.append(a.location(this.translations,t))):a.preferredLocationList.addClass("ls-ui-comp-user_locations-preferred-no-location"),e&&this.element.append(a.preferredLocationList),s){for(this.element.append(a.recentLocationsHeading(this.translations,i)),c=0;i>c;c++)r=n[c],this._locations[r.id]=r,a.recentLocationsList.append(a.location(this.translations,r));this.element.append(a.recentLocationsList)}e&&this.element.append(a.message(this.translations,s))},i.prototype.getRecentLocations=function(){var e,t,o,n,r,i=[];if(this.preferredLocation.isSet()&&(e=this.preferredLocation.get()),this.recentLocations.isSupported()&&(t=s(this.recentLocations.all(),{filter:this._filter.filter,placeType:this._filter.placeType,country:this._filter.country}),o=t.length,o>0))for(o>4&&(t=t.slice(0,4),o=4),r=0;o>r;r++)n=t[r],e&&e.id===n.id||(n.isPreferable=this.preferredLocation.isValidLocation(n),i.push(n));return i
},i}),define("locservices/ui/component/close_button",["jquery","locservices/ui/component/component"],function(e,t){function o(e){var t=this;e=e||{},e.componentId="close_button",t.setComponentOptions(e),t.button=n(t.translations),t.container.append(t.button),t.button.on("click",function(e){e.preventDefault(),t.emit("clicked")})}var n=function(t){return e("<button />").addClass("ls-ui-comp-close_button").text(t.get("close_button.label"))};return o.prototype=new t,o.prototype.constructor=o,o}),define("js/controller/primary",["jquery","locservices/core/api","locservices/ui/component/search","locservices/ui/component/message","locservices/ui/component/geolocation","locservices/ui/component/auto_complete","locservices/ui/component/search_results","locservices/ui/component/user_locations","locservices/ui/component/close_button"],function(e,t,o,n,r,s,i,a,c){function l(l){d(l);var h=this,m=l.alwaysOpen||!1,f={onLocation:function(t){e.emit(h.namespace+":controller:location",[t])},onActive:function(){e.emit(h.namespace+":controller:active"),h.container.addClass("ls-ui-ctrl-active")},onGeolocation:function(){h.container.addClass("li-ui-ctrl-geolocation")},onSearchResults:function(){h.container.find(".ls-ui-comp-user_locations").addClass("ls-ui-hidden")},onClose:function(){h.message.clear(),h.results.clear(),h.autoComplete.clear(),e.emit(h.namespace+":controller:inactive"),h.container.removeClass("ls-ui-ctrl-active"),h.container.find(".ls-ui-comp-user_locations").removeClass("ls-ui-hidden")}};h.api=new t(l.api),h.container=l.container,h.container.addClass("ls-ui-ctrl-primary").append(p.append(u)),h.namespace=l.namespace||"locservices:ui",e.on(h.namespace+":error",f.onActive),e.on(h.namespace+":component:search:focus",f.onActive),e.on(h.namespace+":component:auto_complete:render",f.onSearchResults),e.on(h.namespace+":component:search:results",f.onSearchResults),e.on(h.namespace+":component:geolocation:location",f.onLocation),e.on(h.namespace+":component:auto_complete:location",f.onLocation),e.on(h.namespace+":component:user_locations:location",f.onLocation),e.on(h.namespace+":component:search_results:location",f.onLocation),e.on(h.namespace+":component:geolocation:available",f.onGeolocation),e.on(h.namespace+":component:close_button:clicked",f.onClose),h.search=new o({api:this.api,translations:l.translations,eventNamespace:h.namespace,container:u}),h.autoComplete=new s({api:this.api,translations:l.translations,eventNamespace:h.namespace,element:h.search.input,container:p}),h.message=new n({translations:l.translations,eventNamespace:h.namespace,container:p}),h.results=new i({api:this.api,translations:l.translations,eventNamespace:h.namespace,container:p}),h.geolocation=new r({api:this.api,translations:l.translations,eventNamespace:h.namespace,container:p}),h.userLocations=new a({api:this.api,translations:l.translations,eventNamespace:h.namespace,container:p}),m||(h.closeButton=new c({translations:l.translations,eventNamespace:h.namespace,container:p})),m&&(h.container.addClass("ls-ui-ctrl-open"),e.emit(h.namespace+":component:search:focus"))}var p=e("<div />").addClass("ls-ui-o"),u=e("<div />").addClass("ls-ui-ctrl-primary-search"),d=function(e){for(var t=["api","translations","container"],o=t.length,n=0;o>n;n++){var r=t[n];if(!e[r])throw new Error("Primary Controller requires an "+r+" option.")}};return l});