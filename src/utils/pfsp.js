import * as d3 from 'd3';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'

export const  horizontalScan = function(svg) {
  let overlappfsp = new OverlapText();
  var texts = svg.selectAll("text")._groups[0];
  console.log('wch raj',texts)
  var textAres = overlappfsp.GetBordersPFS( texts);
  var textsCenters = overlappfsp.getCenterspfsp(textAres);
  console.log('textcenters',textAres , textsCenters);
    textsCenters.sort((a, b) => a[0] - b[0]);
    let i = 0;
    let σ = 0;
    console.log('bdina pfsp');
  
    let lmin = textsCenters[0];
    console.log(texts[0]);
  
    while (i < textsCenters.length) {
      let k = sameX(textsCenters, i);
      let ɣ = 0;
      const u = textsCenters[i];
  
      if (1==1) {
        for (let m = i; m <= k; m++) {
          const v = textsCenters[m];
          const vp = textAres[m];
          // gamma'en peu plus
          let ɣpp = 0;
      
  
          for (let j = 0; j < i; j++) {
            const nodeJ = textsCenters[j];
            console.log('salama',texts[j]);
            if (nodeJ[1] === undefined)
              throw 'cannot set undefined updated position for' + nodeJ;
            ɣpp = Math.max(nodeJ[1] + force(textAres[j],textAres[m], nodeJ, v).x, ɣpp);
          }
  
          // gangplanck
          const ɣp = minX(v) + ɣpp < minX(lmin) ? σ : ɣpp;

          ɣ = Math.max(ɣ, ɣp);
        }
      }
  
      for (let m = i; m <= k; m++) {
        console.log('salamo',ɣ,m,texts[m]);
        const r = textsCenters[m];
        const rp = textAres[m];
        if (r[1] === undefined) throw 'cannot set undefined updated position';
       // r[1] = ɣ;//ay kayna up 
       console.log('vp',ɣ); 
        r[0] = minX(rp) + ɣ;
  
        if (minX(rp) < minX(lmin)) {
          lmin = r;
        }
      }
  
      let δ = 0;
  
      for (let m = i; m <= k; m++) {
        console.log('ak hna ',m,texts[m],textsCenters[m] );
        for (let j = k + 1; j < textsCenters.length; j++) {  
          let f = force(textAres[m],textAres[j] ,textsCenters[m], textsCenters[j]);
          
          if (f.x > δ) {
            δ = f.x;
          }
          console.log('fofo',f);
         d3.select(texts[m]).attr("y", +texts[m].getAttribute("y")  + f.y);
          d3.select(texts[m]).attr("x", +texts[m].getAttribute("x")  + f.x);
          console.log('fedhet',d3.select(texts)); }
        }
    
  
      σ += δ;
      i = k + 1;
    }
  }
  
  function force(vib,vjb,vi,vj) {
    // Calculate the force between two nodes
    // Implement your force calculation logic here
     // Replace with the actual force calculation
    const f = { x: 0, y: 0 };
console.log('hada vi',vi);
  let δx = vi[0] - vj[0];
  let δy = vi[1] - vj[1];
  let aδx = Math.abs(δx);
  let aδy = Math.abs(δy);
console.log('chouf bien ',vi[0]);
  let gij = δy / δx;
console.log('height w width ', vib.height);
  let Gij = (vib.height + vjb.height) / (vib.width + vjb.width);
  console.log('Gij ',Gij, 'gij', gij);
  if ((Gij >= gij && gij > 0) || (-Gij <= gij && gij < 0) || gij === 0) {
    f.x = (δx / aδx) * ((vib.width + vjb.width) / 2 - aδx);
    f.y = f.x * gij;
  }
  if ((Gij < gij && gij > 0) || (-Gij > gij && gij < 0)) {
    f.y = (δy / aδy) * ((vib.height + vjb.height) / 2 - aδy);
    f.x = f.y / gij;

  }
console.log('hada f', f);
  return f;
  }
  
  function sameX(textsCenters, index) {
    // Find the index of the last node with the same x-coordinate as the node at the given index
    const x = textsCenters[index][0];
    let i = index + 1;
    while (i < textsCenters.length && textsCenters[i][0] === x) {
      i++;

    }
    return i - 1;
  }
  
  function minX(node) {
    // Calculate the minimum x-coordinate of a node
    // Modify this function based on your node representation
    return node.x; // Replace with the actual calculation of the minimum x-coordinate
  }
  