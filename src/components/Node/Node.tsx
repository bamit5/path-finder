import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// TODO
// eslint-disable-next-line sort-imports
import './Node.scss';
import _ from 'underscore';
import graphActions from '../../redux/actions/graph';
import {
  ChangeableNodeData,
  ENTER,
  Point,
  SPACE,
  nodeStyles,
} from '../../constants/constants';
// TODO
// eslint-disable-next-line import/named
import { ModeConstants, ModeType, NodeType } from '../../redux/constants';
import { RootState } from '../../redux/reducers';

interface NodeProps {
  point: Point;
  type: string;
  visited: boolean;
  taken: boolean;
  dragging: boolean;
}

interface StateProps {
  mode: ModeType;
  settingNodeType: NodeType;
  startNode: Point | null;
  endNode: Point | null;
}

interface DispatchProps {
  setStartNode: (startNode: Point | null) => void;
  setEndNode: (endNode: Point | null) => void;
  changeNode: (change: ChangeableNodeData) => void;
}

const Node: React.FC<NodeProps & StateProps & DispatchProps> = ({
  point,
  type,
  visited,
  taken,
  dragging,
  mode,
  settingNodeType,
  startNode,
  endNode,
  setStartNode,
  setEndNode,
  changeNode,
}) => {
  const [style, setStyle] = useState<string>(type);
  const setType = (_type: string) =>
    changeNode({ x: point.x, y: point.y, type: _type });

  useEffect(() => {
    console.log(visited);
    if (taken) setStyle(nodeStyles.TAKEN);
    else if (visited) setStyle(nodeStyles.VISITED);
    else setStyle(type);
  }, [visited, taken, type]);

  const handleClick = () => {
    // only update style if the mode allows for user changes
    if (mode === ModeConstants.EDITING) {
      // check if should remove this node from any of the redux states
      if (_.isEqual(point, startNode)) setStartNode(null);
      if (_.isEqual(point, endNode)) setEndNode(null);
      // TODO if (bridgeNodes.includes(ref)) /* TODO change this to be in redux */bridgeNodes.remove(ref)

      if (style !== nodeStyles.INACTIVE) {
        // toggle inactive
        setType(nodeStyles.INACTIVE);
      } else {
        // always set the type to settingNodeType
        setType(settingNodeType);
        // eslint-disable-next-line default-case
        switch (settingNodeType) {
          case ModeConstants.SETTING_START_NODE:
            // reset previous start node's style (if it exists)
            if (startNode) {
              changeNode({
                x: startNode.x,
                y: startNode.y,
                type: nodeStyles.INACTIVE,
              });
            }
            // set this node to start node
            setStartNode(point);
            break;

          case ModeConstants.SETTING_END_NODE:
            // reset previous end node's style (if it exists)
            if (endNode) {
              changeNode({
                x: endNode.x,
                y: endNode.y,
                type: nodeStyles.INACTIVE,
              });
            }
            // set this node to end node
            setEndNode(point);
            break;

          case ModeConstants.SETTING_BRIDGE_NODES:
            // TODO
            break;
        }
      }
    }
  };

  return (
    <div
      aria-label="Node"
      role="button"
      tabIndex={0}
      // TODO check about the async... might create problems?
      onMouseDown={async () => {
        if (!dragging) handleClick();
      }}
      onMouseEnter={async () => {
        if (dragging) handleClick();
      }}
      onKeyPress={async (e) => {
        if (e.key === ENTER || e.key === SPACE) {
          handleClick();
        }
      }}
      className={style}
    />
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
  settingNodeType: state.mode.settingNodeType,
  startNode: state.graph.startNode,
  endNode: state.graph.endNode,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setStartNode: (startNode) => dispatch(graphActions.setStartNode(startNode)),
  setEndNode: (endNode) => dispatch(graphActions.setEndNode(endNode)),
  changeNode: (change) => dispatch(graphActions.changeNode(change)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
