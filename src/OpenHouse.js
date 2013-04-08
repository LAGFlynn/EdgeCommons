/*
 * EdgeCommons
 * Dirty little Helpers for Adobe Edge Animate
 * by Simon Widjaja
 *
 * Additional Contributors:
 * Timm Jansen, Johannes Boyne
 *
 * Copyright (c) 2013 Simon Widjaja
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
TODO: DESCRIPTION FOR OPEN HOUSE

@module OpenHouse
**/
(function (window, $) {
    //------------------------------------
    // Constructor
    //------------------------------------
    var OpenHouse = function () {
    };

    //------------------------------------
    // Public
    //------------------------------------
    OpenHouse.VERSION = "0.0.1";

    //------------------------------------
    // Private
    //------------------------------------
    var LOG_GROUP = "OpenHouse";

    //------------------------------------
    // Methods
    //------------------------------------
    OpenHouse.showActions = function(filename) {
        try {
            //TODO:
            // - check: filename is not optional
            // - check: filename with or without "_edgeActions.js"
            $.get(filename)
                .done(function(data) {
                    var fileContent = data;
                    
                    // Define Start
                    var startString = "\/\/Edge symbol: 'stage'(.|\n)*function[\(]symbolName[\)] \{";
                    // Define End
                    var endString = '}[\)][\(]"stage"[\)]';
                    
                    var expression = startString+'(.|\n)*'+endString;
                    var symbolsString = fileContent.match( expression, 'gm' );
                    
                    symbolsString = symbolsString[0];
                    
                    symbolsString = symbolsString.replace( new RegExp(startString), "" ); 
                    symbolsString = symbolsString.replace( new RegExp(endString), "" ); 
                    
                    //console.log(symbolsString);
                })
                .fail(function() { console.error("error"); })
                .always(function() { /*alert("finished");*/ });;
        }
        catch( err ) {
            console.error(err.toString());
        }    
    }

    //------------------------------------
    // Init
    //------------------------------------
    window.OpenHouse = OpenHouse;
    //Log.debug("v" + VERSION, LOG_GROUP);

})(window, jQuery);
