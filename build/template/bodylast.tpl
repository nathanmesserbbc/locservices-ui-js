     </div> <div id='orb-footer'  class='orb-footer orb-footer-grey' > <aside role='complementary'> <div id='orb-aside' class='orb-nav-sec b-r b-g-p'> <div class='orb-footer-inner' role='navigation'> <h2 class='orb-footer-lead'>Explore the BBC</h2>  <div id='orb-footer-promo' class='orb-d'></div>  <div class='orb-footer-primary-links'> <ul>    <li  class='orb-nav-news orb-d'  > <a href='/news/'>News</a> </li>    <li  class='orb-nav-newsdotcom orb-w'  > <a href='http://www.bbc.com/news/'>News</a> </li>    <li  class='orb-nav-sport'  > <a href='/sport/'>Sport</a> </li>    <li  class='orb-nav-weather'  > <a href='/weather/'>Weather</a> </li>    <li  class='orb-nav-shop orb-w'  > <a href='http://shop.bbc.com/'>Shop</a> </li>    <li  class='orb-nav-iplayer orb-d'  > <a href='/iplayer/'>iPlayer</a> </li>    <li  class='orb-nav-capital orb-w'  > <a href='http://www.bbc.com/capital/'>Capital</a> </li>    <li  class='orb-nav-future orb-w'  > <a href='http://www.bbc.com/future/'>Future</a> </li>    <li  class='orb-nav-tv'  > <a href='/tv/'>TV</a> </li>    <li  class='orb-nav-radio'  > <a href='/radio/'>Radio</a> </li>    <li  class='orb-nav-cbbc'  > <a href='/cbbc/'>CBBC</a> </li>    <li  class='orb-nav-cbeebies'  > <a href='/cbeebies/'>CBeebies</a> </li>    <li  > <a href='/ww1/'>WW1</a> </li>    <li  class='orb-nav-food'  > <a href='/food/'>Food</a> </li>    <li  class='orb-nav-history'  > <a href='/history/'>History</a> </li>    <li  class='orb-nav-learning'  > <a href='/learning/'>Learning</a> </li>    <li  class='orb-nav-music'  > <a href='/music/'>Music</a> </li>    <li  class='orb-nav-science'  > <a href='/science/'>Science</a> </li>    <li  class='orb-nav-nature'  > <a href='/nature/'>Nature</a> </li>    <li  class='orb-nav-local'  > <a href='/local/'>Local</a> </li>    <li  class='orb-nav-travelnews'  > <a href='/travelnews/'>Travel News</a> </li>    <li  class='orb-nav-fullaz'  > <a href='/a-z/'>Full A-Z</a> </li>    </ul> </div> </div> </div> </aside> <footer role='contentinfo'> <div id='orb-contentinfo' class='orb-nav-sec b-r b-g-p'> <div class='orb-footer-inner'> <ul>        <li  > <a href='/terms/'>Terms of Use</a> </li>    <li  > <a href='/aboutthebbc/'>About the BBC</a> </li>    <li  > <a href='/privacy/'>Privacy Policy</a> </li>    <li  > <a href='/privacy/bbc-cookies-policy.shtml'>Cookies</a> </li>    <li  > <a href='/accessibility/'>Accessibility Help</a> </li>    <li  > <a href='/guidance/'>Parental Guidance</a> </li>    <li  > <a href='/contact/'>Contact the BBC</a> </li>        </ul> <small> <span class='orb-hilight'>BBC &copy; 2014</span> The BBC is not responsible for the content of external sites. <a href='/help/web/links/' class='orb-hilight'>Read about our approach to external linking.</a> </small> </div> </div> </footer> </div> <div class='bbccom_display_none'>
    <script type='text/javascript'>/*<![CDATA[*/
        /* New dynamic siteCatalyst request setup */
        if (window.bbcdotcom && bbcdotcom.data && bbcdotcom.data.stats && bbcdotcom.data.stats === 1) {
            scw.setSections(window.location.href);
            if (/[?|&]analytics-debug/.test(window.location.href)) {
                document.write('<script type='text/javascript' src='http://static.bbci.co.uk/bbcdotcom/0.3.250/script/vendor/omniture/siteCatalyst.js'>\x3C/script>');
                document.write('<script type='text/javascript' src='http://static.bbci.co.uk/bbcdotcom/0.3.250/script/vendor/omniture/VisitorAPI.js'>\x3C/script>');
                document.write('<script type='text/javascript' src='http://static.bbci.co.uk/bbcdotcom/0.3.250/script/vendor/omniture/AppMeasurement.js'>\x3C/script>');
            }
        }
    /*]]>*/</script>
    <script type='text/javascript'>
        /*<![CDATA[*/
        if (/[?|&]analytics-debug/.test(window.location.href) && window.scw) {
            scw.track({ events: 'event2' }, 'bbcresponsivedev');
            var s_code=s.t();
            if(s_code) {
                document.write(s_code);
            }
        }
        if (window.bbcdotcom && bbcdotcom.currencyProviders) {
            bbcdotcom.currencyProviders.write();
        }
        /* TODO - To be removed once we move to the dynamic siteCatalyst request */
        if (window.bbcdotcom && bbcdotcom.data && bbcdotcom.data.stats && bbcdotcom.data.stats === 1 && window.scw) {
            /* SiteCatalyst code */
            scw.renderImageTag('');
        }
        /*]]>*/
    </script>
    <script type='text/javascript'>
        /*<![CDATA[*/
        if (window.bbcdotcom && bbcdotcom.currencyProviders) {
            bbcdotcom.currencyProviders.postWrite();
        }
        /*]]>*/
    </script>
</div>
<!-- BBCDOTCOM Body Last -->
 <script type='text/javascript'> document.write('<' + 'script id='orb-js-script' data-assetpath='http://static.bbci.co.uk/frameworks/barlesque/2.63.2/orb/4/' src='http://static.bbci.co.uk/frameworks/barlesque/2.63.2/orb/4/script' + (( document.cookie.indexOf('ckns_debugorbjs') > -1 )? '-debug' : '') + '/orb.js'><' + '/script>'); </script>  <script type='text/javascript'> (function() {
    'use strict';

    var promoManager = {
        url: '',
        segments: ['a', 'b'],
        promoLoaded: false,
                makeUrl: function (variant, theme, win) {
            var loc = win? win.location : window.location,
                proto = loc.protocol,
                host = loc.host,
                url = proto + '//' + ((proto.match(/s:/i) && !host.match(/^www\.(int|test)\./i))? 'ssl.' : 'www.'),
                themes = ['light', 'dark'];

            if ( host.match(/^(?:www|ssl)\.(int|test|stage|live)\.bbc\./i) ) {
                url += RegExp.$1 + '.';
            }
            else if ( host.match(/^pal\.sandbox\./i) ) {
                url += 'test.';
            }
 
                        theme = themes[ +(theme === themes[0]) ];
           
           return url + 'bbc.co.uk/navpromo/' + variant + '/' + theme;
        },
                validSegment: function (segment) {
            var validSegments = this.segments;
            
            for (var i = 0, len = validSegments.length; i < len; i++) {
                if (validSegments[i] === segment) {
                    return segment;
                }
            }
            
            return validSegments[0];
        },
                init: function(node) {
            var disabledByCookie = (document.cookie.indexOf('ckns_orb_nopromo=1') > -1),
                orbFullWidth     = (document.getElementById('orb-aside').offsetWidth >= 1008),
                that = this;
            
            if (window.promomanagerOverride) {
                for (var p in promomanagerOverride) {
                    that[p] = promomanagerOverride[p];
                }
            }
                
            if ( window.orb.fig('uk') && orbFullWidth && !disabledByCookie ) {
                require(['orb/async/_footerpromo', 'istats-1'], function(promo, istats) {
                                        var mandolinEndDate = new Date().getTime() + (7 * 60 * 60 * 24) * 1000,
                        mandolin = new bbc.Mandolin('footer-promo', that.segments, {rate: 0.2, end: mandolinEndDate}),
                        segmentToRequest = that.validSegment(mandolin.getSegment());

                    that.url = (window.promomanagerOverride || that).makeUrl(segmentToRequest, 'light');

                    if (that.url) { 
                        promo.load(that.url, node, {
                                                          onSuccess: function(e) {
                                istats.addLabels({ 'campaignID': e.campaignID });
                                if (segmentToRequest === mandolin.getSegment()) {
                                    istats.addLabels({ 'promo_id_segment': e.campaignID + ':' + mandolin.getSegment() });
                                }
                                istats.track('internal', {region: node, linkLocation : 'orb-footer-promo'});

                                istats.log('display', 'orb-footer-promo-displayed', {campaignID : e.campaignID, testVariant: segmentToRequest});
                                node.className = node.className + ' orb-footer-promo-loaded';
                                promoManager.promoLoaded = true;
                                promoManager.event('promo-loaded').fire(e);
                             },
                             onError: function() {
                                istats.log('error', 'orb-footer-promo-failed');
                                document.cookie = 'ckns_orb_nopromo=1; expires=' + new Date(new Date().getTime() + 1000 * 60 * 10).toGMTString() + ';';
                             }
                        });   
                    }
                });
            }
        }
    };
    
        
    define('orb/promomanager', ['orb/lib/_event'], function (event) {
        event.mixin(promoManager);
        return promoManager;
    });
    
    require(['orb/promomanager'], function (promoManager) {
        promoManager.init(document.getElementById('orb-footer-promo'));
    })
})();
 </script>   <script type='text/javascript'> if (typeof require !== 'undefined') { require(['istats-1'], function(istats){ istats.track('external', { region: document.getElementsByTagName('body')[0] }); istats.track('download', { region: document.getElementsByTagName('body')[0] }); }); } </script>            