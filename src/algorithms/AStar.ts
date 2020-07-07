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
  const h = ({ x, y }) => Math.abs(x - e.x) + Math.abs(y - e.y);

  // create min priority queue of costs
  const pq = new PQ((a: NodeData, b: NodeData) => {
    return b.cost - a.cost;
  });

  // set start node distance to 0 and enqueue it
  graph[s.x][s.y].dist = 0;
  pq.enq(graph[s.x][s.y]);

  // create list to keep track of visited nodes
  const nodesVisited: NodeData[] = [];

  // create list to keep track of nodes taken in shortest path
  const nodesTaken: NodeData[] = [];

  while (!pq.isEmpty()) {
    // get node with lest cost in priority queue
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

    neighbors.forEach((n) => {
      // if there is a shorter path to neighbor through cur, update neighbor's dist/prev and insert it into pq
      if (cur.dist + weights[n.type] < n.dist) {
        n.dist = cur.dist + weights[n.type];
        n.prev = cur;
        n.cost = weights[n.type] + h(n);
        pq.enq(n);
      }
    });
  }

  // check if node right before end exists
  let cur: NodeData | null = graph[e.x][e.y].prev;
  if (cur) {
    // get the nodes taken in shortest path
    while (cur.prev != null) {
      // don't add to nodesTaken if it shouldn't be visualized as a taken node
      if (
        cur.type !== nodeStyles.START &&
        cur.type !== nodeStyles.END &&
        cur.type !== nodeStyles.BRIDGE
      ) {
        nodesTaken.unshift(cur);
      }
      cur = cur.prev;
    }
  }

  // return the changes made
  return { nodesVisited, nodesTaken };
};

const solve = (
  types: string[][] /* TODO set this to be only node types */,
  s: Point,
  e: Point,
  bridgeNode?: Point,
) => {
  // create function that can create a new deep copy of correctly formatted graph
  const graphCopy = (): NodeGraph =>
    types.map((row, x) =>
      row.map((type, y) => ({ ...defaultNode, type, x, y, cost: 0 })),
    );

  // handle the bridge node
  if (bridgeNode) {
    // solve from start to bridge and bridge to end
    const bridgeSol = aStar(graphCopy(), s, bridgeNode);
    const endSol = aStar(graphCopy(), bridgeNode, e);

    // combine solutions and return them
    const nodesVisitedFirst = bridgeSol.nodesVisited;
    const nodesVisitedSecond = endSol.nodesVisited;
    const nodesTakenFirst = bridgeSol.nodesTaken;
    const nodesTakenSecond = endSol.nodesTaken;
    return {
      nodesVisitedFirst,
      nodesTakenFirst,
      nodesVisitedSecond,
      nodesTakenSecond,
    };
  }
  const { nodesVisited, nodesTaken } = aStar(graphCopy(), s, e);
  return { nodesVisitedFirst: nodesVisited, nodesTakenFirst: nodesTaken };
};

export default { solve };
