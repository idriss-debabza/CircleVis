import * as d3 from 'd3';
import Remouve from './Remouve'

export default function OverlapText(svg) {
   // this. svgc= svg;
}
OverlapText.prototype.GetBorders = function (texts) {
    var TextArea = [];
    try {
        this.svgc.selectAll("rect").remove();
    } catch (error) {
        console.log("rempve rect does not work")
    }

    for (let index = 0; index < texts.length; index++) {
        let text = texts[index];
        var bboxtext = text.getBBox();
        console.log("text :",text);
        console.log("bbox :",bboxtext);
        bboxtext.width = text.getComputedTextLength();
        bboxtext.height = text.getBoundingClientRect().height;

        // this.drawrec(bboxtext);/*  */
        TextArea.push(bboxtext);
        // design poi/*  */nts      
    }
    return TextArea;
}
/*OverlapText.prototype.drawrec=function(rec){
  
    this.svgc.append("rect").attr("x",rec.x)
    .attr("y",rec.y)
    .attr("width",rec.width)
    .attr("height",rec.height).
    attr("fill", "none")
    .attr("stroke", "black");

}*/
OverlapText.prototype.getRadious = function (centers) {
    var radious = [];
    for (let index = 0; index < centers.length; index++) {
        const element = centers[index];
        var rad = Math.sqrt(Math.pow((element[0]), 2) + Math.pow((element[1]), 2))
        radious.push(rad);

    }
    return radious;
}
OverlapText.prototype.GenerateDataForm = function (texts, type) {
    // get left side and right sides
    var textAres = this.GetBorders(texts);
    var textsCenters = this.getCenters(textAres);
    var radious = this.getRadious(textsCenters);
    var WidthTexts = this.getWidths(textAres);
    var Length = this.getLength(textsCenters);
    //console.log("length axes: ", Length);
    if (type == 1) {
        textsCenters = textsCenters.reverse();
        WidthTexts = WidthTexts.reverse();
    }
    var Ycenter = [];
    for (let index = 0; index < textsCenters.length; index++) {
        const element = textsCenters[index][1];
      
        Ycenter.push(element);
        // this.plotCircle(element,textsCenters[index][0]);
    }
    ///error
    //Ycenter=Ycenter.sort();
    var l0= WidthTexts[0];

    //lenght= length;
    console.log("Ycenter : ", Ycenter);

    var min = Ycenter[0];
    var max = Ycenter[Ycenter.length - 1];
    var ycenternorm = [];
    for (let index = 0; index < Ycenter.length; index++) {
        const element = Ycenter[index];
        var nromv = this.convertNorm(element, min, max, true, Length,l0);
        ycenternorm.push(nromv);
    }
    console.log("norm list ", ycenternorm);
    var foncRo = new Remouve(WidthTexts, ycenternorm, Length);
    var newpos = foncRo.calculateF();
   
    var newlist = [];
    for (let index = 0; index < newpos.length; index++) {
        const element = newpos[index];
        var nromv = this.convertNorm(element, min, max, false, Length,l0);
        newlist.push(nromv);
    }
    if (type == 1) newlist = newlist.reverse();
    console.log("new pos",newpos," newslist ",newlist,"textwidth",  WidthTexts);
    var cords = this.getCoordinate(radious, newlist,type);
    return cords;
}
OverlapText.prototype.getCoordinate = function (radious, cords,type) {
    var newcords = [];
    //console.log("radious : ",radious);
    for (let index = 0; index < cords.length; index++) {
        var y = cords[index];
        var rad = radious[index];
        var tita = Math.asin(y / rad);

        var x;
        if(type==1){
            x = -Math.cos(tita) * rad;
        }else{
            x = Math.cos(tita) * rad;
        }
      
        var newcord = [x, y];
        newcords.push(newcord);
    }
return newcords;
}

OverlapText.prototype.convertNorm = function (value, min, max, type, Length,l0) {
    var x = d3.scaleLinear()
        .domain([min, max])
        .range([l0, Length]);

    var val;
    if (type) {
        // domain to range:
        val = x(value);
    } else {
        // range to domain:
        val = x.invert(value);
    }
    return val;
}
OverlapText.prototype.plotCircle = function (ycenter, x) {
    //console.log(this.svgc, x, ycenter);
    this.svgc.append("circle")
        .attr("cx", x)
        .attr("cy", ycenter)
        .attr("r", 3)
}

OverlapText.prototype.getLength = function (centers) {

    var L = 0;

    for (let index = 0; index < centers.length - 1; index++) {
        var elem1 = centers[index];
        var elem2 = centers[index + 1];
        var dist = Math.sqrt(Math.pow((elem1[0] - elem2[0]), 2) + Math.pow((elem1[1] - elem2[1]), 2));
        L = L + dist;
    }
    return L;

}


OverlapText.prototype.getWidths = function (textareas) {
    var widths = [];
    for (let index = 0; index < textareas.length; index++) {
        const element = textareas[index];
        widths.push(element.width / 2);
    }
    return widths;
}

OverlapText.prototype.getCenters = function (textareas) {
    var centers = [];
    for (let index = 0; index < textareas.length; index++) {
        const element = textareas[index];
        var center = [element.x + (element.width / 2), element.y + (element.height / 2)];
        centers.push(center);
    }
   
    return centers;
}
OverlapText.prototype.getCenterspfsp = function (textareas) {
    var centers = [];
    for (let index = 0; index < textareas.length; index++) {
        const element = textareas[index];
        var center = [element.x + (element.width / 2), element.y + (element.height / 2)];
     
        centers.push(center); // Store x and y as separate properties
 
    }
   
    return centers;
}

