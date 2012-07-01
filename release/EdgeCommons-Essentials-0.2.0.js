(function(window) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
  window.Modulog = C
})(window);
(function(Modulog) {
  var C = function() {
  };
  C.VERSION = "0.0.1";
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
    if(ModulogLog.level >= ModulogLog.LEVEL_DEBUG && typeof console != "undefined" && typeof console.log != "undefined") {
      var out = "[ DEBUG " + (group ? "| " + group + " " : "") + "] " + msg;
      object ? console.debug(out, object) : console.debug(out);
      ModulogLog.__delegate(out, object)
    }
  };
  C.info = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_INFO && typeof console != "undefined" && typeof console.log != "undefined") {
      var out = "[ INFO " + (group ? "| " + group + " " : "") + "] " + msg;
      object ? console.info(out, object) : console.info(out);
      ModulogLog.__delegate(out, object)
    }
  };
  C.warn = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_WARN && typeof console != "undefined" && typeof console.log != "undefined") {
      var out = "[ WARN " + (group ? "| " + group + " " : "") + "] " + msg;
      object ? console.warn(out, object) : console.warn(out);
      ModulogLog.__delegate(out, object)
    }
  };
  C.error = function(msg, group, object) {
    if(ModulogLog.level >= ModulogLog.LEVEL_ERROR && typeof console != "undefined" && typeof console.log != "undefined") {
      var out = "[ ERROR " + (group ? "| " + group + " " : "") + "] " + msg;
      object ? console.error(out, object) : console.error(out);
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
  EdgeCommons.VERSION = "0.0.2";
  window.EC = window.EdgeCommons = EdgeCommons
})(window);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "0.0.2";
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Core";
  EC.loadScript = function(url, callback) {
    Log.debug("loadScript: " + url, LOG_GROUP);
    try {
      yepnope({load:url, callback:function(pUrl, pResult, pKey) {
        if(pUrl == url) {
          switch(pResult) {
            case true:
              Log.debug("Loading external script was successful: " + url, LOG_GROUP);
              if(typeof callback === "function") {
                callback()
              }
              break;
            default:
              Log.error("Loading external script failed: " + url, LOG_GROUP)
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
  EC.Core = C;
  EC.debug = Log.debug;
  EC.info = Log.info;
  EC.warn = Log.warn;
  EC.error = Log.error;
  Log.debug("v" + C.VERSION, LOG_GROUP)
})(EdgeCommons);

