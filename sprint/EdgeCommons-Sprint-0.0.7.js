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
  EdgeCommons.VERSION = "0.0.7";
  var LOG_GROUP = "EdgeCommons";
  window.EC = window.EdgeCommons = EdgeCommons;
  Log.debug("v" + EdgeCommons.VERSION, LOG_GROUP)
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
      Log.error("Error in setAdaptiveLayouts(). Argument 'layouts' is not optional and has to be an array.")
    }
    _adaptiveLayouts = adaptiveLayouts;
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

