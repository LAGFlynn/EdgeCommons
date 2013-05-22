// EdgeCommons v1.0.1 +++ Visit edgecommons.org for documentation, updates and examples +++ Copyright (c) 2013 by Simon Widjaja +++ Distributed under the terms of the MIT license (http://www.opensource.org/licenses/mit-license.html) +++ This notice shall be included in all copies or substantial portions of the Software.
// Input 0
(function(e){var b=function(){};b.VERSION="1.0.0";b.compositions={};var f=e.$,g=ModulogLog;b.addComposition=function(a){this.compositions[a]={};var b=AdobeEdge.getComposition(a).getStage();this.compositions[a].stage=b;var c=AdobeEdge.getComposition(a).getStage().getSymbolElement();this.compositions[a].stageElement=c;var d=c.height();this.compositions[a].stageHeight=d;c=c.position().top;this.compositions[a].stageTop=c;this.compositions[a].stageMiddle=Math.floor(c+d/2);this.compositions[a].duration=
b.getDuration();b.stop(0)};b.setup=function(a){a?(this.addComposition(a.getComposition().compId),f(document).scroll(function(){var a=f(document).scrollTop();f.each(e.Parallax.compositions,function(b,d){var e=a/(d.stageHeight-f(window).height());d.stage.stop(Math.floor(e*d.duration))})})):g.error("Error in setup(). Argument 'sym' is not optional.","EdgeCommons | Parallax")};e.Parallax=b})(EdgeCommons);
