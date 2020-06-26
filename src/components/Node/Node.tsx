import React, { useState } from 'react';
import './Node.scss';

export const buttonTypes = {
  ACTIVE: 'active-node',
  INACTIVE: 'inactive-node',
  START: 'start-node',
  END: 'end-node',
  BRIDGE: 'bridge-node',
  WALL: 'wall-node'
}
const { ACTIVE, INACTIVE, START, END, BRIDGE} = buttonTypes;

interface NodeProps {
  startingType?: boolean | string;
}

const Node: React.FC<NodeProps> = ({ startingType }: NodeProps /* TODO this shouldn't be needed?... */) => {
  // parse startingType of node
  if (!startingType) {
    startingType = INACTIVE;
  } else if (startingType === true) {
    startingType = ACTIVE;
  }

  const [type, setType] = useState<string>(startingType);

  return (
    <div
      aria-label="Node"
      onClick={() => setType(type !== INACTIVE ? INACTIVE : ACTIVE)}
      className={type}
    />
  );
};

export default Node;
