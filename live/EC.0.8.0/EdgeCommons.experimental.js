(function(window) {
  var C = function() {
  };
  C.VERSION = "0.0.2";
  window.Modulog = C
})(window);
(function(Modulog) {
  var C = function() {
  };
  C.VERSION = "0.0.2";
  C.LEVEL_NONE = 0;
  C.LEVEL_ERROR = 1;
  C.LEVEL_WARN = 2;
  C.LEVEL_INFO = 3;
  C.LEVEL_DEBUG = 4;
  C.level = C.LEVEL_DEBUG;
  var additionalLogTarget = null;
  C.addLogTarget = function(loggerCallback) {
    if(typeof loggerCallback === "function") {
      additionalLogTarget = loggerCallback
    }
  };
  C.debug = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_DEBUG) {
      var out = "[ DEBUG " + (group ? "| " + group + " " : "") + "] " + msg;
      if(typeof console != "undefined" && typeof console.debug != "undefined") {
        object ? console.debug(out, object) : console.debug(out)
      }else {
        if(typeof console != "undefined" && typeof console.info != "undefined") {
          object ? console.info(out, object) : console.info(out)
        }
      }
      ModulogLog.__delegate(out, object)
    }
  };
  C.info = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_INFO) {
      var out = "[ INFO " + (group ? "| " + group + " " : "") + "] " + msg;
      if(typeof console != "undefined" && typeof console.info != "undefined") {
        object ? console.info(out, object) : console.info(out)
      }
      ModulogLog.__delegate(out, object)
    }
  };
  C.warn = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_WARN) {
      var out = "[ WARN " + (group ? "| " + group + " " : "") + "] " + msg;
      if(typeof console != "undefined" && typeof console.warn != "undefined") {
        object ? console.warn(out, object) : console.warn(out)
      }
      ModulogLog.__delegate(out, object)
    }
  };
  C.error = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_ERROR) {
      var out = "[ ERROR " + (group ? "| " + group + " " : "") + "] " + msg;
      if(typeof console != "undefined" && typeof console.error != "undefined") {
        object ? console.error(out, object) : console.error(out)
      }
      ModulogLog.__delegate(out, object)
    }
  };
  C.__delegate = function(msg, object) {
    if(additionalLogTarget) {
      object ? additionalLogTarget(msg + " : " + object.toString()) : additionalLogTarget(msg)
    }
  };
  window.Log = window.MLog = window.ModulogLog = C
})(window.Modulog);
(function(Modulog) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  var config = null;
  var Log = ModulogLog;
  var LOG_GROUP = "Modulog | ModulogConfig";
  C.get = function(path) {
    var el = path.split(".");
    var value = config;
    for(var i = 0;i < el.length;i++) {
      var p = el[i];
      if(!value.hasOwnProperty(p)) {
        ModulogLog.warn("Config value not found: " + path, "CONFIG")
      }
      value = value[p]
    }
    return value
  };
  C.set = function(path, value) {
    var el = path.split(".");
    var target = config;
    for(var i = 0;i < el.length - 1;i++) {
      target = target[el[i]]
    }
    target[el.pop()] = value
  };
  C.init = function(param, readyCallback) {
    if(typeof param === "string" && jQuery) {
      $.getJSON(param, function(data) {
        config = data;
        if(typeof readyCallback === "function") {
          readyCallback()
        }
      })
    }else {
      if(typeof param === "object") {
        config = param
      }else {
        Log.error("Could not init config. init() function expects config object or url to config.js. " + "Latter needs jQuery to be initialized before.", LOG_GROUP)
      }
    }
  };
  window.Config = window.MConfig = window.ModulogConfig = C
})(window.Modulog);
(function(window) {
  var EdgeCommons = function() {
  };
  EdgeCommons.VERSION = "0.7.1";
  var LOG_GROUP = "EdgeCommons";
  window.EC = window.EdgeCommons = EdgeCommons
})(window);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.6";
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Core";
  var _adaptiveLayouts = null;
  var _currentAdaptiveLayout = null;
  EC.loadScript = function(url, callback) {
    Log.debug("loadScript: " + url, LOG_GROUP);
    try {
      yepnope({load:url, callback:function(pUrl, pTestResult, pKey) {
        if(pUrl == url) {
          Log.debug("Loading external script was successful: " + url, LOG_GROUP);
          if(typeof callback === "function") {
            callback()
          }
        }
      }})
    }catch(error) {
      Log.error("Loading external script failed: " + url, LOG_GROUP)
    }
  };
  EC.getInjectedData = function(sym, scriptClassSelector) {
    try {
      scriptClassSelector = scriptClassSelector || "data";
      if(!sym || !sym.getParentSymbol) {
        Log.error("getInjectedData(): First argument 'sys' is not optional", LOG_GROUP)
      }
      while(sym.getParentSymbol()) {
        sym = sym.getParentSymbol()
      }
      var injectedDataRaw = sym.getSymbolElement().find("." + scriptClassSelector).html();
      var injectedData = $.parseJSON(injectedDataRaw);
      return injectedData
    }catch(error) {
      Log.error("Reading injected data failed (scriptClassSelector=" + scriptClassSelector + ")", LOG_GROUP, error)
    }
  };
  EC.setAdaptiveLayouts = function(adaptiveLayouts, sym, adaptiveContainer) {
    if(!adaptiveLayouts || !adaptiveLayouts.length) {
      Log.error("Error in setAdaptiveLayouts(). Argument 'layouts' is not optional and has to be an array.", LOG_GROUP);
      return
    }
    _adaptiveLayouts = adaptiveLayouts;
    if(!sym) {
      return
    }
    $(window).resize(function(e) {
      EC.applyAdaptiveLayout(sym, adaptiveContainer)
    });
    EC.applyAdaptiveLayout(sym, adaptiveContainer)
  };
  EC.applyAdaptiveLayout = function(sym, adaptiveContainer) {
    try {
      sym.setVariable("doResizing", function() {
        var stage = sym.getComposition().getStage();
        var width = stage.getSymbolElement().width();
        var container = sym.$(adaptiveContainer);
        var buffer = 20;
        var calcLayout = null;
        $.each(_adaptiveLayouts, function(index, layout) {
          if(width >= layout - buffer) {
            calcLayout = layout
          }
        });
        if(_currentAdaptiveLayout != calcLayout) {
          Log.debug("Switching to: layout" + calcLayout, LOG_GROUP);
          _currentAdaptiveLayout = calcLayout;
          container.html("");
          sym.createChildSymbol("layout" + calcLayout, adaptiveContainer)
        }
        sym.$("currentLayout").html(sym.getVariable("layout"))
      });
      var doResizing = sym.getVariable("doResizing");
      doResizing()
    }catch(error) {
      console.error(error)
    }
  };
  EC.centerStage = function(sym) {
    if(!sym) {
      Log.error("Error in centerStage(). Argument 'sym' is not optional.", LOG_GROUP);
      return
    }
    sym.getComposition().getStage().getSymbolElement().css("margin", "0px auto")
  };
  EC.loadComposition = function(src, sym) {
    if(!src || !sym) {
      Log.error("Error in loadComposition(). Arguments 'src' and 'sym' are not optional.", LOG_GROUP);
      return
    }
    try {
      var el = sym.getSymbolElement();
      var uniqueId = "ec_" + Math.random().toString(36).substring(7);
      el.html('<iframe id="' + uniqueId + '" src="' + src + '" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none;"></iframe>');
      var promise = new jQuery.Deferred;
      var iframe = jQuery("#" + uniqueId);
      var innerWindow = iframe[0].contentWindow;
      iframe.load(function() {
        innerWindow.AdobeEdge.bootstrapCallback(function(compId) {
          var innerComp = innerWindow.AdobeEdge.getComposition(compId);
          promise.resolve(innerComp, innerWindow.AdobeEdge)
        })
      })
    }catch(err) {
      EC.error("Error in loadComposition: ", LOG_GROUP, err.toString())
    }
    return promise
  };
  EC.Core = C;
  EC.Log = Log;
  EC.debug = Log.debug;
  EC.info = Log.info;
  EC.warn = Log.warn;
  EC.error = Log.error;
  EC.Config = MConfig
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  C.preloader = null;
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Preload";
  var URL_CREATEJS_PRELOADER = "http://code.createjs.com/preloadjs-0.1.0.min.js";
  C.setup = function(callback) {
    try {
      if(!C.preloader) {
        EC.loadScript(URL_CREATEJS_PRELOADER, function() {
          C.preloader = new PreloadJS;
          callback()
        })
      }else {
        callback()
      }
    }catch(error) {
      Log.error("Error in setup(): " + error.toString(), LOG_GROUP, error)
    }
  };
  EC.Preload = C
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.2";
  C.soundManifest = null;
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Sound";
  var URL_CREATEJS_SOUNDJS = "http://code.createjs.com/soundjs-0.2.0.min.js";
  C.setup = function(manifest, callback) {
    try {
      if(!manifest) {
        Log.error("Sound.setup() failed: manifest argument is not optional", LOG_GROUP);
        return
      }
      this.soundManifest = manifest;
      var callbackSoundReady = function() {
        EC.Preload.preloader.installPlugin(SoundJS);
        EC.Preload.preloader.onFileLoad = function(event) {
          Log.debug("onFileLoad", LOG_GROUP)
        };
        EC.Preload.preloader.onComplete = function(event) {
          Log.debug("onComplete", LOG_GROUP)
        };
        Log.debug("Loading Sound Manifest", "DEBUG", C.soundManifest);
        EC.Preload.preloader.loadManifest(C.soundManifest, true);
        if(callback) {
          callback()
        }
      };
      if(!EC.Preload.preloader) {
        EC.Preload.setup(function() {
          EC.loadScript(URL_CREATEJS_SOUNDJS, callbackSoundReady)
        })
      }else {
        EC.loadScript(URL_CREATEJS_SOUNDJS, callbackSoundReady)
      }
    }catch(error) {
      Log.error("Error in setup(): " + error.toString(), LOG_GROUP, error)
    }
  };
  C.play = function(soundId, completeCallback) {
    if(!SoundJS.checkPlugin(true)) {
      Log.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)", LOG_GROUP);
      return
    }
    Log.debug("Playing sound: " + soundId, LOG_GROUP);
    var instance = SoundJS.play(soundId, SoundJS.INTERRUPT_NONE, 0, 0, false, 1);
    if(instance) {
      instance.onComplete = completeCallback
    }
  };
  C.stop = function(soundId, completeCallback) {
    if(!SoundJS.checkPlugin(true)) {
      Log.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)", LOG_GROUP);
      return
    }
    Log.debug("Stopping sound: " + soundId, LOG_GROUP);
    var instance = SoundJS.stop(soundId)
  };
  EC.Sound = C
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  C.compositions = {};
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Parallax";
  C.addComposition = function(compId) {
    this.compositions[compId] = {};
    var stage = AdobeEdge.getComposition(compId).getStage();
    this.compositions[compId].stage = stage;
    var stageElement = AdobeEdge.getComposition(compId).getStage().getSymbolElement();
    this.compositions[compId].stageElement = stageElement;
    var stageHeight = stageElement.height();
    this.compositions[compId].stageHeight = stageHeight;
    var stageTop = stageElement.position().top;
    this.compositions[compId].stageTop = stageTop;
    this.compositions[compId].stageMiddle = Math.floor(stageTop + stageHeight / 2);
    this.compositions[compId].duration = stage.getDuration();
    stage.stop(0)
  };
  C.setup = function(sym) {
    if(!sym) {
      Log.error("Error in setup(). Argument 'sym' is not optional.", LOG_GROUP);
      return
    }
    this.addComposition(sym.getComposition().compId);
    $(document).scroll(function() {
      var scrollTop = $(document).scrollTop();
      $.each(EC.Parallax.compositions, function(compId, c) {
        var percentage = scrollTop / (c.stageHeight - $(window).height());
        var playheadPos = Math.floor(percentage * c.duration);
        c.stage.stop(playheadPos)
      })
    })
  };
  EC.Parallax = C
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  C.compositions = {};
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Spotlight";
  C.open = function(config) {
    if(config.type != "youtube") {
      Log.error("Error in open(). Spotlight only supports type 'youtube' in this version", LOG_GROUP);
      return
    }
    config.width = config.width || 400;
    config.height = config.height || 600;
    config.borderWidth = config.borderWidth || 5;
    config.borderColor = config.borderColor || "#FFF";
    var tpl = '<div id="spotlight"> <div class="background"> </div> </div>';
    $("body").append(tpl);
    var tpl = '<div class="base"></div>';
    $("#spotlight .background").append(tpl);
    var tpl = '<div class="close-button"></div>';
    $("#spotlight .background").append(tpl);
    var closeButton = $("#spotlight .close-button");
    closeButton.css("margin-left", 0.5 * config.width - 15 + config.borderWidth).css("margin-top", -0.5 * config.height - 15);
    var base = $("#spotlight .base");
    base.css("width", 0).css("height", 0).css("margin-left", 0).css("margin-top", 0).css("border-width", config.borderWidth).css("border-color", config.borderColor).css("border-radius", 5);
    base.animate({width:config.width, "margin-left":-0.5 * config.width, height:config.height, "margin-top":-0.5 * config.height}, 400, "easeOutBack", function() {
      $("#spotlight .content").css("display", "inline");
      $("#spotlight .fader").fadeOut(2E3);
      $("#spotlight .close-button").fadeIn()
    });
    base.append('<div class="content"></div>');
    var content = $("#spotlight .content");
    content.append('<iframe width="' + config.width + '" height="' + config.height + '" ' + 'src="http://www.youtube.com/embed/' + config.param.media + "?autoplay=" + (config.param && config.param.autoplay ? "1" : "0") + '" ' + 'frameborder="0" allowfullscreen></iframe>');
    content.append('<div class="fader"></div>');
    var fader = $("#spotlight .fader");
    $("#spotlight .background").click(function() {
      EC.Spotlight.close(config)
    })
  };
  C.close = function() {
    $("#spotlight .content").remove();
    $("#spotlight .close-button").remove();
    $("#spotlight .background").fadeOut(400);
    var base = $("#spotlight .base");
    base.animate({width:0, "margin-left":0, height:0, "margin-top":0, opacity:0}, 400, "easeOutCubic", function() {
      $("#spotlight").remove()
    })
  };
  EC.Spotlight = C
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1a";
  C.compositions = {};
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Experimental";
  C.SpeedControl = {};
  C.SpeedControl.setSpeed = function(factor, sym, recursive) {
    $.each(sym.timelines["Default Timeline"].timeline, function(key, item) {
      if(typeof item.ec == "undefined") {
        item.ec = {}
      }
      if(typeof item.ec.oldPosition == "undefined") {
        item.ec.originalPosition = item.position;
        item.ec.originalDuration = item.duration
      }
      item.position = 1 / factor * item.ec.originalPosition;
      item.duration = 1 / factor * item.ec.originalDuration;
      sym._flushCache();
      EC.debug("setSpeed: factor:", LOG_GROUP, 1 / factor)
    })
  };
  EC.Experimental = C;
  Log.debug("v" + C.VERSION, LOG_GROUP)
})(EdgeCommons);

