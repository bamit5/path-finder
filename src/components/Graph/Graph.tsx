import React, { useEffect, useState } from 'react';
import Node from '../Node/Node';
import './Graph.scss';
import { NodeData, defaultNode } from '../../constants/constants';

interface GraphProps {
  width: number;
  height: number;
}

const Graph: React.FC<GraphProps> = ({ width, height }: GraphProps) => {
  const [graph, setGraph] = useState<NodeData[][]>([[]]);

  useEffect(() => {
    // create initial graph
    const initGraph = new Array(width);
    for (let x = 0; x < initGraph.length; x++) {
      initGraph[x] = new Array(height);
      for (let y = 0; y < initGraph[x].length; y++) {
        // set every index to be a default node but change x and y accordingly
        initGraph[x][y] = defaultNode;
        initGraph[x][y].x = x;
        initGraph[x][y].x = y;
      }
    }
    setGraph(initGraph);
  }, [width, height]);

  return (
    <div className="graph-wrapper">
      {graph.map((rowOfNodes: NodeData[]) => (
        <div>
          {rowOfNodes.map((nodeData: NodeData) => (
            // create a node for each index in the 2d array
            <Node
              _type={nodeData.type}
              visited={nodeData.visited}
              taken={nodeData.taken}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Graph;
