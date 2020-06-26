import React, { useEffect, useState } from 'react';
import Node from '../Node/Node';
import './Graph.scss';

interface GraphProps {
  width: number;
  height: number;
}

const Graph: React.FC<GraphProps> = ({ width, height }: GraphProps) => {
  const [graph, setGraph] = useState<boolean[][]>([[]]);

  useEffect(() => {
    // create initial graph
    const initGraph = new Array(width);
    for (let i = 0; i < initGraph.length; i++) {
      initGraph[i] = new Array(height).fill(false);
    }
    setGraph(initGraph);
  }, [width, height]);

  return (
    <div className="graph-wrapper">
      {graph.map((rowOfNodes: boolean[]) => (
        <div>
          {rowOfNodes.map(() => (
            // create a node for each index in the 2d array
            <Node />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Graph;
