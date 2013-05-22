// EdgeCommons v1.0.1 +++ Visit edgecommons.org for documentation, updates and examples +++ Copyright (c) 2013 by Simon Widjaja +++ Distributed under the terms of the MIT license (http://www.opensource.org/licenses/mit-license.html) +++ This notice shall be included in all copies or substantial portions of the Software.
(function(window, $) {
  var C = function() {
  };
  C.VERSION = "0.0.2";
  C.$ = $;
  window.Modulog = C
})(window, jQuery);
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
  var $ = Modulog.$;
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
  var $ = Modulog.$;
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
(function(window, $) {
  var EdgeCommons = function() {
  };
  EdgeCommons.VERSION = "1.0.1";
  EdgeCommons.$ = $;
  var LOG_GROUP = "EdgeCommons";
  window.EC = window.EdgeCommons = EdgeCommons
})(window, jQuery);
(function(EC) {
  var C = function() {
  };
  C.VERSION = "1.0.0";
  var $ = EC.$;
  var Log = ModulogLog;
  var LOG_GROUP = "EdgeCommons | Core";
  var _adaptiveLayouts = null;
  var _currentAdaptiveLayout = null;
  var _adaptiveLayoutCallback = null;
  var originalFonts = {};
  var fontMap = {};
  C.getSymbolName = function(sym) {
    var name = sym.getVariable("symbolSelector");
    var paraentSymbol = sym.getParentSymbol();
    if(paraentSymbol) {
      name = name.replace(paraentSymbol.getVariable("symbolSelector") + "_", "")
    }
    name = name.replace("#", "");
    return name
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
  EC.setAdaptiveLayouts = function(adaptiveLayouts, sym, adaptiveContainer, callback) {
    if(!adaptiveLayouts || !adaptiveLayouts.length) {
      Log.error("Error in setAdaptiveLayouts(). Argument 'layouts' is not optional and has to be an array.", LOG_GROUP);
      return
    }
    _adaptiveLayouts = adaptiveLayouts;
    if(!sym) {
      return
    }
    if(typeof callback == "function") {
      _adaptiveLayoutCallback = callback
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
          _currentAdaptiveLayout = calcLayout;
          container.html("");
          var layoutSym = sym.createChildSymbol("layout" + calcLayout, adaptiveContainer);
          if(typeof _adaptiveLayoutCallback == "function") {
            _adaptiveLayoutCallback(calcLayout, layoutSym)
          }
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
      el.html('<iframe id="' + uniqueId + '" src="' + src + '" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none; background-color: rgba(255,255,255,0)"></iframe>');
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
  EC.setFontMap = function(newFontMap) {
    fontMap = newFontMap
  };
  EC.initializeAndStoreFonts = function(stage) {
    var textElements = stage.$(".resizableText");
    for(var i = 0;i < textElements.length;i++) {
      var targetElement = textElements[i];
      var fontSize = targetElement.style.fontSize;
      originalFonts[targetElement.id] = parseInt(fontSize)
    }
  };
  EC.reinitializeFonts = function(stage) {
    originalFonts = {};
    EC.initializeAndStoreFonts(stage)
  };
  EC.resizeAllFonts = function(originalWindowWidth) {
    for(var textElementId in originalFonts) {
      var targetElement = $("#" + textElementId)[0];
      EC.resizeSpecificFont(targetElement, originalWindowWidth)
    }
  };
  EC.resizeSpecificFont = function(targetElement, originalWindowWidth) {
    var maxWindowWidth = parseInt(originalWindowWidth);
    var winWidth = $(window).width();
    var widthRatio = winWidth / maxWindowWidth;
    var originalFontSize = originalFonts[targetElement.id];
    var newFontSize = originalFontSize * widthRatio;
    newFontSize = Math.round(newFontSize);
    if(fontMap[originalWindowWidth][originalFontSize] != undefined) {
      if(newFontSize < fontMap[originalWindowWidth][originalFontSize]["MinFont"]) {
        newFontSize = fontMap[originalWindowWidth][originalFontSize]["MinFont"]
      }
    }else {
      console.log("The font size with the original window width doesnt exist");
      console.log("The font size: " + originalFontSize);
      console.log("The original width size: " + originalWindowWidth)
    }
    targetElement.style.fontSize = newFontSize + "px"
  };
  EC.Core = C;
  EC.Log = Log;
  EC.debug = Log.debug;
  EC.info = Log.info;
  EC.warn = Log.warn;
  EC.error = Log.error;
  EC.Config = MConfig
})(EdgeCommons);

