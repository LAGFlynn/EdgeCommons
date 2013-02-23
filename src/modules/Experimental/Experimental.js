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

/**
TODO: DESCRIPTION FOR EXPERIMENTAL

@module EdgeCommons
@submodule Experimental
@main EdgeCommons
**/
(function (EC) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var C = EC;

    //------------------------------------
    // Public
    //------------------------------------
    C.Experimental = {}; 
    C.Experimental.VERSION = "0.0.3";
    
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
        var name = sym.getVariable("symbolSelector"); // still with #
        var paraentSymbol = sym.getParentSymbol();
        if (paraentSymbol) {
            name = name.replace(paraentSymbol.getVariable("symbolSelector")+"_", "");
        }
        name = name.replace("#", "");
        return name;
    };
    
    
    //-------------------------------------------    
    // SVG
    //-------------------------------------------
    /*
		EC.accessSVG( sym.$("pie") )
			.done(function(svgDocument, svgElement, uniqueId){
				EC.debug("DONE");
				var el = svgDocument.getElementById("Cyan");
				$(el).attr({fill: "#000"});
				$(el).click(function(){
					alert("DYNAMIC CLICK ON INNER PATH");
				});				
			});    
    */
    C.accessSVG = function(element) {
        if (element.is("div")) {
			var imgSrc = element.css("background-image").replace("url(","").replace(")","");
			// Remove "" in IE
			imgSrc = imgSrc.replace("\"", "");
		}
		//TODO: Check if is SVG

		// Replace with real SVG
		// TODO: improve flicker (maybe set invisible during loading and wait for complete)
		element.css("background-image", "");
        var uniqueId = "ec_"+Math.random().toString(36).substring(7);
		element.append('<embed id="'+uniqueId+'" src="'+imgSrc+'" type="image/svg+xml" width="100%" height="100%" />');
        
		// Create promise
		var promise = new jQuery.Deferred();

		// Wait for Embed to be loaded
		//var embed = jQuery("#svgEmbed");
        
        var svgElement = document.getElementById(uniqueId);

		svgElement.onload = function() {
            var svgDocument = svgElement.getSVGDocument();
			// TODO return id
			promise.resolve( svgDocument, svgElement, uniqueId );
		};
        
        return promise;
    }
    /*
		// Existing SVG

		var svgOriginEl = sym.$("pie");
		if (svgOriginEl.is("div")) {
			var imgSrc = svgOriginEl.css("background-image").replace("url(","").replace(")","");
			// Remove "" in IE
			imgSrc = imgSrc.replace("\"", "");
		}
		//TODO: Check if is SVG
		console.log("imgSrc: ", imgSrc);

		// Replace with real SVG
		// TODO: improve flicker (maybe set invisible during loading and wait for complete)
		svgOriginEl.css("background-image", "");
		//svgOriginEl.append('<embed id="svgEmbed" src="'+imgSrc+'" type="image/svg+xml" />');
		svgOriginEl.append('<embed id="svgEmbed" src="'+imgSrc+'" type="image/svg+xml" />');


		// Create promise
		var promise = new jQuery.Deferred();

		// Wait for Embed to be loaded
		var embed = jQuery("#svgEmbed");
		//var innerWindow = iframe[0].contentWindow;


		document.getElementById("svgEmbed").onload = function() {
			console.log("embed ready (workaround)");
			//debugger;
			var svgDoc = document.getElementById("svgEmbed").getSVGDocument()
			var el = svgDoc.getElementById("Cyan");
			$(el).attr({fill: "#F00"});
			$(el).click(function(){
				alert("DYNAMIC CLICK ON INNER PATH");
			});
			// TODO return id
			promise.resolve();
		};
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
    };    
        
        
    //------------------------------------
    // Init
    //------------------------------------
    //Log.debug("", LOG_GROUP);

})(EdgeCommons);