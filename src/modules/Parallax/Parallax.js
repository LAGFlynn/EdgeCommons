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
 * Module: Parallax
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
    C.compositions = {};
    
    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "EdgeCommons | Parallax";

    //------------------------------------
    // Methods
    //------------------------------------
    /**
     * Add composition to parallax watcher
     */
    C.addComposition = function(compId) {
        // calculate static composition values
        this.compositions[compId] = {};
        var stage = AdobeEdge.getComposition(compId).getStage();
        this.compositions[compId].stage = stage;
        var stageElement = AdobeEdge.getComposition(compId).getStage().getSymbolElement();
        this.compositions[compId].stageElement = stageElement;
        var stageHeight = stageElement.height();
        this.compositions[compId].stageHeight = stageHeight;
        var stageTop = stageElement.position().top;
        this.compositions[compId].stageTop = stageTop;
        this.compositions[compId].stageMiddle = Math.floor( (stageTop + stageHeight/2) );        
        this.compositions[compId].duration = stage.getDuration();
        
        // Stop timeline (override autoplay)
        stage.stop(0);
    }
        
    /**
     * Setup Parallax
     */
    C.setup = function(sym) {
        // Check arguments 
        if (!sym) {
            Log.error( "Error in setup(). Argument 'sym' is not optional.", LOG_GROUP );
            return;
        }
        // Add composition to list (currently only one composition is supported)
        this.addComposition( sym.getComposition().compId );
        
        // Add listener for scroll event on document
        //var throttleIndex = throttleIndexInitial = 2;
        $( document ).scroll( function() {
            // Throttle (disabled)
            //if (throttleIndex != 0) {
            //    throttleIndex--;
            //    return;
            //}
            //throttleIndex = throttleIndexInitial;
        
            var scrollTop = $(document).scrollTop();
    
            // Update all compositions
            $.each( EC.Parallax.compositions, function(compId, c) {
                // Calculate new playhead position
                var percentage = scrollTop / ( c.stageHeight - $(window).height() );
                var playheadPos = Math.floor( percentage * c.duration );
                c.stage.stop( playheadPos );
            });
        });
    }

    //------------------------------------
    // Init
    //------------------------------------
    EC.Parallax = C;
    //Log.debug("v" + C.VERSION, LOG_GROUP);

})(EdgeCommons);