OverlapText.prototype.GetOverlap = function (texts) {
      
    var textAres = this.GetBorders(texts);
    console.log(textAres)
    console.log('ak hna');
    var exist = false;
    var index = 0;
    while ((index < textAres.length) && (exist == false)) {
        var text1 = textAres[index];
        var index2 = 0;
        while ((index2 < textAres.length) && (exist == false)) {
            var text2 = textAres[index2];
            if (index != index2) {
                exist = this.isOverlap(text1, text2);
            }
            index2++;
        }
        index++;
    }
    console.log(exist);
    return exist;
}

OverlapText.prototype.isOverlap = function (rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y;
}

OverlapText.prototype.GetBordersPFS = function (texts) {
    var TextArea = [];
    try {
        this.svgc.selectAll("rect").remove();
    } catch (error) {
        console.log("rempve rect does not work")
    }

    for (let index = 0; index < texts.length; index++) {
        let text = texts[index];
        var bboxtext = text.getBoundingClientRect();
        console.log("text :",text);
        console.log("bbox :",bboxtext);
     
        TextArea.push(bboxtext);
        // design poi/*  */nts      
    }
    return TextArea;
}

OverlapText.prototype.TestOverlapPFS = function (texts){
    var textAres = this.GetBordersPFS(texts);
    var textsCenters = this.getCenters(textAres);
    var overlappedindexes = [];
   // console.log ('les centres ',texts , textsCenters); 
    var cond = false;
    var index = 0;
    while ((index < textAres.length) ){
        var text1 = textAres[index];
        var index2 = index;
        while ((index2 < textAres.length) ) {
            var text2 = textAres[index2];
            if (index < index2 ) {
                var distx = textsCenters[index][0] - textsCenters[index2][0];
                var disty = textsCenters[index][1] - textsCenters[index2][1];
                distx = Math.abs(distx);
                disty = Math.abs(disty);
                var w = (text1.width + text2.width) / 2 ;
                var h = (text1.height + text2.height ) / 2 ;
                if (w > distx && h > disty){cond = true ;}
              console.log('emchi  ', w,distx,'dhorka l h w l y ', h, disty, cond );
               console.log('emchi  1 ' , cond, texts[index], texts[index2]);
               console.log('emchi 2 ' , textAres[index], textAres[index2]);
               overlappedindexes[0] = index2;
            }
            index2++;
            
         //   console.log( 'emchi t3ti 2 ',cond);
            
        }
        index++;
    
    }
    console.log ( 'emchi  ', cond);
    return cond;
}

OverlapText.prototype.IsOverlapPFS = function (text1,textcenter1 , text2,textcenter2){
  
   // console.log ('les centres ',texts , textsCenters); 
    var cond = false;
           var distx = textcenter1[0] - textcenter2[0];
            var disty = textcenter1[1] - textcenter2[1];
                    distx = Math.abs(distx);
                    disty = Math.abs(disty);
                    var w = (text1.width + text2.width) / 2 ;
                    var h = (text1.height + text2.height ) / 2 ;
                    if (w > distx && h > disty){cond = true ;}
               
         
      
        
        
    
    
    console.log ( 'hhhhh ', cond, text1,text2);
    return cond;
}
OverlapText.prototype.calculateforcex = function (text1,textcenter1 , text2,textcenter2 )
{
    var distx = textcenter1[0] - textcenter2[0];
    var w = (text1.width + text2.width) / 2 ;
    var fxij = (distx / Math.abs(distx) * ( w - Math.abs(distx) ))
    return fxij;
    }

    
OverlapText.prototype.calculateforcey = function (text1,textcenter1 , text2,textcenter2 )
{
    var disty = textcenter1[1] - textcenter2[1];
    var h = (text1.height + text2.height) / 2 ;
    var fxij = (disty / Math.abs(disty) * ( h - Math.abs(disty) ))
    return fxij;
    }
    
    
OverlapText.prototype.calculatefactor = function (text1,textcenter1 , text2,textcenter2 )
{
    var disty = textcenter1[1] - textcenter2[1];
    var h = (text1.height + text2.height) / 2  ;
    var distx = textcenter1[0] - textcenter2[0];
    var w = (text1.width + text2.width) / 2 ;
    var factor= Math.max(Math.min(h/Math.abs(disty),w / Math.abs(distx)), 1);
    return factor;
    }
    
    
    /*
OverlapText.prototype.stressfunction = function (texts )
{
    
    var disty = textcenter1[1] - textcenter2[1];
    var h = (text1.height + text2.height) / 2  ;
    var distx = textcenter1[0] - textcenter2[0];
    var w = (text1.width + text2.width) / 2 ;
    var factor= Math.max(Math.min(h/disty,w / distx), 1);
    return factor;
    }
    */
OverlapText.prototype.samex = function (texts,i)
{

var textAres = this.GetBordersPFS(texts);
    var textsCenters = this.getCenters(textAres);
    var samex = texts[i];
       // console.log ('les centres ',texts , textsCenters); 
    var index = 0;
    while ((index < textAres.length) ){
        if (textsCenters[index][0] == textsCenters[i][0])    {
                samex = texts[index];
          }
         //   console.log( 'emchi t3ti 2 ',cond);
            
        }
        index++;
    
    
    console.log ( 'emchi  ', samex);
    return samex;
}

    /*

OverlapText.prototype.TestOverlapPFS = function (cel1,cel2,wl1,wl2,hl1,hl2){
    var distx = cel1[0] - cel2[0];
    var disty = cel1[1] - cel2[1];
    var w = (wl1 + wl2 ) / 2 ;
    var h = (hl1 + hl2) / 2 ;
     var cond = false ;
    if ((w > distx) && (h > disty)) {
        cond = true ;
    }

return cond;

}

}*/