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
 * Module: Experimental
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
    C.VERSION = "0.0.1a";
    C.compositions = {};
    
    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "EdgeCommons | Experimental";

    //------------------------------------
    // Methods
    //------------------------------------
    /**
     * Composition Loader
     * TEMP EXAMPLE:
     * var targetContainer = sym.getSymbol("targetContainer");
     * EC.Experimental.loadComposition("sub2.html", targetContainer)
	 *   .done( function(comp) {
     *      comp.getStage().$("mytext").html("hello number 2");
     *      comp.getStage().$('targetContainer').append("<hr/>HUHU  222<hr/>");
	 *   });
     */
    /*
    C.loadComposition = function(src, sym) {
        // Check arguments 
        if (!src || !sym) {
            Log.error( "Error in loadComposition(). Arguments 'src' and 'sym' are not optional.", LOG_GROUP );
            return;
        }
        try {
            // Inject IFrame
            var el = sym.getSymbolElement();
            var uniqueId = "ec_"+Math.random().toString(36).substring(7);
            el.html('<iframe id="'+uniqueId+'" src="'+src+'" style="overflow: hidden; width: 100%; height: 100%; margin: auto; border: 0 none;"></iframe>');
            // Create promise
            var promise = new jQuery.Deferred();
            
            // Wait for IFrame to be loaded
            var iframe = jQuery("#"+uniqueId);
            //EC.debug("iframe", LOG_GROUP, iframe);
            var innerWindow = iframe[0].contentWindow;
            //EC.debug("innerWindow", LOG_GROUP, innerWindow);
            iframe.load( function() {
                //EC.debug("iframe load done");
                // Wait for inner composition to be bootstrapped
                innerWindow.AdobeEdge.bootstrapCallback(function (compId) {
                    //EC.debug("Inner composition was bootstrapped: ", LOG_GROUP, compId);
                    // alpha: ignore compId (just one inner comp supported so far)
                    var innerComp = innerWindow.AdobeEdge.getComposition(compId);
                    //EC.debug("innerComp", LOG_GROUP, innerComp);
                    //innerComp.getStage().$('targetContainer').html("<hr/>TEST<hr/>");
                    promise.resolve(innerComp, innerWindow.AdobeEdge);
                });
            });
        } 
        catch (err) {
            EC.error("Error in loadComposition: ", LOG_GROUP, err.toString());
        }
        return promise;
    }
    */

    //-------------------------------------------    
    // Speed Control    
    //-------------------------------------------    
    C.SpeedControl = {};
    /**
     * TODO: recursive
     */
    C.SpeedControl.setSpeed = function(factor, sym, recursive) {
        //EC.debug("setSpeed: factor:", LOG_GROUP, factor);    
        
        $.each( sym.timelines["Default Timeline"].timeline, function(key, item) {
            if (typeof item.ec == 'undefined') {
                item.ec = {};
            }
            // Save old values
            if (typeof item.ec.oldPosition == 'undefined') {
                item.ec.originalPosition = item.position;
                item.ec.originalDuration = item.duration;
            }
            // Change position
            item.position = 1/factor * item.ec.originalPosition;
            // Change duration
            item.duration = 1/factor * item.ec.originalDuration;
            // Flush Cache
            sym._flushCache();
            
            
            EC.debug("setSpeed: factor:", LOG_GROUP, 1/factor);    
        });
        //sym._flushCache();
    }    
        
        
    //------------------------------------
    // Init
    //------------------------------------
    EC.Experimental = C;
    Log.debug("v" + C.VERSION, LOG_GROUP);

})(EdgeCommons);