import React, { useState } from 'react';
import './Node.scss';

interface NodeProps {
  startingState?: boolean;
}

const Node: React.FC<NodeProps> = ({ startingState = false }) => {
  const [isActive, setActive] = useState(startingState);
  return (
    <div
      aria-label="Node"
      /*draggable={true}*/
      onClick={() => setActive(!isActive)}
      className={isActive ? 'active-node' : 'inactive-node'}
    />
  );
};

export default Node;
