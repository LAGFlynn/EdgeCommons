/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
   fonts['"Glegoo", serif']='<link href=\'http://fonts.googleapis.com/css?family=Glegoo\' rel=\'stylesheet\' type=\'text/css\'>';


var resources = [
];
var symbols = {
"stage": {
   version: "0.1.6",
   build: "0.11.0.809",
   baseState: "Base State",
   initialState: "Base State",
   gpuAccelerate: false,
   content: {
         dom: [
         {
            id:'Background',
            type:'image',
            rect:['0','0','900px','600px','auto','auto'],
            fill:["rgba(0,0,0,0)",im+"Background.png"]
         },
         {
            id:'RoundRect',
            type:'rect',
            rect:['48px','98px','198px','190px','auto','auto'],
            borderRadius:["0px 0px","20px 20px","20px 20px","20px 20px"],
            fill:["rgba(164,164,164,1.00)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[['-1px','10px']]
         },
         {
            id:'RoundRectCopy',
            type:'rect',
            rect:['48px','98px','198px','190px','auto','auto'],
            borderRadius:["0px 0px","20px 20px","20px 20px","20px 20px"],
            fill:["rgba(255,255,255,1.00)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[['-6px','5px']]
         },
         {
            id:'Text',
            type:'text',
            rect:['59','125','auto','auto','auto','auto'],
            text:"Sound",
            align:"auto",
            font:['"Glegoo", serif',16,"rgba(0,0,0,1)","normal","none","normal"],
            transform:[['-6px','-11px']]
         },
         {
            id:'btnSoundBass',
            type:'rect',
            rect:['53px','192px','80px','80px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(62,62,62,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['0','1px']],
            c:[
            {
               id:'Text2Copy',
               type:'text',
               rect:['117','174','51px','17px','auto','auto'],
               text:"Bass",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-103px','-143px']]
            }]
         },
         {
            id:'btnSoundSetup',
            type:'rect',
            rect:['53px','192px','173px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(52,52,52,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['0','-31px']],
            c:[
            {
               id:'Text2',
               type:'text',
               rect:['117','174','136px','17px','auto','auto'],
               text:"Setup Sound first",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-98px','-170px']]
            }]
         },
         {
            id:'btnSoundSnare',
            type:'rect',
            rect:['53px','192px','80px','80px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(62,62,62,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['93px','1px']],
            c:[
            {
               id:'Text2Copy2',
               type:'text',
               rect:['117','174','61px','17px','auto','auto'],
               text:"Snare",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-108px','-143px']]
            }]
         },
         {
            id:'RoundRectCopy3',
            type:'rect',
            rect:['48px','98px','198px','253px','auto','auto'],
            borderRadius:["0px 0px","20px 20px","20px 20px","20px 20px"],
            fill:["rgba(164,164,164,1.00)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[['243px','10px']]
         },
         {
            id:'RoundRectCopy2',
            type:'rect',
            rect:['48px','98px','198px','253px','auto','auto'],
            borderRadius:["0px 0px","20px 20px","20px 20px","20px 20px"],
            fill:["rgba(255,255,255,1.00)"],
            stroke:[0,"rgba(0,0,0,1)","none"],
            transform:[['238px','5px']]
         },
         {
            id:'TextCopy',
            type:'text',
            rect:['59','125','auto','auto','auto','auto'],
            text:"Configuration",
            align:"auto",
            font:['"Glegoo", serif',16,"rgba(0,0,0,1)","normal","none","normal"],
            transform:[['238px','-11px']]
         },
         {
            id:'btnInitConfiguration',
            type:'rect',
            rect:['53px','192px','173px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(52,52,52,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['245px','-43px']],
            c:[
            {
               id:'Text2Copy4',
               type:'text',
               rect:['117','174','136px','17px','auto','auto'],
               text:"Init Configuration",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-98px','-170px']]
            }]
         },
         {
            id:'btnInitConfigurationCopy',
            type:'rect',
            rect:['53px','192px','173px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(52,52,52,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['245px','108px']],
            c:[
            {
               id:'Text2Copy6',
               type:'text',
               rect:['117','174','166px','17px','auto','auto'],
               text:"Init ext. Configuration",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-113px','-170px']]
            }]
         },
         {
            id:'btnGetConfigUrl',
            type:'rect',
            rect:['53px','192px','173px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(52,52,52,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['245px','-14px']],
            c:[
            {
               id:'Text2Copy3',
               type:'text',
               rect:['117','174','136px','17px','auto','auto'],
               text:"get url",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-98px','-170px']]
            }]
         },
         {
            id:'btnGetConfigFirstname',
            type:'rect',
            rect:['53px','192px','173px','25px','auto','auto'],
            cursor:['pointer'],
            borderRadius:["5px 5px","5px 5px","5px 5px","5px 5px"],
            fill:["rgba(52,52,52,1.00)"],
            stroke:[0,"rgb(0, 0, 0)","none"],
            transform:[['245px','42px']],
            c:[
            {
               id:'Text2Copy5',
               type:'text',
               rect:['117','174','136px','17px','auto','auto'],
               text:"get user.firstname",
               align:"center",
               font:['"Glegoo", serif',14,"rgba(255,255,255,1.00)","normal","none","normal"],
               transform:[['-98px','-170px']]
            }]
         },
         {
            id:'txtConfigUrl',
            type:'text',
            rect:['297px','224px','173px','20px','auto','auto'],
            text:"*url*",
            align:"center",
            font:['Glegoo, serif',12,"rgba(0,131,255,1.00)","normal","none","normal"],
            transform:[['1px','-17px']]
         },
         {
            id:'txtConfigFirstname',
            type:'text',
            rect:['297px','224px','173px','20px','auto','auto'],
            text:"*user.firstname*",
            align:"center",
            font:['Glegoo, serif',12,"rgba(0,131,255,1.00)","normal","none","normal"],
            transform:[['1px','39px']]
         },
         {
            id:'txtConfigTestUrl',
            type:'text',
            rect:['297px','224px','173px','20px','auto','auto'],
            text:"*testUrl*",
            align:"center",
            font:['Glegoo, serif',12,"rgba(0,131,255,1.00)","normal","none","normal"],
            transform:[['1px','106px']]
         }],
         symbolInstances: [

         ]
      },
   states: {
      "Base State": {
         "${_RoundRect}": [
            ["color", "background-color", 'rgba(164,164,164,1.00)'],
            ["style", "border-top-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '-1px'],
            ["style", "border-bottom-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '198px'],
            ["style", "border-bottom-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '190px'],
            ["transform", "translateY", '10px']
         ],
         "${_RoundRectCopy3}": [
            ["color", "background-color", 'rgba(164,164,164,1.00)'],
            ["style", "border-top-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '243px'],
            ["style", "border-bottom-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '198px'],
            ["style", "border-bottom-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '253px'],
            ["transform", "translateY", '10px']
         ],
         "${_Text2}": [
            ["style", "font-size", '14px'],
            ["transform", "translateX", '-98px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "height", '17px'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-170px'],
            ["style", "width", '136px']
         ],
         "${_Text2Copy2}": [
            ["style", "font-size", '14px'],
            ["transform", "translateX", '-108px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "height", '17px'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-143px'],
            ["style", "width", '61px']
         ],
         "${_txtConfigTestUrl}": [
            ["color", "color", 'rgba(0,131,255,1.00)'],
            ["transform", "translateY", '106px'],
            ["transform", "translateX", '1px'],
            ["style", "font-size", '12px']
         ],
         "${_btnSoundSetup}": [
            ["color", "background-color", 'rgba(52,52,52,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '173px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["transform", "translateY", '-31px'],
            ["style", "cursor", 'pointer']
         ],
         "${_btnGetConfigFirstname}": [
            ["color", "background-color", 'rgba(52,52,52,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '245px'],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '173px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["transform", "translateY", '42px'],
            ["style", "cursor", 'pointer']
         ],
         "${_btnInitConfigurationCopy}": [
            ["color", "background-color", 'rgba(52,52,52,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '245px'],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '173px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["transform", "translateY", '108px'],
            ["style", "cursor", 'pointer']
         ],
         "${_btnGetConfigUrl}": [
            ["color", "background-color", 'rgba(52,52,52,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '245px'],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '173px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["transform", "translateY", '-14px'],
            ["style", "cursor", 'pointer']
         ],
         "${_Text2Copy3}": [
            ["style", "font-size", '14px'],
            ["transform", "translateX", '-98px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "height", '17px'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-170px'],
            ["style", "width", '136px']
         ],
         "${_RoundRectCopy}": [
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "border-top-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '-6px'],
            ["style", "border-bottom-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '198px'],
            ["style", "border-bottom-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '190px'],
            ["transform", "translateY", '5px']
         ],
         "${_Text2Copy5}": [
            ["style", "width", '136px'],
            ["style", "text-align", 'center'],
            ["transform", "translateX", '-98px'],
            ["style", "height", '17px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-170px'],
            ["style", "font-size", '14px']
         ],
         "${_btnSoundBass}": [
            ["color", "background-color", 'rgba(62,62,62,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '80px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '80px'],
            ["transform", "translateY", '1px'],
            ["style", "cursor", 'pointer']
         ],
         "${_Text2Copy4}": [
            ["style", "width", '136px'],
            ["style", "text-align", 'center'],
            ["transform", "translateX", '-98px'],
            ["style", "height", '17px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-170px'],
            ["style", "font-size", '14px']
         ],
         "${_Text2Copy6}": [
            ["style", "font-size", '14px'],
            ["transform", "translateX", '-113px'],
            ["style", "text-align", 'center'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "height", '17px'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-170px'],
            ["style", "width", '166px']
         ],
         "${_Text2Copy}": [
            ["style", "width", '51px'],
            ["style", "text-align", 'center'],
            ["transform", "translateX", '-103px'],
            ["style", "height", '17px'],
            ["color", "color", 'rgba(255,255,255,1.00)'],
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-143px'],
            ["style", "font-size", '14px']
         ],
         "${_btnSoundSnare}": [
            ["color", "background-color", 'rgba(62,62,62,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '93px'],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '80px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '80px'],
            ["transform", "translateY", '1px'],
            ["style", "cursor", 'pointer']
         ],
         "${_txtConfigUrl}": [
            ["color", "color", 'rgba(0,131,255,1.00)'],
            ["transform", "translateX", '1px'],
            ["transform", "translateY", '-17px'],
            ["style", "font-size", '12px']
         ],
         "${_RoundRectCopy2}": [
            ["color", "background-color", 'rgba(255,255,255,1.00)'],
            ["style", "border-top-left-radius", [0,0], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '238px'],
            ["style", "border-bottom-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '198px'],
            ["style", "border-bottom-left-radius", [20,20], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '253px'],
            ["transform", "translateY", '5px']
         ],
         "${_Text}": [
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-11px'],
            ["transform", "translateX", '-6px']
         ],
         "${_Stage}": [
            ["color", "background-color", 'rgba(255,255,255,1)'],
            ["style", "height", '600px'],
            ["style", "width", '900px']
         ],
         "${_txtConfigFirstname}": [
            ["color", "color", 'rgba(0,131,255,1.00)'],
            ["transform", "translateX", '1px'],
            ["transform", "translateY", '39px'],
            ["style", "font-size", '12px']
         ],
         "${_TextCopy}": [
            ["style", "font-family", '"Glegoo", serif'],
            ["transform", "translateY", '-11px'],
            ["transform", "translateX", '238px']
         ],
         "${_btnInitConfiguration}": [
            ["color", "background-color", 'rgba(52,52,52,1.00)'],
            ["style", "border-top-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["transform", "translateX", '245px'],
            ["style", "border-bottom-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "border-top-right-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "width", '173px'],
            ["style", "border-bottom-left-radius", [5,5], {valueTemplate:'@@0@@px @@1@@px'} ],
            ["style", "height", '25px'],
            ["transform", "translateY", '-43px'],
            ["style", "cursor", 'pointer']
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
})(jQuery, AdobeEdge, "EDGE-730860926");
