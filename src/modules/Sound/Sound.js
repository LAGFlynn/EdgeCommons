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
 * Module: Sound
 * Bridge to the great framework by Grant Skinner "CreateJS"
 */

/**
TODO: DESCRIPTION FOR SOUND

@module EdgeCommons
@submodule Sound
@main EdgeCommons
**/
(function (EC) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = function () {
    };

    //------------------------------------
    // Public
    //------------------------------------
    C.VERSION = "0.0.2";
    C.soundManifest = null;

    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "EdgeCommons | Sound";
    var URL_CREATEJS_SOUNDJS = "http://code.createjs.com/soundjs-0.2.0.min.js";

    //------------------------------------
    // Methods
    //------------------------------------
    C.setup = function (manifest, callback) {
        try {
            // Argument manifest is not optional
            if (!manifest) {
                Log.error("Sound.setup() failed: manifest argument is not optional", LOG_GROUP);
                return;
            }
            // Set manifest
            this.soundManifest = manifest;
            // Setup SoundJS and load manifest
            var callbackSoundReady = function () {
                // Install SoundJS as a plugin, then PreloadJS will initialize it automatically.
                EC.Preload.preloader.installPlugin(SoundJS);

                //Available PreloadJS callbacks (Not in use so far)
                EC.Preload.preloader.onFileLoad = function (event) {
                    Log.debug("onFileLoad", LOG_GROUP);
                };
                EC.Preload.preloader.onComplete = function (event) {
                    Log.debug("onComplete", LOG_GROUP);
                };

                // Load manifest
                Log.debug("Loading Sound Manifest", "DEBUG", C.soundManifest);
                EC.Preload.preloader.loadManifest(C.soundManifest, true);
                if (callback) {
                    callback();
                }
            };

            // First load PreloadJS and then SoundJS (by CreateJS)
            if (!EC.Preload.preloader) {
                EC.Preload.setup(function () {
                    EC.loadScript(URL_CREATEJS_SOUNDJS, callbackSoundReady);
                });
            } else {
                EC.loadScript(URL_CREATEJS_SOUNDJS, callbackSoundReady);
            }
        } catch (error) {
            Log.error("Error in setup(): " + error.toString(), LOG_GROUP, error);
        }
    };

    /**
     * Play sound
     * @param soundId
     */
    C.play = function (soundId, completeCallback) {
        //SoundJS.FlashPlugin.BASE_PATH = "assets/" // Initialize the base path from this document to the Flash Plugin
        if (!SoundJS.checkPlugin(true)) {
            Log.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)", LOG_GROUP);
            return;
        }
        // Play Sound
        Log.debug("Playing sound: " + soundId, LOG_GROUP);
        var instance = SoundJS.play(soundId, SoundJS.INTERRUPT_NONE, 0, 0, false, 1);
        // Callback
        if (instance) {
            instance.onComplete = completeCallback;
        }
    };

    /**
     * Stop sound
     * @param soundId
     */
    C.stop = function (soundId, completeCallback) {
        if (!SoundJS.checkPlugin(true)) {
            Log.error("Error in SoundJS (SoundJS.checkPlugin(true) failed)", LOG_GROUP);
            return;
        }
        // Stop Sound
        Log.debug("Stopping sound: " + soundId, LOG_GROUP);
        var instance = SoundJS.stop(soundId);
    };

    //------------------------------------
    // Init
    //------------------------------------
    EC.Sound = C;
    //Log.debug("v" + C.VERSION, LOG_GROUP);

})(EdgeCommons);