/*
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

/*
 * Module: Spotlight
 * TODO: switch for type/media
 * TODO: config for background color
 */

/**
Spotlight: Overlay for media (e.g. YouTube) or external Edge Animate compositions

@module EdgeCommons
@submodule Spotlight
@main EdgeCommons
@class Spotlight
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
    C.VERSION = "0.0.1";
    C.compositions = {};
    
    //------------------------------------
    // Private
    //------------------------------------
    // Logger
    var Log = ModulogLog;
    var LOG_GROUP = "EdgeCommons | Spotlight";

    //------------------------------------
    // Methods
    //------------------------------------

    /**
    Open a spotlight overlay by passing in a configuration object
    @method open
    @param config {Object} The configuration object
    @param [documentContext=window.top.document] {Object} The parent context for the spotlight overlay (e.g. window.document or window.parent.document)
    @return {Boolean} returns <code>true</code> whenever the opening of the spotlight overlay was successfull otherwise <code>false</code>
    **/    
    C.open = function(config, documentContext) {
        try {
            // Check arguments 
            if (config.type != "youtube") {
                Log.error( "Error in open(). Spotlight only supports type 'youtube' in this version", LOG_GROUP );
                return;
            }
            if (documentContext == undefined) {                
                documentContext = window.top.document;
            }
            
            // Set defaults
            config.width = config.width || 400;
            config.height = config.height || 600;
            config.borderWidth = config.borderWidth || 5;
            config.borderColor = config.borderColor || "#FFF";
            
            // Add DOM elements
            var tpl = '<div id="spotlight"> <div class="background"> </div> </div>';
            $("body", documentContext).append(tpl);
            var tpl = '<div class="base"></div>';
            $("#spotlight .background", documentContext).append(tpl);
            var tpl = '<div class="close-button"></div>';
            $("#spotlight .background", documentContext).append(tpl);
            
            // Place close button
            var closeButton = $("#spotlight .close-button", documentContext);
            closeButton.css("margin-left", (0.5*config.width) - 15 + (config.borderWidth) )
                .css("margin-top", (-0.5*config.height) - 15 );
                
            // Set width and height and center
            var base = $("#spotlight .base", documentContext);
            base.css("width", 0)
                .css("height", 0)
                .css("margin-left", 0)
                .css("margin-top", 0)
                .css("border-width", config.borderWidth)
                .css("border-color", config.borderColor)
                .css("border-radius", 5);
            
            base.animate({
                    width: config.width,
                    "margin-left": -0.5 * config.width,
                    height: config.height,
                    "margin-top": -0.5 * config.height
                },
                400,
                "easeOutBack",
                function() {
                    $("#spotlight .content", documentContext).css("display", "inline");
                    $("#spotlight .fader", documentContext).fadeOut(2000);
                    $("#spotlight .close-button", documentContext).fadeIn();
                }
            );
            
            // Inject content
            base.append('<div class="content"></div>');
            var content = $("#spotlight .content", documentContext);
            
            // TODO: switch for type/media
            content.append('<iframe width="'+config.width+'" height="'+config.height+'" '
                +'src="http://www.youtube.com/embed/'+config.param.media+'?autoplay='+((config.param && config.param.autoplay)?"1":"0")+'" '
                +'frameborder="0" allowfullscreen></iframe>');
            /*
            content.append('<img src="Dave.jpg" />');
            */
            content.append('<div class="fader"></div>');
            var fader = $("#spotlight .fader", documentContext);
            
            // On click
            $("#spotlight .background", documentContext).click( function() {
                EC.Spotlight.close( config, documentContext );
            });
            return true;
        }
        catch( err ) {
            Log.error(err.toString());
            return false;
        }
    };
     
    /**
    Close an existing spotlight overlay  
    (This function usually gets called by the internal close button)
    @method close
    @param [documentContext=window.top.document] {Object} The parent context for the spotlight overlay (e.g. window.document or window.parent.document)
    **/     
    C.close = function(config, documentContext) {
        if (documentContext == undefined) {                
            documentContext = window.top.document;
        }
        
        $("#spotlight .content", documentContext).remove();
        $("#spotlight .close-button", documentContext).remove();
        $("#spotlight .background", documentContext).fadeOut(400);
        
        var base = $("#spotlight .base", documentContext);
        base.animate({
                width: 0,
                "margin-left": 0,
                height: 0,
                "margin-top": 0,
                opacity: 0
            },
            400,
            "easeOutCubic",
            function() {
                $("#spotlight", documentContext).remove();
            }
        );        
    }
        
    //------------------------------------
    // Init
    //------------------------------------
    EC.Spotlight = C;
    //Log.debug("v" + C.VERSION, LOG_GROUP);

})(EdgeCommons);