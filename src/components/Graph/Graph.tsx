import React, { useState, useEffect } from 'react';
import Node from '../Node/Node';
import './Graph.scss';

interface GraphProps {
  width: number;
  height: number;
}

const Graph: React.FC<GraphProps> = ({width, height}: GraphProps) => {
  useEffect(() => {
    // create initial graph
    const initGraph = new Array(width);
    for (let i = 0; i < initGraph.length; i++) {
      initGraph[i] = new Array(height).fill(false);
    }
    setGraph(initGraph);
  }, [width, height]);

  const [graph, setGraph] = useState<boolean[][]>([[]]);

  return (
    <div className="graph-wrapper">
      {graph.map((rowOfNodes: boolean[], i: number) => (
        <div>
          {rowOfNodes.map((node: boolean, j: number) => (
            // create a node for each index in the 2d array
            <Node />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Graph;
