/***********************
* Adobe Edge Animate-Aktionen für Composition
*
* Bearbeiten Sie diese Datei mit Vorsicht. Achten Sie darauf, dass 
* Funktionssignaturen und Kommentare, die mit „Edge“ anfangen, beibehalten werden, 
* damit Sie mit diesen Aktionen weiterhin in Adobe Edge Animate interagieren können.
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // Aliase für häufig verwendete Edge-Klassen

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindSymbolAction(compId, symbolName, "creationComplete", function(sym, e) {
         try {
         	yepnope({
         		load: "http://simonwidjaja.github.com/EdgeCommons/live/EdgeCommons-0.6.0.js",
         		callback: function() {
         
         
         	// Load sound manifest (e.g. in creationComplete)
         	var assetsPath = "media/";
         	EC.Sound.setup(
         		 [
         			  {src: assetsPath + "bassdrum.mp3|" + assetsPath + "bassdrum.ogg", id: "bassdrum"},
         			  {src: assetsPath + "snaredrum.mp3|" + assetsPath + "snaredrum.ogg", id: 'snaredrum'},
         			  {src: assetsPath + "the_womb_demons_out.mp3|" + assetsPath + "the_womb_demons_out.ogg", id: 'the_womb_demons_out'}
         		 ],
         		 function(){ EC.info("Sound setup finished", "DEMO"); }
         	);
         
         
         			}
         	});
         }
         catch(error) {
         	console.error("sw", error);
         }

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_RoundRect2}", "click", function(sym, e) {
         EC.Sound.play("bassdrum");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_RoundRect2Copy}", "click", function(sym, e) {
EC.Sound.play("snaredrum");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_RoundRect2Copy2}", "click", function(sym, e) {
         // Sound by "The Womb"
         // Written & performed by: Alan Driscoll With Penny Walker-Keefe
         // http://23seconds.org/072.htm
         EC.Sound.play("the_womb_demons_out");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${_RoundRect2Copy3}", "click", function(sym, e) {
         EC.Sound.stop("the_womb_demons_out");
         

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

})(jQuery, AdobeEdge, "EDGE-442688756");