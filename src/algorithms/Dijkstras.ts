import PQ from 'priorityqueuejs';
import { NodeData } from '../constants/constants';

type NodeGraph = NodeData[][];

// TODO set 'visited' to true to visualize nodes being visited, and 'partOfPath' to true to visualize a node being selected in a path
const solve = (graph: NodeGraph, s: NodeData, e: NodeData): NodeGraph => {
  // deep copy the graph to not change the original
  graph = { ...graph };

  // set start node distance to 0
  s.dist = 0;

  // create min priority queue of distances
  const pq = new PQ((a: NodeData, b: NodeData) => b.dist - a.dist);
  pq.enq(s);

  while (!pq.isEmpty()) {
    // get node with shortest distance in priority queue
    const cur: NodeData = pq.deq();

    /* // TODO -- not sure if this will work, test it -- if already visited, continue
    if (cur.dist) continue; */
    // mark it as visited
    cur.visited = true;

    // if destination is cur node, then you've found the shortest path
    if (cur === e) break;

    // each node has max of 4 neighbors: left, right, top, bottom
    const neighbors: NodeData[] = [];
    if (cur.x > 0) neighbors.push(graph[cur.x - 1][cur.y]); // left neighbor
    if (cur.x < graph.length - 1) neighbors.push(graph[cur.x + 1][cur.y]); // right neighbor
    if (cur.y > 0) neighbors.push(graph[cur.x][cur.y - 1]); // top neighbor
    if (cur.y < graph[0].length - 1) neighbors.push(graph[cur.x][cur.y + 1]); // bottom neighbor

    neighbors.forEach((n) => {
      // if there is a shorter path to n through cur, update n's dist/prev and insert n to pq
      if (
        n.dist >
        cur.dist + 1 /* TODO the 1 should be the weight of the edge */
      ) {
        n.dist = cur.dist + 1 /* TODO the 1 should be the weight of the edge */;
        n.prev = cur;
        pq.enq(n);
      }
    });
  }

  // didn't find a path!
  if (!e.prev) {
    return graph; // TODO throw an error?
  }

  // starting from the node previous to the end node, mark all the nodes in the shortest path
  let cur: NodeData = e.prev;
  while (cur.prev != null) {
    cur.taken = true;
    cur = cur.prev;
  }

  return graph;
};

export default solve;
