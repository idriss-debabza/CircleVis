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

const changeCoordiantion = function (texts, newPos) {
    //console.log("texts, newpos", texts, newPos);
    for (let index = 0; index < texts.length; index++) {
        const element = texts[index];

        var y1 = newPos[index][1];
        d3.select(element).attr("y", y1);
   

    }

}

export const removeOverlaps  = (svg)=> {
    let detectOverlap = new OverlapText();
    let centers = [];
  
    
    svg.select(".slices").selectAll("path.slice").each(function (d) {
        centers.push({ 'middle': midAngle(d) });
    });
  
    let isoverlaps = detectOverlap.GetOverlap(svg.selectAll("text")._groups[0]);
 
   console.log('is overlap ' + isoverlaps)
    if(isoverlaps){
        var LRText =  getLeftRightSide(svg.selectAll("text")._groups[0], centers);
   
        var lefts = LRText[0];
        var rights = LRText[1];
        detectOverlap.svgc = svg;
        //console.log("left and right sides:", lefts, rights);
        var isoveSides = detectOverlap.GetOverlap(lefts);
        //console.log("left",isoveSides);
        if(isoveSides){
            var getOverlap = detectOverlap.GenerateDataForm(lefts,0);
             changeCoordiantion(lefts,getOverlap);
        }
         isoveSides = detectOverlap.GetOverlap(rights);
        //console.log("rights",isoveSides);
        if(isoveSides){
        var getOverlap2 = detectOverlap.GenerateDataForm(rights,1);
         changeCoordiantion(rights,getOverlap2);
        }
    }
}
    
const changePositionpfs = function (texts, newPos) {
    //console.log("texts, newpos", texts, newPos);
    for (let index = 0; index < texts.length; index++) {
        const element = texts[index];

        var y1 = newPos[index][1];
        d3.select(element).attr("y", y1);
   

    }

}

export const PFS = function(svg){
    
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
                    console.log('force pfsy ', forcepfsy, texts[index],texts[index2] );

      
                   console.log ('popo',+texts[index2].getAttribute("y"),+texts[index2].getAttribute("x") )
                    console.log('force',forcepfsy , forcepfsx,'fedhet');
                    
    
                    
                        d3.select(texts[index2]).attr("y", +texts[index2].getAttribute("y")  - forcepfsy);
                        d3.select(texts[index2]).attr("x", +texts[index2].getAttribute("x")  - forcepfsx);
                    
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

export const PFSy = function(svg) {
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
                    console.log('force pfsy ', forcepfsy, texts[index],texts[index2] );

      
                   console.log ('popo',+texts[index2].getAttribute("y") )
                    console.log('force',forcepfsy ,'fedhet');
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

/*
    index = 0;
    index2 = 0 ;
    if (overlappfs.TestOverlapPFS){

        while ((index < textAres.length) ){
            text1 = textAres[index];
            textcenter1 = textsCenters[index];
            while ((index2 < textAres.length) ) {
                text2 = textAres[index2];
                textcenter2 = textsCenters[index2];
                
                if (index != index2 &&  overlappfs.IsOverlapPFS(text1,textcenter1,text2,textcenter2)) {
                   var forcepfsy =  overlappfs.calculateforcey(text1,textcenter1,text2,textcenter2);
                    console.log('force pfsy ', forcepfsy, texts[index],texts[index2] );
                    
                }
            index2++;
        }
        index++;
    }
    
   /* while ( i < textAres.length){
        var k = i ;
        for (let index = i ; index < textAres.length ; index++){
            if (textAres[index] == textAres[i] ){k = index}
        }
        var force = 0 ;
        if (  textAres[i][0] > textAres[l][0] ){
            force  = calculateforcex(i,l)
        }
        for (j = i ; j < k ; j++){
            textAres[j][0] = textAres[j][0] + force ; 
        }
        l = i;
        i = k + 1
    }*//*
    }*/
   


