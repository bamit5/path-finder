import React, { useEffect, useState } from 'react';
import './Node.scss';

import { ENTER, SPACE, nodeTypes } from '../../constants/constants';

const { ACTIVE, INACTIVE, START, END, BRIDGE, VISITED, TAKEN } = nodeTypes;

interface NodeProps {
  _type?: string;
  visited?: boolean;
  taken?: boolean;
}

const Node: React.FC<NodeProps> = ({
  _type = INACTIVE,
  visited = false,
  taken = false,
}) => {
  const [type, setType] = useState<string>(_type);
  const [style, setStyle] = useState<string>(INACTIVE);

  useEffect(() => {
    if (taken) setStyle(TAKEN);
    else if (visited) setStyle(VISITED);
    else setStyle(type);
  }, [type, visited, taken]);

  return (
    <div
      aria-label="Node"
      role="button"
      tabIndex={0}
      onClick={handleTypeChange}
      onKeyPress={(e) => {
        if (e.keyCode === ENTER || e.keyCode === SPACE) {
          handleTypeChange();
        }
      }}
      className={style}
      // className={taken ? TAKEN : visited ? VISITED type}
    />
  );
};

export default Node;
