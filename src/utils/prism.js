import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Delaunay } from 'd3-delaunay';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'



export const PRism = function(svg) {
    // Proximity stress model based overlap removal
    const overlappfs = new OverlapText();
    const texts = svg.selectAll("text")._groups[0];
    const textAreas = overlappfs.GetBordersPFS(texts);
    let textCenters = overlappfs.getCenters(textAreas);
    var edges = delaun(textCenters);
     // Creating the Delaunay triangulation
console.log("edges ",edges);
    let proximityGraph = [];
    
   

 let delaunay = Delaunay.from(textCenters);
 /*
let triangles = delaunay.triangles;
console.log("triangle",triangles);
let edges = [];

for(let i = 0; i < triangles.length; i+=3) {
    edges.push([triangles[i], triangles[i+1]]); 
    edges.push([triangles[i+1], triangles[i+2]]);
    edges.push([triangles[i+2], triangles[i]]);
}

*/


    // repeat until no more overlaps along edges
    while(overlappfs.TestOverlapPFS(texts)) {
        for(let edge of edges) {
            let text1 = texts[edge[0]];
            let text2 = texts[edge[1]];
            
            if(overlappfs.IsOverlapPFS(text1, textCenters[edge[0]], text2, textCenters[edge[1]])) {
                console.log("sahbi");
                let forcepfsx = overlappfs.calculateforcex(text1, textCenters[edge[0]], text2, textCenters[edge[1]]);
                let forcepfsy = overlappfs.calculateforcey(text1, textCenters[edge[0]], text2, textCenters[edge[1]]);
                
                d3.select(text1).attr("y", +text1.getAttribute("y") + forcepfsy);
                d3.select(text1).attr("x", +text1.getAttribute("x") + forcepfsx);
                
                d3.select(text2).attr("y", +text2.getAttribute("y") - forcepfsy);
                d3.select(text2).attr("x", +text2.getAttribute("x") - forcepfsx);
            }
        }
        
        // Re-create the Delaunay triangulation
        textCenters = overlappfs.getCenters(textAreas);
        delaunay = Delaunay.from(textCenters);
        edges = delaun(textCenters);
    }

    // Here you can add the second part of the algorithm which deals with node overlaps 
    // using a scan-line algorithm and add additional edges to GP
}

const delaun = function (textCenters) {
    let delaunay = Delaunay.from(textCenters);
    let triangles = delaunay.triangles;
    console.log("triangle",triangles);
    let edges = [];
    
    for(let i = 0; i < triangles.length; i+=3) {
        edges.push([triangles[i], triangles[i+1]]);
        edges.push([triangles[i+1], triangles[i+2]]);
        edges.push([triangles[i+2], triangles[i]]);
    }
return edges;    
}


export const Prism = function(svg){
    
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