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
    var C = EC;

    //------------------------------------
    // Public
    //------------------------------------
    
    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var LOG_GROUP = "EdgeCommons | Experimental";

    //------------------------------------
    // Methods
    //------------------------------------
   

    //-------------------------------------------    
    // Core: getSymbolName    
    // if name should be used in sym.getSymbol(NAME) the preceding "#" is necessary
    //-------------------------------------------   
    C.getSymbolName = function(sym) {
        // Old version (doesn't always work)
        //return sym.element.selector.replace("#"+sym.getParentSymbol().element[0].id+"_", "");
        var name = sym.getVariable("symbolSelector"); // still with #
        var paraentSymbol = sym.getParentSymbol();
        if (paraentSymbol) {
            name = name.replace(paraentSymbol.getVariable("symbolSelector")+"_", "");
        }
        name = name.replace("#", "");
        return name;
    };
    
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
    };    
        
        
    //------------------------------------
    // Init
    //------------------------------------
    //Log.debug("", LOG_GROUP);

})(EdgeCommons);