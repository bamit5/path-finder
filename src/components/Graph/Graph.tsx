import React, { useState } from 'react';
import Node from '../Node/Node';
import './Graph.scss';

const Graph: React.FC = () => {
  const [graph, setGraph] = useState<boolean[][]>([[false, false, false], [false, false, false]]);

  return (
    <div className="graph-wrapper">
      {graph.map((rowOfNodes: boolean[], i: number) => (
        rowOfNodes.map((node: boolean, j: number) => (
          <Node />
        ))
      ))}
    </div>
  );
};

export default Graph;
