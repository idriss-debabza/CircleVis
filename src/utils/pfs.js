/*import * as d3 from 'd3';
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

const DezirableDistance  = function (node1 , node2){
    var kx = (w1 + w2 ) / 2 ;
    var ky = (h1 + h2 ) / 2 ;
    getdistance (u , v);

}

begin {
    let isoverlaps = detectOverlap.GetOverlap(svg.selectAll("text")._groups[0]);
 
}
 i = 1;
 L = 1 ;
 while (i < n ){
    k =  max 
 }
export const pfs  = (svg)=> {

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
*/

OverlapText.prototype.calculateforcex(i , j ){
var distx = cel1[0] - cel2[0];
var disty = cel[1] - cel2[1];
var w = (wl1 + wl2 ) / 2 ;
var h = (hl1 + hl2) / 2 ;

var fxij = (distx / Math.abs(distx) * ( (w1 - w2)/2  - Math.abs(distx) ))
return fxij;
}


OverlapText.prototype.PFSx = function(texts){
// get left side and right sides
var textAres = this.GetBordersPFS(texts);
var textsCenters = this.getCenters(textAres);
var radious = this.getRadious(textsCenters);
var WidthTexts = this.getWidths(textAres);
var i = 0 ;
var l = 0;

if (textOverlapPfs){
while ( i < textAres.length){
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
}
}
return i;
}


export const removeOverlaps  = (svg)=> {
    let detectOverlap = new OverlapText();
    let centers = [];
  
    svg.select(".slices").selectAll("path.slice").each(function (d) {
        centers.push({ 'middle': midAngle(d) });
    });

  let isoverlaps = detectOverlap.GetOverlap(svg.selectAll("text")._groups[0]);
}