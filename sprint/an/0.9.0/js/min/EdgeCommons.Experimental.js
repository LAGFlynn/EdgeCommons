// EdgeCommons v0.9.0 +++ Visit edgecommons.org for documentation, updates and examples +++ Copyright (c) 2013 by Simon Widjaja +++ Distributed under the terms of the MIT license (http://www.opensource.org/licenses/mit-license.html) +++ This notice shall be included in all copies or substantial portions of the Software.
// Input 0
(function(a){var d=function(){};d.VERSION="0.0.2";a.Modulog=d})(window);
(function(){var a=function(){};a.VERSION="0.0.2";a.LEVEL_NONE=0;a.LEVEL_ERROR=1;a.LEVEL_WARN=2;a.LEVEL_INFO=3;a.LEVEL_DEBUG=4;a.level=a.LEVEL_DEBUG;var d=null;a.addLogTarget=function(c){"function"===typeof c&&(d=c)};a.debug=function(c,b,e){ModulogLog.level>=ModulogLog.LEVEL_DEBUG&&(c="[ DEBUG "+(b?"| "+b+" ":"")+"] "+c,"undefined"!=typeof console&&"undefined"!=typeof console.debug?e?console.debug(c,e):console.debug(c):"undefined"!=typeof console&&"undefined"!=typeof console.info&&(e?console.info(c,
e):console.info(c)),ModulogLog.__delegate(c,e))};a.info=function(c,b,e){ModulogLog.level>=ModulogLog.LEVEL_INFO&&(c="[ INFO "+(b?"| "+b+" ":"")+"] "+c,"undefined"!=typeof console&&"undefined"!=typeof console.info&&(e?console.info(c,e):console.info(c)),ModulogLog.__delegate(c,e))};a.warn=function(c,b,e){ModulogLog.level>=ModulogLog.LEVEL_WARN&&(c="[ WARN "+(b?"| "+b+" ":"")+"] "+c,"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(e?console.warn(c,e):console.warn(c)),ModulogLog.__delegate(c,
e))};a.error=function(c,b,e){ModulogLog.level>=ModulogLog.LEVEL_ERROR&&(c="[ ERROR "+(b?"| "+b+" ":"")+"] "+c,"undefined"!=typeof console&&"undefined"!=typeof console.error&&(e?console.error(c,e):console.error(c)),ModulogLog.__delegate(c,e))};a.__delegate=function(c,b){d&&(b?d(c+" : "+b.toString()):d(c))};window.Log=window.MLog=window.ModulogLog=a})(window.Modulog);
(function(){var a=function(){};a.VERSION="0.0.1";var d=null,c=ModulogLog;a.get=function(b){for(var e=b.split("."),c=d,a=0;a<e.length;a++){var f=e[a];c.hasOwnProperty(f)||ModulogLog.warn("Config value not found: "+b,"CONFIG");c=c[f]}return c};a.set=function(b,c){for(var a=b.split("."),g=d,f=0;f<a.length-1;f++)g=g[a[f]];g[a.pop()]=c};a.init=function(b,a){"string"===typeof b&&jQuery?$.getJSON(b,function(b){d=b;"function"===typeof a&&a()}):"object"===typeof b?d=b:c.error("Could not init config. init() function expects config object or url to config.js. Latter needs jQuery to be initialized before.",
"Modulog | ModulogConfig")};window.Config=window.MConfig=window.ModulogConfig=a})(window.Modulog);
// Input 1
(function(a){var d=function(){};d.VERSION="0.9.0";a.EC=a.EdgeCommons=d})(window);
// Input 2
(function(a){var d=function(){};d.VERSION="0.0.6";var c=ModulogLog,b=null,e=null;a.loadScript=function(b,a){c.debug("loadScript: "+b,"EdgeCommons | Core");try{yepnope({load:b,callback:function(e){e==b&&(c.debug("Loading external script was successful: "+b,"EdgeCommons | Core"),"function"===typeof a&&a())}})}catch(e){c.error("Loading external script failed: "+b,"EdgeCommons | Core")}};a.getInjectedData=function(b,a){try{a=a||"data";for((!b||!b.getParentSymbol)&&c.error("getInjectedData(): First argument 'sys' is not optional",
"EdgeCommons | Core");b.getParentSymbol();)b=b.getParentSymbol();var e=b.getSymbolElement().find("."+a).html();return $.parseJSON(e)}catch(d){c.error("Reading injected data failed (scriptClassSelector="+a+")","EdgeCommons | Core",d)}};a.setAdaptiveLayouts=function(e,d,f){!e||!e.length?c.error("Error in setAdaptiveLayouts(). Argument 'layouts' is not optional and has to be an array.","EdgeCommons | Core"):(b=e,d&&($(window).resize(function(){a.applyAdaptiveLayout(d,f)}),a.applyAdaptiveLayout(d,f)))};
a.applyAdaptiveLayout=function(a,d){try{a.setVariable("doResizing",function(){var f=a.getComposition().getStage().getSymbolElement().width(),j=a.$(d),h=null;$.each(b,function(b,a){f>=a-20&&(h=a)});e!=h&&(c.debug("Switching to: layout"+h,"EdgeCommons | Core"),e=h,j.html(""),a.createChildSymbol("layout"+h,d));a.$("currentLayout").html(a.getVariable("layout"))}),a.getVariable("doResizing")()}catch(f){console.error(f)}};a.centerStage=function(b){b?b.getComposition().getStage().getSymbolElement().css("margin",
"0px auto"):c.error("Error in centerStage(). Argument 'sym' is not optional.","EdgeCommons | Core")};a.loadComposition=function(b,e){if(!b||!e)c.error("Error in loadComposition(). Arguments 'src' and 'sym' are not optional.","EdgeCommons | Core");else{try{var d=e.getSymbolElement(),l="ec_"+Math.random().toString(36).substring(7);d.html('<iframe id="'+l+'" src="'+b+'" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none;"></iframe>');var j=new jQuery.Deferred,h=jQuery("#"+
l),k=h[0].contentWindow;h.load(function(){k.AdobeEdge.bootstrapCallback(function(b){b=k.AdobeEdge.getComposition(b);j.resolve(b,k.AdobeEdge)})})}catch(m){a.error("Error in loadComposition: ","EdgeCommons | Core",m.toString())}return j}};a.Core=d;a.Log=c;a.debug=c.debug;a.info=c.info;a.warn=c.warn;a.error=c.error;a.Config=MConfig})(EdgeCommons);
// Input 3
(function(a){var d=function(){};d.VERSION="0.0.1";d.preloader=null;var c=ModulogLog;d.setup=function(b){try{d.preloader?b():a.loadScript("http://code.createjs.com/preloadjs-0.1.0.min.js",function(){d.preloader=new PreloadJS;b()})}catch(e){c.error("Error in setup(): "+e.toString(),"EdgeCommons | Preload",e)}};a.Preload=d})(EdgeCommons);
// Input 4
(function(a){var d=function(){};d.VERSION="0.0.2";d.soundManifest=null;var c=ModulogLog;d.setup=function(b,e){try{if(b){this.soundManifest=b;var i=function(){a.Preload.preloader.installPlugin(SoundJS);a.Preload.preloader.onFileLoad=function(){c.debug("onFileLoad","EdgeCommons | Sound")};a.Preload.preloader.onComplete=function(){c.debug("onComplete","EdgeCommons | Sound")};c.debug("Loading Sound Manifest","DEBUG",d.soundManifest);a.Preload.preloader.loadManifest(d.soundManifest,!0);e&&e()};a.Preload.preloader?
a.loadScript("http://code.createjs.com/soundjs-0.2.0.min.js",i):a.Preload.setup(function(){a.loadScript("http://code.createjs.com/soundjs-0.2.0.min.js",i)})}else c.error("Sound.setup() failed: manifest argument is not optional","EdgeCommons | Sound")}catch(g){c.error("Error in setup(): "+g.toString(),"EdgeCommons | Sound",g)}};d.play=function(b,a){if(SoundJS.checkPlugin(!0)){c.debug("Playing sound: "+b,"EdgeCommons | Sound");var d=SoundJS.play(b,SoundJS.INTERRUPT_NONE,0,0,!1,1);d&&(d.onComplete=a)}else c.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)",
"EdgeCommons | Sound")};d.stop=function(b){SoundJS.checkPlugin(!0)?(c.debug("Stopping sound: "+b,"EdgeCommons | Sound"),SoundJS.stop(b)):c.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)","EdgeCommons | Sound")};a.Sound=d})(EdgeCommons);
// Input 5
(function(a){var d=function(){};d.VERSION="0.0.1";d.compositions={};var c=ModulogLog;d.addComposition=function(b){this.compositions[b]={};var a=AdobeEdge.getComposition(b).getStage();this.compositions[b].stage=a;var c=AdobeEdge.getComposition(b).getStage().getSymbolElement();this.compositions[b].stageElement=c;var d=c.height();this.compositions[b].stageHeight=d;c=c.position().top;this.compositions[b].stageTop=c;this.compositions[b].stageMiddle=Math.floor(c+d/2);this.compositions[b].duration=a.getDuration();
a.stop(0)};d.setup=function(b){b?(this.addComposition(b.getComposition().compId),$(document).scroll(function(){var b=$(document).scrollTop();$.each(a.Parallax.compositions,function(a,c){var d=b/(c.stageHeight-$(window).height());c.stage.stop(Math.floor(d*c.duration))})})):c.error("Error in setup(). Argument 'sym' is not optional.","EdgeCommons | Parallax")};a.Parallax=d})(EdgeCommons);
// Input 6
(function(a){var d=function(){};d.VERSION="0.3.1";var c=ModulogLog;d.open=function(b,e){try{if("image"!=b.type&&"animate"!=b.type&&"youtube"!=b.type)c.error("Error in open(). Unsupported type: "+b.type,"EdgeCommons | Spotlight");else{void 0==e&&(e=window.top.document);b.width=b.width||400;b.height=b.height||600;b.borderWidth=b.borderWidth||5;b.borderColor=b.borderColor||"#FFF";$("body",e).append('<div id="spotlight"> <div class="background"> </div> </div>');$("#spotlight .background",e).append('<div class="base"></div>');
$("#spotlight .background",e).append('<div class="close-button"></div>');$("#spotlight .close-button",e).css("margin-left",0.5*b.width-15+b.borderWidth).css("margin-top",-0.5*b.height-15);var d=$("#spotlight .base",e);d.css("width",0).css("height",0).css("margin-left",0).css("margin-top",0).css("border-width",b.borderWidth).css("border-color",b.borderColor).css("border-radius",5);d.animate({width:b.width,"margin-left":-0.5*b.width,height:b.height,"margin-top":-0.5*b.height},400,"easeOutBack",function(){$("#spotlight .content",
e).css("display","inline");$("#spotlight .fader",e).fadeOut(2E3);$("#spotlight .close-button",e).fadeIn()});d.append('<div class="content"></div>');var g=$("#spotlight .content",e);switch(b.type){case "image":g.append('<img src="'+b.source+'" />');break;case "animate":g.append('<iframe src="'+b.source+'" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none;"></iframe>');break;case "youtube":g.append('<iframe width="'+b.width+'" height="'+b.height+'" src="http://www.youtube.com/embed/'+
b.source+"?autoplay="+(b.param&&b.param.autoPlay?"1":"0")+'" frameborder="0" allowfullscreen></iframe>')}g.append('<div class="fader"></div>');$("#spotlight .fader",e);$("#spotlight .background",e).click(function(){a.Spotlight.close(b,e)});return!0}}catch(f){return c.error(f.toString()),!1}};d.close=function(b,a){void 0==a&&(a=window.top.document);$("#spotlight .content",a).remove();$("#spotlight .close-button",a).remove();$("#spotlight .background",a).fadeOut(400);$("#spotlight .base",a).animate({width:0,
"margin-left":0,height:0,"margin-top":0,opacity:0},400,"easeOutCubic",function(){$("#spotlight",a).remove()})};a.Spotlight=d})(EdgeCommons);
// Input 7
(function(a){a.Experimental={};a.Experimental.VERSION="0.0.3";a.getSymbolName=function(a){var c=a.getVariable("symbolSelector");(a=a.getParentSymbol())&&(c=c.replace(a.getVariable("symbolSelector")+"_",""));return c=c.replace("#","")};a.accessSVG=function(a){if(a.is("div"))var c=a.css("background-image").replace("url(","").replace(")",""),c=c.replace('"',"");a.css("background-image","");var b="ec_"+Math.random().toString(36).substring(7);a.append('<embed id="'+b+'" src="'+c+'" type="image/svg+xml" width="100%" height="100%" />');
var e=new jQuery.Deferred,i=document.getElementById(b);i.onload=function(){var a=i.getSVGDocument();e.resolve(a,i,b)};return e};a.SpeedControl={};a.SpeedControl.setSpeed=function(d,c){$.each(c.timelines["Default Timeline"].timeline,function(b,e){"undefined"==typeof e.ec&&(e.ec={});"undefined"==typeof e.ec.oldPosition&&(e.ec.originalPosition=e.position,e.ec.originalDuration=e.duration);e.position=1/d*e.ec.originalPosition;e.duration=1/d*e.ec.originalDuration;c._flushCache();a.debug("setSpeed: factor:",
"EdgeCommons | Experimental",1/d)})}})(EdgeCommons);