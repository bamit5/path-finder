import PQ from 'priorityqueuejs';

interface Node {
  x: number;
  y: number;
  /* visited?: boolean;
  prev?: Node; */
}

/**
 * Creates a 2d array
 * @param width - the width of the 2D array
 * @param height - the height of the 2D array
 * @param fillWith - what to fill the 2D array with
 */
function create2DArray<T>(width: number, height: number, fillWith: T): T[][] {
  // create the 2d array and fill it, then return it
  const arr2D = new Array(width);
  for (let i = 0; i < arr2D.length; i++) {
    arr2D[i] = new Array(height).fill(fillWith);
  }
  return arr2D;
}

const solve = (graph: Node[][], s: Node, e) => {
  // create distances array
  const dist = create2DArray<number>(
    graph.length,
    graph[0].length,
    Number.POSITIVE_INFINITY,
  );
  dist[s.x][s.y] = 0;

  // create prevs array
  const prev = create2DArray<null>(graph.length, graph[0].length, null);
  // create min priority queue of distances
  const pq = new PQ((a, b) => b - a);

  while (!pq.isEmpty()) {
    const cur = pq.deq();

    // each node has max of 4 edges: left, right, top, bottom
    const neighbors: Node[] = [];
    // Left
    if (cur.x > 0) neighbors.push(graph[cur.x - 1][cur.y]);
    // Right
    if (cur.x < graph.length - 1) neighbors.push(graph[cur.x + 1][cur.y]);
    // Top
    if (cur.y > 0) neighbors.push(graph[cur.x][cur.y - 1]);
    // Bottom
    if (cur.y < graph[0].length - 1) neighbors.push(graph[cur.x][cur.y + 1]);

    neighbors.forEach((n) => {
      if (
        dist[n.x][n.y] >
        dist[cur.x][cur.y] + 1 /* TODO the 1 should be the weight of the edge */
      ) {
        dist[n.x][n.y] =
          dist[cur.x][cur.y] +
          1 /* TODO the 1 should be the weight of the edge */;
        prev[n.x][n.y] = cur;
      }
    });
  }
};

export default solve;
