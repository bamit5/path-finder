import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// TODO
// eslint-disable-next-line sort-imports
import './Node.scss';
import { ENTER, SPACE, nodeStyles } from '../../constants/constants';
// TODO
// eslint-disable-next-line import/named
import { ModeType, Modes, NodeType, Nodes } from '../../redux/constants';
import { RootState } from '../../redux/reducers';

interface NodeProps {
  _style?: string;
  visited?: boolean;
  taken?: boolean;
}

interface StateProps {
  mode: ModeType;
  settingNodeType: NodeType;
}

const Node: React.FC<NodeProps & StateProps> = ({
  _style = nodeStyles.INACTIVE,
  visited = false,
  taken = false,
  mode,
  settingNodeType,
}) => {
  const [style, setStyle] = useState<string>(_style);

  useEffect(() => {
    if (taken) setStyle(nodeStyles.TAKEN);
    else if (visited) setStyle(nodeStyles.VISITED);
    else setStyle(_style);
  }, [_style, visited, taken]);

  const updateStyle = () => {
    // only update style if the node is not taken, not visited, and the mode allows for user changes
    if (!taken && !visited && mode === Modes.EDITING) {
      if (style !== nodeStyles.INACTIVE) {
        // toggle inactive
        setStyle(nodeStyles.INACTIVE);
      } else {
        // find correct node type to set
        switch (settingNodeType) {
          case Nodes.SETTING_WALL_NODES:
            setStyle(nodeStyles.WALL);
            break;

          case Nodes.SETTING_START_NODE:
            setStyle(nodeStyles.START);
            break;

          case Nodes.SETTING_END_NODE:
            setStyle(nodeStyles.END);
            break;

          case Nodes.SETTING_BRIDGE_NODES:
            setStyle(nodeStyles.BRIDGE);
            break;

          default:
          // TODO
        }
      }
    }
  };

  return (
    <div
      aria-label="Node"
      role="button"
      tabIndex={0}
      onClick={updateStyle}
      onKeyPress={(e) => {
        if (e.key === ENTER || e.key === SPACE) {
          updateStyle();
        }
      }}
      className={style}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
  settingNodeType: state.mode.settingNodeType,
});

export default connect(mapStateToProps)(Node);
