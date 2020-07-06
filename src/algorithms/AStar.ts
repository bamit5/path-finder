import PQ from 'priorityqueuejs';
import {
  NodeData,
  Point,
  defaultNode,
  nodeStyles,
  weights,
} from '../constants/constants';

type NodeGraph = NodeData[][]; // TODO add to constants? maybe change name or something?

/**
 * // TODO
 * @param graph
 * @param s
 * @param e
 */
const aStar = (graph: NodeGraph, s: Point, e: Point) => {
  // using Manhattan distance as heuristic function
  const h = (p: Point) => Math.abs(p.x - e.x) + Math.abs(p.y - e.y);

  // create min priority queue of costs
  const pq = new PQ((a: NodeData, b: NodeData) => {
    const aPoint = { x: b.x, y: b.y };
    const bPoint = { x: a.x, y: a.y };
    return b.dist * h(aPoint) - a.dist * h(bPoint);
  });

  // set start node distance to 0 and enqueue it
  graph[s.x][s.y].dist = 0;
  pq.enq(graph[s.x][s.y]);

  // create list to keep track of visited nodes
  const nodesVisited: NodeData[] = [];

  // create list to keep track of nodes taken in shortest path
  const nodesTaken: NodeData[] = [];

  while (!pq.isEmpty()) {
    // get node with shortest distance in priority queue
    const cur: NodeData = pq.deq();

    // if already visited, continue
    if (cur.visited) continue;

    // if cur is the end node, then shortest path is found
    if (cur === graph[e.x][e.y]) break;

    // mark it as visited, add it to visited nodes (if it should be visualized)
    cur.visited = true;
    if (
      cur.type !== nodeStyles.START &&
      cur.type !== nodeStyles.END &&
      cur.type !== nodeStyles.BRIDGE
    ) {
      nodesVisited.push(cur);
    }

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

  // check if node right before end exists
  let cur: NodeData | null = graph[e.x][e.y].prev;
  if (cur) {
    // get the nodes taken in shortest path
    while (cur.prev != null) {
      nodesTaken.unshift(cur);
      cur = cur.prev;
    }
  }

  // return the changes made
  return { nodesVisited, nodesTaken };
};

// TODO set it up for multiple bridge nodes
const solve = (
  types: string[][] /* TODO set this to be only node types */,
  s: Point,
  e: Point,
  bridgeNode?: Point,
) => {
  // create function that can create a new deep copy of correctly formatted graph
  const graphCopy = (): NodeGraph =>
    types.map((row, x) =>
      row.map((type, y) => ({ ...defaultNode, type, x, y })),
    );

  // handle the bridge node
  if (bridgeNode) {
    // solve from start to bridge and bridge to end
    const bridgeSol = aStar(graphCopy(), s, bridgeNode);
    const endSol = aStar(graphCopy(), bridgeNode, e);

    // combine solutions and return them
    const nodesVisited = bridgeSol.nodesVisited.concat(endSol.nodesVisited);
    const nodesTaken = bridgeSol.nodesTaken.concat(endSol.nodesTaken);
    return { nodesVisited, nodesTaken };
  }
  return aStar(graphCopy(), s, e);
};

export default { solve };
