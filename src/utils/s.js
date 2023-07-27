import * as d3 from 'd3';
import OverlapText from "./OverlapsText"
import {midAngle} from './functions'


export default ScalingAlgorithm;
/**
 * find the biggest ratio for overlapping nodes
 * @param nodes
 * @param {number} options.padding padding to add between nodes
 */
function getMaxOverlapRatio(
  nodes: Node[],
  options: { padding: number } = { padding: 0 }
): number {
  let maxOverlapRatio = 1;

  const overlapGroups = getAllOverlaps(nodes);

  forEach(overlapGroups, (group) => {
    for (let i = 0; i < group.length; i++) {
      const u = group[i];
      for (let j = i + 1; j < group.length; j++) {
        const v = group[j];

        if (overlap(u, v, options)) {
          const actualDist = norm(u, v);
          if (actualDist !== 0) {
            const optimalDist = length(optimalVector(u, v, options.padding));

            const ratio = optimalDist / actualDist;
            if (maxOverlapRatio < ratio) {
              maxOverlapRatio = ratio;
            }
          }
        }
      }
    }
  });

  return maxOverlapRatio;
}
