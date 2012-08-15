/**
 * EdgeCommons
 * Dirty little Helpers for Adobe Edge
 * by Simon Widjaja
 *
 * Copyright (c) 2012 Simon Widjaja
 *
 * --------------------------------------------------------------------------------------------------------------------------------------------------
 * Released under MIT license
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
 * OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 * --------------------------------------------------------------------------------------------------------------------------------------------------
 * Additional 3rd party libraries are used. For related credits and license models take a closer look at the affected library.
 * --------------------------------------------------------------------------------------------------------------------------------------------------
 */

/**
 * Module: Preload
 */
(function (EC) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = function () {
    };

    //------------------------------------
    // Public
    //------------------------------------
    C.VERSION = "0.0.1";
    C.preloader = null;

    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "EdgeCommons | Preload";
    var URL_CREATEJS_PRELOADER = "http://code.createjs.com/preloadjs-0.1.0.min.js";

    //------------------------------------
    // Methods
    //------------------------------------
    /**
     * Setup Preloader and call callback.
     * Callback will be called when Preloader is ready
     * or directly if Preloader already exists
     * @param callback
     */
    C.setup = function (callback) {
        try {
            if (!C.preloader) {
                EC.loadScript(URL_CREATEJS_PRELOADER, function () {
                    C.preloader = new PreloadJS();
                    callback();
                });
            }
            else {
                callback();
            }
        } catch (error) {
            Log.error("Error in setup(): " + error.toString(), LOG_GROUP, error);
        }
    };


    //------------------------------------
    // Init
    //------------------------------------
    EC.Preload = C;
    //Log.debug("v" + C.VERSION, LOG_GROUP);

})(EdgeCommons);