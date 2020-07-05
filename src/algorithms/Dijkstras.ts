import PQ from 'priorityqueuejs';
import { NodeData, Point, weights } from '../constants/constants';

type NodeGraph = NodeData[][]; // TODO add to constants? maybe change name or something?

/**
 * // TODO
 * @param graph
 * @param s
 * @param e
 */
const dijkstras = (graph: NodeGraph, s: Point, e: Point) => {
  // set start node distance to 0
  graph[s.x][s.y].dist = 0;

  // create min priority queue of distances
  const pq = new PQ((a: NodeData, b: NodeData) => b.dist - a.dist);
  pq.enq(graph[s.x][s.y]);

  // create list to keep track of visited nodes
  const nodesVisited: NodeData[] = [];

  // create list to keep track of nodes taken in shortest path
  const nodesTaken: NodeData[] = [];

  while (!pq.isEmpty()) {
    // get node with shortest distance in priority queue
    const cur: NodeData = pq.deq();

    /* // TODO -- not sure if this will work, test it -- if already visited, continue */
    if (cur.visited) continue;

    // if cur is the end node, then shortest path is found
    if (cur === graph[e.x][e.y]) break; // TODO should this be before marking it as visited?

    // mark it as visited, add it to visited nodes
    cur.visited = true;
    nodesVisited.push(cur);

    // each node has max of 4 neighbors: the left, right, top, and bottom nodes
    const neighbors: NodeData[] = [];
    if (cur.x > 0) neighbors.push(graph[cur.x - 1][cur.y]); // left neighbor
    if (cur.x < graph.length - 1) neighbors.push(graph[cur.x + 1][cur.y]); // right neighbor
    if (cur.y > 0) neighbors.push(graph[cur.x][cur.y - 1]); // top neighbor
    if (cur.y < graph[0].length - 1) neighbors.push(graph[cur.x][cur.y + 1]); // bottom neighbor

    neighbors.forEach((neighbor) => {
      // if there is a shorter path to neighbor through cur, update neighbor's dist/prev and insert it into pq
      if (cur.dist + weights[neighbor.type] < neighbor.dist) {
        neighbor.dist = cur.dist + weights[neighbor.type];
        neighbor.prev = cur;
        pq.enq(neighbor);
      }
    });
  }

  // take start node out of nodesVisited
  nodesVisited.shift();

  // check if node right before end exists
  let cur: NodeData | null = graph[e.x][e.y].prev;
  if (cur) {
    // get the nodes taken in shortest path
    while (cur.prev != null) {
      cur.taken = true; // TODO i don't think things like this will be necessary... delete it (and others)?
      nodesTaken.unshift(cur);
      cur = cur.prev;
    }
  }

  // return the changes made
  return { nodesVisited, nodesTaken };
};

const solve = (graph: NodeGraph, s: Point, e: Point, bridgeNode?: Point) => {
  if (bridgeNode) {
    // solve from start to bridge and bridge to end
    const bridgeSol = dijkstras(graph, s, bridgeNode);
    const endSol = dijkstras(graph, bridgeNode, e);

    // combine solutions and return them
    const nodesVisited = bridgeSol.nodesVisited.concat(endSol.nodesVisited);
    const nodesTaken = bridgeSol.nodesTaken.concat(endSol.nodesTaken);
    return { nodesVisited, nodesTaken };
  }
  return dijkstras(graph, s, e);
};

export default { solve };
