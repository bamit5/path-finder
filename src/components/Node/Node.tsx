import React, { useEffect, useState } from 'react';
import './Node.scss';

import { ENTER, SPACE, nodeTypes } from '../../constants/constants';

const { INACTIVE, WALL, START, END, BRIDGE, VISITED, TAKEN } = nodeTypes;

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
      onClick={() => setType(type !== INACTIVE ? INACTIVE : WALL)} // TODO add functionality for other types too
      onKeyPress={(e) => {
        console.log(e.key);
        if (e.key === ENTER || e.key === SPACE) {
          // TODO add functionality for other types too
          setType(type !== INACTIVE ? INACTIVE : WALL);
        }
      }}
      className={style}
    />
  );
};

export default Node;
