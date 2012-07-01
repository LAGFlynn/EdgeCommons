(function(window) {
  var EdgeCommons = function() {
  };
  EdgeCommons.VERSION = "0.0.1";
  window.EC = window.EdgeCommons = EdgeCommons
})(window);
window.ModulogLog = window.ModulogLog || {$verion:"0.0.1", LEVEL_NONE:0, LEVEL_ERROR:1, LEVEL_WARN:2, LEVEL_INFO:3, LEVEL_DEBUG:4, level:4, __additionalLogTarget:null, addLogTarget:function(loggerCallback) {
  if(typeof loggerCallback === "function") {
    this.__additionalLogTarget = loggerCallback
  }
}, debug:function(msg, group, object) {
  if(this.level >= this.LEVEL_DEBUG && console && console.log) {
    var out = "[ DEBUG " + (group ? "| " + group + " " : "") + "] " + msg;
    object ? console.debug(out, object) : console.debug(out);
    this.__delegate(out, object)
  }
}, info:function(msg, group, object) {
  if(this.level >= this.LEVEL_INFO && console && console.log) {
    var out = "[ INFO " + (group ? "| " + group + " " : "") + "] " + msg;
    object ? console.info(out, object) : console.info(out);
    this.__delegate(out, object)
  }
}, warn:function(msg, group, object) {
  if(this.level >= this.LEVEL_WARN && console && console.log) {
    var out = "[ WARN " + (group ? "| " + group + " " : "") + "] " + msg;
    object ? console.warn(out, object) : console.warn(out);
    this.__delegate(out, object)
  }
}, error:function(msg, group, object) {
  if(this.level >= this.LEVEL_ERROR && console && console.log) {
    var out = "[ ERROR " + (group ? "| " + group + " " : "") + "] " + msg;
    object ? console.error(out, object) : console.error(out);
    this.__delegate(out, object)
  }
}, __delegate:function(msg, object) {
  if(this.__additionalLogTarget) {
    object ? this.__additionalLogTarget(msg + " : " + object.toString()) : this.__additionalLogTarget(msg)
  }
}};
window.Log = window.ModulogLog;
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Core";
  EC.loadScript = function(url, callback) {
    Log.debug("loadScript: " + url, LOG_GROUP);
    try {
      yepnope({load:url, callback:function(pUrl, pResult, pKey) {
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
      Log.error("Loading external script failed: " + url, LOG_GROUP)
    }
  };
  EC.Core = C;
  Log.debug("v" + C.VERSION, LOG_GROUP)
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
  EC.Preload = C;
  Log.debug("v" + C.VERSION, LOG_GROUP)
})(EdgeCommons);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
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
    instance.onComplete = completeCallback
  };
  EC.Sound = C;
  Log.debug("v" + C.VERSION, LOG_GROUP)
})(EdgeCommons);

