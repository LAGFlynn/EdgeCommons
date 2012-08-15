/***********************
* Adobe Edge Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindElementAction(compId, symbolName, "document", "compositionReady", function(sym, e) {
         //yepnope({load: "http://simonwidjaja.github.com/EdgeCommons/live/EdgeCommons-0.3.0.js"});
         yepnope({load: "http://localhost/Aktiv/Intern/EdgeCommons/GitHub/master/sprint/EdgeCommons-Sprint-0.0.3.js"});

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnSoundSetup}", "click", function(sym, e) {
          try {
         	//------------------------
         	// Sound Demo: Setup
         	//------------------------
         	EC.info("Setup Sound", "DEMO");
         	
         	// Load Sound Manifest
         	var assetsPath = "media/";
         	EC.Sound.setup(        
         		[
         			{src: assetsPath + "bassdrum.mp3|" + assetsPath + "bassdrum.ogg", id: "bassdrum"},
         			{src: assetsPath + "snaredrum.mp3|" + assetsPath + "snaredrum.ogg", id: 'snaredrum'}
         		], 
         		function(){ EC.info("Sound setup finished", "DEMO"); }
         	);
         	
         	// Play Sound
         	EC.Sound.play("bassdrum");
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnSoundBass}", "click", function(sym, e) {
          try {
         	//------------------------
         	// Sound Demo (Play)
         	//------------------------
         	EC.info("Playing Sound", "DEMO");
         	
         	// Play Sound
         	EC.Sound.play("bassdrum");
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnSoundSnare}", "click", function(sym, e) {
          try {
         	//------------------------
         	// Sound Demo (Play)
         	//------------------------
         	EC.info("Playing Sound", "DEMO");
         	
         	// Play Sound
         	EC.Sound.play("snaredrum");
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnInitConfiguration}", "click", function(sym, e) {
          try {
         	//------------------------
         	// Init Configuration
         	//------------------------
         	EC.info("Init configuration", "DEMO");
         	
         	EC.Config.init({
         		url: "http://www.some-url.com",
         		user: {
         			firstname: "Simon",
         			lastname: "Widjaja"
         		}
         	});
         
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnGetConfigUrl}", "click", function(sym, e) {
          try {
         	var url = EC.Config.get( "url" );
         	sym.$("txtConfigUrl").html( url );
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnGetConfigFirstname}", "click", function(sym, e) {
          try {
         	var url = EC.Config.get( "user.firstname" );
         	sym.$("txtConfigFirstname").html( url );
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_btnInitConfigurationCopy}", "click", function(sym, e) {
          try {
         	//------------------------
         	// Init Configuration
         	//------------------------
         	EC.info("Init configuration", "DEMO");
         	
         	EC.Config.init("config.json", function() {
         		EC.info( "External config is ready" );
         		var testUrl = EC.Config.get( "testUrl" );
         		sym.$("txtConfigTestUrl").html( testUrl );
         	});
         
          }
          catch(error) {
         	EC.info(error.toString(), "ERROR");
          }

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

})(jQuery, AdobeEdge, "EDGE-730860926");