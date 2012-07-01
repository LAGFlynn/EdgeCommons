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

