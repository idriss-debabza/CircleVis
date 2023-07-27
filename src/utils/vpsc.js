import * as d3 from 'd3';
import OverlapText from "./OverlapsText"


 const VPsc = (svg) => {
  const texts = svg.selectAll('text').nodes();

  const getLeftNeighbors = (scanLine, v) => {
    const leftNeighbors = new Set();
    let u = getNextLeft(scanLine, v);

    while (u !== null) {
      if (overlapX(u, v) <= 0) {
        leftNeighbors.add(u);
      } else if (overlapX(u, v) <= overlapY(u, v)) {
        leftNeighbors.add(u);
        u = getNextLeft(scanLine, u);
      } else {
        break;
      }
    }

    return leftNeighbors;
  };

  const getRightNeighbors = (scanLine, v) => {
    const rightNeighbors = new Set();
    let u = getNextRight(scanLine, v);

    while (u !== null) {
      if (overlapX(u, v) <= 0) {
        rightNeighbors.add(u);
      } else if (overlapX(u, v) <= overlapY(u, v)) {
        rightNeighbors.add(u);
        u = getNextRight(scanLine, u);
      } else {
        break;
      }
    }

    return rightNeighbors;
  };

  const getNextLeft = (scanLine, v) => {
    const index = scanLine.indexOf(v);
    return index > 0 ? scanLine[index - 1] : null;
  };

  const getNextRight = (scanLine, v) => {
    const index = scanLine.indexOf(v);
    return index < scanLine.length - 1 ? scanLine[index + 1] : null;
  };

  const overlapX = (u, v) => {
    // Calculate the X-axis overlap between two nodes
    // Modify this calculation based on your specific requirements
    const bboxU = u.getBBox();
    const bboxV = v.getBBox();
    return bboxV.x - bboxU.x - bboxU.width;
  };

  const overlapY = (u, v) => {
    // Calculate the Y-axis overlap between two nodes
    // Modify this calculation based on your specific requirements
    const bboxU = u.getBBox();
    const bboxV = v.getBBox();
    return Math.abs(bboxV.y - bboxU.y) - Math.max(bboxU.height, bboxV.height);
  };

  const generateConstraint = (u, v) => {
    // Generate constraint to satisfy node overlap
    // You can define your own logic or positioning rules here
    // Modify this function based on your specific requirements
    const bboxU = u.getBBox();
    const bboxV = v.getBBox();
    const constraintX = (bboxU.x + bboxU.width + bboxV.x) / 2;
    const constraintY = (bboxU.y + bboxU.height + bboxV.y) / 2;

    // Apply the constraint to adjust the node position
    d3.select(v).attr('x', constraintX).attr('y', constraintY);
  };

  const events = [];
  for (const text of texts) {
    const bbox = text.getBBox();
    events.push({ kind: 'open', node: text, posn: bbox.y + bbox.height / 2 });
  }

  events.sort((a, b) => a.posn - b.posn);

  const scanLine = [];
  const left = new Map();
  const right = new Map();

  for (const event of events) {
    const { kind, node } = event;

    if (kind === 'open') {
      scanLine.push(node);
      left.set(node, getLeftNeighbors(scanLine, node));

      for (const u of left.get(node)) {
        right.set(u, new Set([...right.get(u)].filter((v) => v !== node)));
      }

      right.set(node, getRightNeighbors(scanLine, node));

      for (const u of right.get(node)) {
        left.set(u, new Set([...left.get(u)].filter((v) => v !== node)));
      }
    } else {
      for (const u of left.get(node)) {
        generateConstraint(u, node);
        right.set(u, new Set([...right.get(u)].filter((v) => v !== node)));
      }

      for (const u of right.get(node)) {
        generateConstraint(node, u);
        left.set(u, new Set([...left.get(u)].filter((v) => v !== node)));
      }

      scanLine.splice(scanLine.indexOf(node), 1);
    }
  }
};
export const Vpsc = function(svg){
    
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
               
             

      d3.select(texts[index2]).attr("y", +texts[index2].getAttribute("y")  + forcepfsy);
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