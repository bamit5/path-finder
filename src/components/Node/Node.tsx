import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Node.scss';
import { ENTER, SPACE, nodeTypes } from '../../constants/constants';
import { RootState } from '../../redux/reducers';
import { ModeType, NodeType } from '../../redux/constants';

const { INACTIVE, WALL, START, END, BRIDGE, VISITED, TAKEN } = nodeTypes;

interface NodeProps {
  _type?: string;
  visited?: boolean;
  taken?: boolean;
}

interface StateProps {
  mode: ModeType;
  nodeType: NodeType;
}

const Node: React.FC<NodeProps & StateProps> = ({
  _type = INACTIVE,
  visited = false,
  taken = false,
  mode,
  nodeType,
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

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
  nodeType: state.mode.nodeType,
});

export default connect(mapStateToProps)(Node);
