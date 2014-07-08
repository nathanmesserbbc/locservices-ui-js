       <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <script type="text/javascript" src="http://static.bbci.co.uk/frameworks/requirejs/0.13.1/sharedmodules/require.js"></script> <script type="text/javascript">  bbcRequireMap = {"jquery-1":"http://static.bbci.co.uk/frameworks/jquery/0.3.0/sharedmodules/jquery-1.7.2", "jquery-1.4":"http://static.bbci.co.uk/frameworks/jquery/0.3.0/sharedmodules/jquery-1.4", "jquery-1.9":"http://static.bbci.co.uk/frameworks/jquery/0.3.0/sharedmodules/jquery-1.9.1", "swfobject-2":"http://static.bbci.co.uk/frameworks/swfobject/0.1.10/sharedmodules/swfobject-2", "demi-1":"http://static.bbci.co.uk/frameworks/demi/0.10.0/sharedmodules/demi-1", "gelui-1":"http://static.bbci.co.uk/frameworks/gelui/0.9.13/sharedmodules/gelui-1", "cssp!gelui-1/overlay":"http://static.bbci.co.uk/frameworks/gelui/0.9.13/sharedmodules/gelui-1/overlay.css", "istats-1":"http://static.bbci.co.uk/frameworks/istats/0.19.0/modules/istats-1", "relay-1":"http://static.bbci.co.uk/frameworks/relay/0.2.4/sharedmodules/relay-1", "clock-1":"http://static.bbci.co.uk/frameworks/clock/0.1.9/sharedmodules/clock-1", "canvas-clock-1":"http://static.bbci.co.uk/frameworks/clock/0.1.9/sharedmodules/canvas-clock-1", "cssp!clock-1":"http://static.bbci.co.uk/frameworks/clock/0.1.9/sharedmodules/clock-1.css", "jssignals-1":"http://static.bbci.co.uk/frameworks/jssignals/0.3.6/modules/jssignals-1", "jcarousel-1":"http://static.bbci.co.uk/frameworks/jcarousel/0.1.10/modules/jcarousel-1"}; require({ baseUrl: 'http://static.bbci.co.uk/', paths: bbcRequireMap, waitSeconds: 30 }); </script>   <script type="text/javascript">/*<![CDATA[*/ if (typeof bbccookies_flag === 'undefined') { bbccookies_flag = 'ON'; } showCTA_flag = true; cta_enabled = (showCTA_flag && (bbccookies_flag === 'ON') ); (function(){var e="ckns_policy",m="Thu, 01 Jan 1970 00:00:00 GMT",k={ads:true,personalisation:true,performance:true,necessary:true};function f(p){if(f.cache[p]){return f.cache[p]}var o=p.split("/"),q=[""];do{q.unshift((o.join("/")||"/"));o.pop()}while(q[0]!=="/");f.cache[p]=q;return q}f.cache={};function a(p){if(a.cache[p]){return a.cache[p]}var q=p.split("."),o=[];while(q.length&&"|co.uk|com|".indexOf("|"+q.join(".")+"|")===-1){if(q.length){o.push(q.join("."))}q.shift()}f.cache[p]=o;return o}a.cache={};function i(o,t,p){var z=[""].concat(a(window.location.hostname)),w=f(window.location.pathname),y="",r,x;for(var s=0,v=z.length;s<v;s++){r=z[s];for(var q=0,u=w.length;q<u;q++){x=w[q];y=o+"="+t+";"+(r?"domain="+r+";":"")+(x?"path="+x+";":"")+(p?"expires="+p+";":"");bbccookies.set(y,true)}}}window.bbccookies={_setEverywhere:i,cookiesEnabled:function(){var o="ckns_testcookie"+Math.floor(Math.random()*100000);this.set(o+"=1");if(this.get().indexOf(o)>-1){g(o);return true}return false},set:function(o){return document.cookie=o},get:function(){return document.cookie},_setPolicy:function(o){return h.apply(this,arguments)},readPolicy:function(o){return b.apply(this,arguments)},_deletePolicy:function(){i(e,"",m)},isAllowed:function(){return true},_isConfirmed:function(){return c()!==null},_acceptsAll:function(){var o=b();return o&&!(j(o).indexOf("0")>-1)},_getCookieName:function(){return d.apply(this,arguments)},_showPrompt:function(){var o=(!this._isConfirmed()&&window.cta_enabled&&this.cookiesEnabled()&&!window.bbccookies_disable);return(window.orb&&window.orb.fig)?o&&(window.orb.fig("no")||window.orb.fig("ck")):o}};bbccookies._getPolicy=bbccookies.readPolicy;function d(p){var o=(""+p).match(/^([^=]+)(?==)/);return(o&&o.length?o[0]:"")}function j(o){return""+(o.ads?1:0)+(o.personalisation?1:0)+(o.performance?1:0)}function h(r){if(typeof r==="undefined"){r=k}if(typeof arguments[0]==="string"){var o=arguments[0],q=arguments[1];if(o==="necessary"){q=true}r=b();r[o]=q}else{if(typeof arguments[0]==="object"){r.necessary=true}}var p=new Date();p.setYear(p.getFullYear()+1);p=p.toUTCString();bbccookies.set(e+"="+j(r)+";domain=bbc.co.uk;path=/;expires="+p+";");bbccookies.set(e+"="+j(r)+";domain=bbc.com;path=/;expires="+p+";");return r}function l(o){if(o===null){return null}var p=o.split("");return{ads:!!+p[0],personalisation:!!+p[1],performance:!!+p[2],necessary:true}}function c(){var o=new RegExp("(?:^|; ?)"+e+"=(\\d\\d\\d)($|;)"),p=document.cookie.match(o);if(!p){return null}return p[1]}function b(o){var p=l(c());if(!p){p=k}if(o){return p[o]}else{return p}}function g(o){return document.cookie=o+"=;expires="+m+";"}function n(){var o='<script type="text/javascript" src="http://static.bbci.co.uk/frameworks/bbccookies/0.6.3/script/bbccookies.js"><\/script>';if(window.bbccookies_flag==="ON"&&!bbccookies._acceptsAll()&&!window.bbccookies_disable){document.write(o)}}n()})(); /*]]>*/</script>  <script> window.orb = window.orb || {}; (function() {
    'use strict';
    window.fig = window.fig || {};
    window.fig.manager = {
                include: function(w) {
            w = w || window;
            var d = w.document,
                c = d.cookie,
                f = c.match(/ckns_orb_fig=([^;]+)/);

            if ( !f && c.indexOf('ckns_orb_nofig=1') > -1 ) {
                this.setFig(w, {no:1});
            }
            else {
                if (f) {
                    eval('f = ' + decodeURIComponent(RegExp.$1) + ';')
                    this.setFig(w, f);                  
                }
                d.write('<script src="https://ssl.bbc.co.uk/frameworks/fig/1/fig.js"><'+'/script>');
            }         
  
        },
                confirm: function(w) {
            w = w || window;
            if (w.orb && w.orb.fig && w.orb.fig('no')) {
               this.setFigCookie(w);
            }
            
            if (w.orb === undefined || w.orb.fig === undefined) {
                this.setFig(w, {no:1});
                this.setFigCookie(w);
            }
        },
                setFigCookie: function(w) {
            w.document.cookie = 'ckns_orb_nofig=1; expires=' + new Date(new Date().getTime() + 1000 * 60 * 10).toGMTString() + ';';
        },
                setFig: function(w, f){
            (function(){var o=f;w.orb=w.orb||{};w.orb.fig=function(k){return (arguments.length)? o[k]:o};})();
        }
    }
})();
 fig.manager.include(); </script>  
