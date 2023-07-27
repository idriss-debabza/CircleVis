

import _ from 'lodash';

import { sum, overlap, createFunction } from 'agora-graph';


import * as d3 from 'd3';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'


export const rWordleL = createFunction(function (
  graph,
  options: { padding: number } = { padding: 0 }
) {
  // Sort by Xs
  graph.nodes.sort((a, b) => a.x - b.x);

  const layouted: Node[] = [];

  _.forEach(graph.nodes, function (cur) {
    let t = 3.0;
    const minSide = Math.min(cur.width, cur.height);
    // spiral depending on the size of the object
    const spiralFactor = minSide / 17.0;
    const spiralStep = minSide / 10.0;

    // We copy the current object so we can translate it in peace
    while (true) {
      const tx = Math.sin(t) * t * spiralFactor;
      const ty = Math.cos(t) * t * spiralFactor;

      // transformed object
      const transformedArea = {
        ...cur,
        ...sum(cur, { x: tx, y: ty }),
      };
      if (!hasOverlap(layouted, transformedArea)) {
        // found placement
        layouted.push(transformedArea);
        break;
      }
      t += spiralStep / t;
    }
  });

  graph.nodes = layouted;
  return { graph };
});

export const RWordleLAlgorithm: Algorithm<{ padding: number }> = {
  name: 'RWordleL',
  algorithm: rWordleL,
};

export default rWordleL;

function sum(obj1, obj2) {
    return {
      x: obj1.x + obj2.x,
      y: obj1.y + obj2.y,
    };
  }
function hasOverlap(alreadyLayouted: Node[], current: Node) {
  for (const s of alreadyLayouted) {
    if (overlap(s, current)) {
      return true;
    }
  }

  return false;
}
