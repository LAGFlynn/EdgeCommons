/**
 * Modulog
 * by Simon Widjaja
 **/
(function (window, $) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = function () {
    };
    //------------------------------------
    // Public
    //------------------------------------
    C.VERSION = "0.0.2";
    C.$ = $;
    //------------------------------------
    // Private
    //------------------------------------

    //------------------------------------
    // Init
    //------------------------------------
    window.Modulog = C;
})(window, jQuery);


/**
 * ModulogLog
 * by Simon Widjaja
 */
(function (Modulog) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = function () {
    };
    //------------------------------------
    // Public
    //------------------------------------
    C.VERSION = "0.0.2";
    C.LEVEL_NONE = 0;
    C.LEVEL_ERROR = 1;
    C.LEVEL_WARN = 2;
    C.LEVEL_INFO = 3;
    C.LEVEL_DEBUG = 4;
    C.level = C.LEVEL_DEBUG; // Default Log level
    //------------------------------------
    // Private
    //------------------------------------
    // jQuery
    var $ = Modulog.$;

    var additionalLogTarget = null;
    //------------------------------------
    // Methods
    //------------------------------------
    C.addLogTarget = function (loggerCallback) {
        if (typeof loggerCallback === "function") {
            additionalLogTarget = loggerCallback;
        }
    };
    C.debug = function (msg, group, object) {
        if (ModulogLog.level >= ModulogLog.LEVEL_DEBUG) {
            var out = "[ DEBUG " + ((group) ? "| " + group + " " : "") + "] " + msg;
            if ((typeof console != "undefined") && (typeof console.debug != "undefined")) {
                (object) ? console.debug(out, object) : console.debug(out);
            } 
            else if ((typeof console != "undefined") && (typeof console.info != "undefined")) {
                (object) ? console.info(out, object) : console.info(out);                
            }
            ModulogLog.__delegate(out, object);
        }
    };
    C.info = function (msg, group, object) {
        if (ModulogLog.level >= ModulogLog.LEVEL_INFO) {
            var out = "[ INFO " + ((group) ? "| " + group + " " : "") + "] " + msg;
            if ((typeof console != "undefined") && (typeof console.info != "undefined")) {
                (object) ? console.info(out, object) : console.info(out);
            }
            ModulogLog.__delegate(out, object);
        }
    };
    C.warn = function (msg, group, object) {
        if (ModulogLog.level >= ModulogLog.LEVEL_WARN) {
            var out = "[ WARN " + ((group) ? "| " + group + " " : "") + "] " + msg;
            if ((typeof console != "undefined") && (typeof console.warn != "undefined")) {
                (object) ? console.warn(out, object) : console.warn(out);
            }
            ModulogLog.__delegate(out, object);
        }
    };
    C.error = function (msg, group, object) {
        if (ModulogLog.level >= ModulogLog.LEVEL_ERROR) {
            var out = "[ ERROR " + ((group) ? "| " + group + " " : "") + "] " + msg;
            if ((typeof console != "undefined") && (typeof console.error != "undefined")) {
                (object) ? console.error(out, object) : console.error(out);
            }
            ModulogLog.__delegate(out, object);
        }
    };
    C.__delegate = function (msg, object) {
        if (additionalLogTarget) {
            (object) ? additionalLogTarget(msg + " : " + object.toString()) : additionalLogTarget(msg);
        }
    };
    //------------------------------------
    // Init
    //------------------------------------
    window.Log = window.MLog = window.ModulogLog = C;
})(window.Modulog);


/**
 * ModulogConfig
 * by Simon Widjaja
 * Usage:
 * - Config.init(configObject);
 * - Config.init(url, callback);
 * - Config.set("topic.subtopic.value", value);
 * - Config.get("topic.subtopic.value");
 */
(function (Modulog) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = function () {
    };
    //------------------------------------
    // Public
    //------------------------------------
    C.VERSION = "0.0.1";
    //------------------------------------
    // Private
    //------------------------------------
    // jQuery
    var $ = Modulog.$;
    // Config
    var config = null;
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "Modulog | ModulogConfig";

    //------------------------------------
    // Methods
    //------------------------------------
    C.get = function (path) {
        var el = path.split(".");
        var value = config;
        for (var i = 0; i < el.length; i++) {
            var p = el[i];
            if (!value.hasOwnProperty(p)) {
                ModulogLog.warn("Config value not found: " + path, "CONFIG");
            }
            value = value[p];
        }
        return value;
    };
    C.set = function (path, value) {
        var el = path.split(".");
        var target = config;
        for (var i = 0; i < el.length - 1; i++) {
            target = target[el[i]];
        }
        target[el.pop()] = value;
    };
    C.init = function (param, readyCallback) {
        // URL
        if ((typeof(param) === "string") && (jQuery)) {          
            $.getJSON(param, function (data) {
                config = data;
                if (typeof(readyCallback) === "function") {
                    readyCallback();
                }
            });
        }
        // Config Object
        else if (typeof(param) === "object") {
            config = param;
        }
        // Error
        else {
            Log.error("Could not init config. init() function expects config object or url to config.js. " +
                "Latter needs jQuery to be initialized before.", LOG_GROUP);
        }
    };
    //------------------------------------
    // Init
    //------------------------------------
    window.Config = window.MConfig = window.ModulogConfig = C;
})(window.Modulog);