<!--[if (gt IE 8) | (IEMobile)]><!-->
<link rel="stylesheet" href="http://static.bbci.co.uk/frameworks/barlesque/2.64.0/orb/4/style/orb.css">
<!--<![endif]-->

<!--[if (lt IE 9) & (!IEMobile)]>
<link rel="stylesheet" href="http://static.bbci.co.uk/frameworks/barlesque/2.64.0/orb/4/style/orb-ie.css">
<![endif]-->

  <script type="text/javascript">/*<![CDATA[*/ (function(undefined){if(!window.bbc){window.bbc={}}var ROLLING_PERIOD_DAYS=30;window.bbc.Mandolin=function(id,segments,opts){var now=new Date().getTime(),storedItem,DEFAULT_START=now,DEFAULT_RATE=1,COOKIE_NAME="ckpf_mandolin";opts=opts||{};this._id=id;this._segmentSet=segments;this._store=new window.window.bbc.Mandolin.Storage(COOKIE_NAME);this._opts=opts;this._rate=(opts.rate!==undefined)?+opts.rate:DEFAULT_RATE;this._startTs=(opts.start!==undefined)?new Date(opts.start).getTime():new Date(DEFAULT_START).getTime();this._endTs=(opts.end!==undefined)?new Date(opts.end).getTime():daysFromNow(ROLLING_PERIOD_DAYS);this._signupEndTs=(opts.signupEnd!==undefined)?new Date(opts.signupEnd).getTime():this._endTs;this._segment=null;if(typeof id!=="string"){throw new Error("Invalid Argument: id must be defined and be a string")}if(Object.prototype.toString.call(segments)!=="[object Array]"){throw new Error("Invalid Argument: Segments are required.")}if(opts.rate!==undefined&&(opts.rate<0||opts.rate>1)){throw new Error("Invalid Argument: Rate must be between 0 and 1.")}if(this._startTs>this._endTs){throw new Error("Invalid Argument: end date must occur after start date.")}if(!(this._startTs<this._signupEndTs&&this._signupEndTs<=this._endTs)){throw new Error("Invalid Argument: SignupEnd must be between start and end date")}removeExpired.call(this,now);if((storedItem=this._store.getItem(this._id))){this._segment=storedItem.segment}else{if(this._startTs<=now&&now<this._signupEndTs&&now<=this._endTs&&this._store.isEnabled()===true){this._segment=pick(segments,this._rate);if(opts.end===undefined){this._store.setItem(this._id,{segment:this._segment})}else{this._store.setItem(this._id,{segment:this._segment,end:this._endTs})}log.call(this,"mandolin_segment")}}log.call(this,"mandolin_view")};window.bbc.Mandolin.prototype.getSegment=function(){return this._segment};function log(actionType,params){var that=this;require(["istats-1"],function(istats){istats.log(actionType,that._id+":"+that._segment,params?params:{})})}function removeExpired(expires){var items=this._store.getItems(),expiresInt=+expires;for(var key in items){if(items[key].end!==undefined&&+items[key].end<expiresInt){this._store.removeItem(key)}}}function getLastExpirationDate(data){var winner=0,rollingExpire=daysFromNow(ROLLING_PERIOD_DAYS);for(var key in data){if(data[key].end===undefined&&rollingExpire>winner){winner=rollingExpire}else{if(+data[key].end>winner){winner=+data[key].end}}}return(winner)?new Date(winner):new Date(rollingExpire)}window.bbc.Mandolin.prototype.log=function(params){log.call(this,"mandolin_log",params)};window.bbc.Mandolin.prototype.convert=function(params){log.call(this,"mandolin_convert",params);this.convert=function(){}};function daysFromNow(n){var endDate;endDate=new Date().getTime()+(n*60*60*24)*1000;return endDate}function pick(segments,rate){var picked,min=0,max=segments.length-1;if(typeof rate==="number"&&Math.random()>rate){return null}do{picked=Math.floor(Math.random()*(max-min+1))+min}while(picked>max);return segments[picked]}window.bbc.Mandolin.Storage=function(name){this._cookieName=name;this._isEnabled=(bbccookies.isAllowed(this._cookieName)===true&&bbccookies.cookiesEnabled()===true)};window.bbc.Mandolin.Storage.prototype.setItem=function(key,value){var storeData=this.getItems();storeData[key]=value;this.save(storeData);return value};window.bbc.Mandolin.Storage.prototype.isEnabled=function(){return this._isEnabled};window.bbc.Mandolin.Storage.prototype.getItem=function(key){var storeData=this.getItems();return storeData[key]};window.bbc.Mandolin.Storage.prototype.removeItem=function(key){var storeData=this.getItems();delete storeData[key];this.save(storeData)};window.bbc.Mandolin.Storage.prototype.getItems=function(){return deserialise(this.readCookie(this._cookieName)||"")};window.bbc.Mandolin.Storage.prototype.save=function(data){window.bbccookies.set(this._cookieName+"="+encodeURIComponent(serialise(data))+"; expires="+getLastExpirationDate(data).toUTCString()+";")};window.bbc.Mandolin.Storage.prototype.readCookie=function(name){var nameEQ=name+"=",ca=window.bbccookies.get().split(";"),i,c;for(i=0;i<ca.length;i++){c=ca[i];while(c.charAt(0)===" "){c=c.substring(1,c.length)}if(c.indexOf(nameEQ)===0){return decodeURIComponent(c.substring(nameEQ.length,c.length))}}return null};function serialise(o){var str="";for(var p in o){if(o.hasOwnProperty(p)){str+='"'+p+'"'+":"+(typeof o[p]==="object"?(o[p]===null?"null":"{"+serialise(o[p])+"}"):'"'+o[p].toString().replace(/"/g,'\\"')+'"')+","}}return str.replace(/,\}/g,"}").replace(/,$/g,"")}function deserialise(str){var o;eval("o = {"+str+"}");return o}})(); /*]]>*/</script>  <script>  document.documentElement.className += (document.documentElement.className? ' ' : '') + 'orb-js';  fig.manager.confirm(); </script> <script src="http://static.bbci.co.uk/frameworks/barlesque/2.64.0/orb/4/script/orb/api.min.js"></script>    <script type="text/javascript"> /*<![CDATA[*/ function oqsSurveyManager(w, flag) {  var defaultThreshold = 0, usePulseThreshold = (flag === 'OFF')? 1 : defaultThreshold, activeThreshold; w.oqs = w.oqs || {}; /* we support cookie override for testing */ if ( w.document.cookie.match(/(?:^|; *)ckns_oqs_usePulseThreshold=([\d.]+)/) ) { activeThreshold = RegExp.$1; } /* we support clientside override */ else if (typeof w.oqs_usePulseThreshold !== 'undefined') { activeThreshold = w.oqs_usePulseThreshold; } else { activeThreshold = usePulseThreshold; } w.oqs.usePulse = (w.Math.random() < activeThreshold); if (!w.oqs.usePulse) {  w.document.write('<script type="text/javascript" src="http://static.bbci.co.uk/frameworks/barlesque/2.64.0/orb/4/script/vendor/edr.js"><'+'/script>'); } } oqsSurveyManager(window, 'ON'); /*]]>*/ </script>  <script type="text/javascript"> /* <![CDATA[ */ define('id-statusbar-config', { 'translation_signedout': "Sign in", 'translation_signedin': "Your account", 'use_overlay' : false, 'signin_url' : "https://ssl.bbc.co.uk/id/signin", 'locale' : "en-GB", 'policyname' : "", 'ptrt' : "http://www.bbc.co.uk/" }); /* ]]> */ </script>  <script type="text/javascript"> (function () { if (! window.require) { throw new Error('idcta: could not find require'); } var map = {}; map['idapp-1'] = 'http://static.bbci.co.uk/idapp/0.63.15/modules/idapp/idapp-1'; map['idcta/idcta-1'] = 'http://static.bbci.co.uk/id/0.23.4/modules/idcta/idcta-1'; require({paths: map}); define('id-config', {"idapp":{"version":"0.63.15","hostname":"ssl.bbc.co.uk","insecurehostname":"www.bbc.co.uk","tld":"bbc.co.uk"},"idtranslations":{"version":"0.27.12"},"identity":{"baseUrl":"https:\/\/talkback.live.bbc.co.uk\/identity"},"pathway":{"name":null,"staticAssetUrl":"http:\/\/static.bbci.co.uk\/idapp\/0.63.15\/modules\/idapp\/idapp-1\/View.css"}}); })(); </script>    <script type="text/javascript">/*<![CDATA[*/ window.istats = (window.istats || {}); (istats.head = function(w,d) { w.istats._linkTracked = w.istats._trackingCookie = decodeURIComponent( (d.cookie.match(/\bsa_labels=([^;]+)/)||[]).pop() || '' ); var host = w.location.host, m = host.match(/(bbc(?:\.co\.uk|\.com))$/i); d.cookie = 'sa_labels=; expires=Thu, 01 Jan 1970 00:00:01 GMT; domain=' + (m? m[1] : host) + '; path=/'; })(window,document); /*]]>*/</script> <!-- BBCDOTCOM template: responsive , adsEnabled: true -->

<style type="text/css">.bbccom_display_none{display:none;}</style>
<script type="text/javascript">
    /*<![CDATA[*/
    var bbcdotcom = false;
    (function(){
        if(typeof require !== 'undefined') {
            require({
                paths:{
                    "bbcdotcom":"http://static.bbci.co.uk/bbcdotcom/0.3.250/script"
                }
            });
        }
    })();
    /*]]>*/
</script>
<script type="text/javascript">
    /*<![CDATA[*/
        var bbcdotcom = {
        advert: {
            write: function () {},
            show: function () {},
            isActive: function ()    {
                return false;
            },
            layout: function() {
                return {
                    reset: function() {}
                }
            }
        },
        config: {
            init: function() {},
            isActive: function() {},
            setSections: function() {},
            setAdsEnabled: function() {},
            setAssetPrefix: function() {}
        },
        survey: {
            init: function(){ return false; }
        },
        data: {},
        init: function() {},
        objects: function(str) {
            return false;
        },
        locale: {
            set: function() {}
        },
        setAdKeyValue: function() {},
        utils: {
            addHtmlTagClass: function() {}
        }
    };
        if (typeof orb !== 'undefined' && typeof orb.fig === 'function') {
        if(orb.fig('ad') && 0 === orb.fig('uk')) {
            bbcdotcom.data = {
                ads: orb.fig('ad') ? 1 : 0,
                stats: (0 == orb.fig('uk')) ? 1 : 0,
                statsProvider: orb.fig('ap')
            };
            bbcdotcom.siteCatalyst = {"ch":"","cdp":"3","ce":"UTF-8"};
                        document.write('<script type="text/javascript" src="http://www.bbc.co.uk/wwscripts/flag">\x3C/script>');
        }
    }
    /*]]>*/
</script>
<script type="text/javascript">
    /*<![CDATA[*/
    if (window.bbcdotcom && typeof bbcdotcom.flag == 'undefined' || (bbcdotcom && typeof bbcdotcom.data.ads !== 'undefined' && bbcdotcom.flag.a != 1)) {
        /* Check flagpole and disable adverts if necessary.  "a" -> "worldwide/adverts" */
        bbcdotcom.data.ads = 0;
    }
        if (/[?|&]ads-debug/.test(window.location.href)) {
        bbcdotcom.data.ads = 1;
        bbcdotcom.data.stats = 1;
    }
    if (window.bbcdotcom && (bbcdotcom.data.ads == 1 || bbcdotcom.data.stats == 1)) {
                    (function() {
                var useSSL = 'https:' == document.location.protocol;
                var src = (useSSL ? 'https:' : 'http:') +
                        '//www.googletagservices.com/tag/js/gpt.js';
                document.write('<scr' + 'ipt src="' + src + '">\x3C/script>');
            })();
                document.write('<link rel="stylesheet" type="text/css" href="http://static.bbci.co.uk/bbcdotcom/0.3.250/style/orb/bbccom.css" />');
        if (typeof navigator !== 'undefined' &&
                typeof navigator.userAgent !== 'undefined' &&
                navigator.userAgent.indexOf('MSIE 7.0') !== -1) {
            document.write('<link rel="stylesheet" type="text/css" href="http://static.bbci.co.uk/bbcdotcom/0.3.250/style/orb/bbccom-ie7.css" />');
        }
        if (/(sandbox|int)(.dev)*.bbc.co*/.test(window.location.href) || /[?|&]ads-debug/.test(window.location.href)) {
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/config.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/objects.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/utils.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/events.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/init.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/di.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/locale.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/sections.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/currencyProviders.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/keyValues.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/layout.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/wallpaper.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/breakpoints.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/ad.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/slot.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adFactory.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adRegister.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adRenderer.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adUnit.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/dfppRequest.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adsenseRenderer.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/api.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/onLoad.js">\x3C/script>');
                            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/siteCatalyst.js">\x3C/script>');
                    } else {
            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/bbcdotcom.js">\x3C/script>');
        }
        if(/[\\?&]ads=([^&#]*)/.test(window.location.href)) {
            document.write('<script type="text/javascript" src="http://static.bbci.co.uk/bbcdotcom/0.3.250/script/orb/adverts/adSuites.js">\x3C/script>');
        }
    }
    /*]]>*/
</script>
<script type="text/javascript">
    /*<![CDATA[*/
    if (window.bbcdotcom && (bbcdotcom.data.ads == 1 || bbcdotcom.data.stats == 1)) {
        bbcdotcom.config.init(bbcdotcom.data, window.location);
        bbcdotcom.config.setAdsEnabled(true);
                        bbcdotcom.config.setAssetPrefix("http://static.bbci.co.uk/bbcdotcom/0.3.250/");
        bbcdotcom.setAdKeyValue('site', '');
        bbcdotcom.setAdKeyValue('keyword', '');
                                                if (window.bbcdotcom && bbcdotcom.locale) {
            bbcdotcom.locale.set('advertisementText', 'Advertisement');
            bbcdotcom.locale.set('advertInfoPageUrl', 'http://www.bbc.co.uk/faqs/online/adverts_general');
            bbcdotcom.locale.set('inAssociationWithText', 'In association with');
            bbcdotcom.locale.set('sponsoredByText', 'Sponsored by');
        }
        document.write('<!--[if IE 7]> <script type="text/javascript">bbcdotcom.config.setIE7(true);\x3C/script> <![endif]-->');
        document.write('<!--[if IE 8]> <script type="text/javascript">bbcdotcom.config.setIE8(true);\x3C/script> <![endif]-->');
            }
    /*]]>*/
</script>
             