import * as d3 from 'd3';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'




const getLeftRightSide = function (texts, listEngls) {
    var left = [];
    var right = [];
    for (let index = 0; index < listEngls.length; index++) {
        const element = listEngls[index];
        ////console.log("middle:", element.middle,texts[index]);

        if (element.middle <= Math.PI )  {
            left.push(texts[index]);
        } else
            right.push(texts[index]);
    }
    return [left, right];
}



export const PRISM = function(svg){
    
       let overlappfs = new OverlapText();
    var texts = svg.selectAll("text")._groups[0];
    var textAres = overlappfs.GetBordersPFS( texts);
    var textsCenters = overlappfs.getCenters(textAres);
    var radious = overlappfs.getRadious(textsCenters);
    var WidthTexts = overlappfs.getWidths(textAres);
    var i = 0 ;
    var l = 0;
    var index = 0 ;
    var text1 = textAres[index];
    var textcenter1 = textsCenters[index];
    var index2 = 0;
    var text2 = textAres[index2];
    var textcenter2 = textsCenters[index2];

 /*   var cx = parseFloat(d3.select("#").attr("cx"));
var cy = parseFloat(d3.select("#mycercle").attr("cy"));
console.log('cx,cy', cx,cy);
   */
  
    if (overlappfs.TestOverlapPFS(texts)){
   //     while(overlappfs.TestOverlapPFS(texts) == true){
       
        while ((index < textAres.length) ){
            text1 = textAres[index];
            textcenter1 = textsCenters[index];
            while ((index2 < textAres.length) ) {
                text2 = textAres[index2];
                textcenter2 = textsCenters[index2];
                console.log('hh', index , index2)
                if ((index != index2) && ( overlappfs.IsOverlapPFS(text1,textcenter1,text2,textcenter2)) ) {
                         var forcepfsx =  overlappfs.calculateforcex(text1,textcenter1,text2,textcenter2);
                    console.log('force pfsx ', forcepfsx, texts[index],texts[index2] );

            
                    var forcepfsy =  overlappfs.calculateforcey(text1,textcenter1,text2,textcenter2);
                  
      
                
                    
                    if (index2 == texts.length ){
                        d3.select(texts[index]).attr("y", +texts[index].getAttribute("y")  - forcepfsy);
                        d3.select(texts[index]).attr("x", +texts[index].getAttribute("x")  - forcepfsx);}
                    else {
                        d3.select(texts[index2]).attr("y", +texts[index2].getAttribute("y")  - forcepfsy);
                        d3.select(texts[index2]).attr("x", +texts[index2].getAttribute("x")  - forcepfsx);
                    }
                    
  // console.log ('force ' , texts[index],texts[index2])

                }
            index2++;
            forcepfsx = 0;
            forcepfsy = 0 ;
        }
        
        index++;
        index2 = index;
         
    }
//index = 0 ;index2=0;}
}}

export const Scaling = function(svg) {
    // get left side and right side
    console.log('bdina');
       let overlappfs = new OverlapText();
    var texts = svg.selectAll("text")._groups[0];
    console.log('koukou', texts);
    var textAres = overlappfs.GetBordersPFS( texts);
    var textsCenters = overlappfs.getCenters(textAres);
    var radious = overlappfs.getRadious(textsCenters);
    var WidthTexts = overlappfs.getWidths(textAres);
    var i = 0 ;
    var l = 0;
    var index = 0 ;
    var text1 = textAres[index];
    var textcenter1 = textsCenters[index];
    var index2 = 0;
    var text2 = textAres[index2];
    var textcenter2 = textsCenters[index2];
 /*   var cx = parseFloat(d3.select("#").attr("cx"));
var cy = parseFloat(d3.select("#mycercle").attr("cy"));
console.log('cx,cy', cx,cy);
   */
    if (overlappfs.TestOverlapPFS(texts)){
   //     while(overlappfs.TestOverlapPFS(texts) == true){
       
        while ((index < textAres.length) ){
            text1 = textAres[index];
            textcenter1 = textsCenters[index];
            while ((index2 < textAres.length) ) {
                text2 = textAres[index2];
                textcenter2 = textsCenters[index2];
                console.log('hh', index , index2)
                if ((index != index2) && ( overlappfs.IsOverlapPFS(text1,textcenter1,text2,textcenter2)) ) {
                       
                    var forcepfsy =  overlappfs.calculateforcey(text1,textcenter1,text2,textcenter2);
               
      
                  
                    d3.select(texts[index2]).attr("y", +texts[index2].getAttribute("y") - forcepfsy);
                  
                    
  // console.log ('force ' , texts[index],texts[index2])

                }
            index2++;
           
            forcepfsy = 0 ;
        }
        
        index++;
        index2 = index;
      
         
    }
//index = 0 ;index2=0;}
}}



