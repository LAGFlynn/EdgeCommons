/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};


var resources = [
];
var symbols = {
"stage": {
   version: "1.0.0",
   minimumCompatibleVersion: "0.1.7",
   build: "1.0.0.180",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   resizeInstances: false,
   content: {
         dom: [
         {
            id:'RoundRect',
            type:'rect',
            rect:['11px','13px','527px','373px','auto','auto'],
            borderRadius:["20px 20px","20px 20px","20px 20px","20px 20px"],
            fill:["rgba(192,192,192,1)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            boxShadow:["inset",3,3,170,0,"rgba(0,0,0,0.65)"]
         },
         {
            id:'RoundRect2',
            type:'rect',
            rect:['83px','152px','100px','100px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["10px 10px","10px 10px","10px 10px","10px 10px"],
            fill:["rgba(0,165,246,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            c:[
            {
               id:'TextCopy2',
               type:'text',
               rect:['0px','35px','100px','44px','auto','auto'],
               text:"Bassdrum",
               align:"center",
               font:['Arial, Helvetica, sans-serif',18,"rgba(255,255,255,1.00)","700","none",""]
            }]
         },
         {
            id:'RoundRect2Copy',
            type:'rect',
            rect:['193px','152px','100px','100px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["10px 10px","10px 10px","10px 10px","10px 10px"],
            fill:["rgba(0,165,246,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            c:[
            {
               id:'TextCopy3',
               type:'text',
               rect:['0px','35px','100px','44px','auto','auto'],
               text:"Snaredrum",
               align:"center",
               font:['Arial, Helvetica, sans-serif',18,"rgba(255,255,255,1.00)","700","none",""]
            }]
         },
         {
            id:'RoundRect2Copy2',
            type:'rect',
            rect:['366px','152px','100px','69px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["10px 10px","10px 10px","10px 10px","10px 10px"],
            fill:["rgba(207,2,2,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            c:[
            {
               id:'Text',
               type:'text',
               rect:['0px','11px','100px','58px','auto','auto'],
               text:"Play<br>Song",
               align:"center",
               font:['Arial, Helvetica, sans-serif',18,"rgba(255,255,255,1.00)","700","none",""]
            }]
         },
         {
            id:'RoundRect2Copy3',
            type:'rect',
            rect:['366px','227px','100px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["10px 10px","10px 10px","10px 10px","10px 10px"],
            fill:["rgba(113,0,0,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            c:[
            {
               id:'TextCopy',
               type:'text',
               rect:['0px','2px','100px','23px','auto','auto'],
               text:"Stop",
               align:"center",
               font:['Arial, Helvetica, sans-serif',18,"rgba(255,255,255,1.00)","700","none",""]
            }]
         },
         {
            id:'Rectangle',
            type:'rect',
            rect:['330px','124px','2px','165px','auto','auto'],
            fill:["rgba(192,192,192,1)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            boxShadow:["",0,0,16,0,"rgba(0,0,0,0.65)"]
         },
         {
            id:'Text2',
            type:'text',
            rect:['28px','26px','auto','auto','auto','auto'],
            text:"Sound Machine with EdgeCommons",
            align:"center",
            font:['Arial, Helvetica, sans-serif',12,"rgba(255,255,255,1)","100","none","normal"],
            textShadow:["rgba(0,0,0,0.65)",0,0,3]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_RoundRect}": [
            ["style", "border-top-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["subproperty", "boxShadow.blur", '170px'],
            ["style", "border-bottom-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "left", '11px'],
            ["style", "top", '13px'],
            ["style", "border-bottom-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["subproperty", "boxShadow.inset", 'inset'],
            ["subproperty", "boxShadow.color", 'rgba(0,0,0,0.65)'],
            ["subproperty", "boxShadow.offsetV", '3px'],
            ["subproperty", "boxShadow.offsetH", '3px'],
            ["style", "border-top-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ]
         ],
         "${_RoundRect2Copy}": [
            ["color", "background-color", 'rgba(0,165,246,1.00)'],
            ["style", "border-top-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '100px'],
            ["style", "top", '152px'],
            ["style", "border-bottom-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '100px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '193px']
         ],
         "${_RoundRect2Copy3}": [
            ["color", "background-color", 'rgba(113,0,0,1.00)'],
            ["style", "border-top-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '100px'],
            ["style", "top", '227px'],
            ["style", "border-bottom-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '366px']
         ],
         "${_Text2}": [
            ["style", "top", '26px'],
            ["subproperty", "textShadow.offsetH", '0px'],
            ["subproperty", "textShadow.color", 'rgba(0,0,0,0.65)'],
            ["subproperty", "textShadow.blur", '3px'],
            ["subproperty", "textShadow.offsetV", '0px'],
            ["style", "font-weight", '100'],
            ["style", "left", '28px'],
            ["style", "font-size", '12px']
         ],
         "${_TextCopy}": [
            ["style", "top", '2px'],
            ["style", "text-align", 'center'],
            ["style", "height", '23px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-weight", '700'],
            ["style", "left", '0px'],
            ["style", "font-size", '18px']
         ],
         "${_TextCopy3}": [
            ["style", "top", '35px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1)'],
            ["style", "height", '44px'],
            ["style", "font-weight", 'bold'],
            ["style", "left", '0px'],
            ["style", "font-size", '18px']
         ],
         "${_Text}": [
            ["style", "top", '11px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "height", '58px'],
            ["style", "font-weight", '700'],
            ["style", "left", '0px'],
            ["style", "font-size", '18px']
         ],
         "${_TextCopy2}": [
            ["style", "top", '35px'],
            ["style", "text-align", 'center'],
            ["style", "height", '44px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-weight", '700'],
            ["style", "left", '0px'],
            ["style", "font-size", '18px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "width", '550px'],
            ["style", "height", '400px'],
            ["style", "overflow", 'hidden']
         ],
         "${_Rectangle}": [
            ["style", "top", '124px'],
            ["subproperty", "boxShadow.blur", '16px'],
            ["style", "left", '330px'],
            ["subproperty", "boxShadow.offsetV", '0px'],
            ["subproperty", "boxShadow.offsetH", '0px'],
            ["subproperty", "boxShadow.color", 'rgba(0,0,0,0.65)']
         ],
         "${_RoundRect2Copy2}": [
            ["color", "background-color", 'rgba(207,2,2,1.00)'],
            ["style", "border-top-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '100px'],
            ["style", "top", '152px'],
            ["style", "border-bottom-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '69px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '366px']
         ],
         "${_RoundRect2}": [
            ["color", "background-color", 'rgba(0,165,246,1.00)'],
            ["style", "border-top-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '100px'],
            ["style", "top", '152px'],
            ["style", "border-bottom-left-radius", [10,10], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '100px'],
            ["style", "cursor", 'pointer'],
            ["style", "left", '83px']
         ]
      }
   },
   timelines: {
      "Default Timeline": {
         fromState: "Base State",
         toState: "",
         duration: 0,
         autoPlay: true,
         timeline: [
         ]
      }
   }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-442688756");
