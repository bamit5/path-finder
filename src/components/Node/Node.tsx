import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
// TODO
// eslint-disable-next-line sort-imports
import './Node.scss';
import _ from 'underscore';
import graphActions from '../../redux/actions/graph';
import { ENTER, Point, SPACE, nodeStyles } from '../../constants/constants';
// TODO
// eslint-disable-next-line import/named
import { ModeConstants, ModeType, NodeType } from '../../redux/constants';
import { RootState } from '../../redux/reducers';

interface NodeProps {
  point: Point;
  visited: boolean;
  taken: boolean;
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
}

const Node: React.FC<NodeProps & StateProps & DispatchProps> = ({
  point,
  visited,
  taken,
  mode,
  settingNodeType,
  startNode,
  endNode,
  setStartNode,
  setEndNode,
}) => {
  const [style, setStyle] = useState<string>(nodeStyles.INACTIVE); // TODO useReducer?

  useEffect(() => {
    if (taken) setStyle(nodeStyles.TAKEN);
    else if (visited) setStyle(nodeStyles.VISITED);
    else setStyle(style);
  }, [style, visited, taken]);

  const handleClick = () => {
    console.log('handling click');
    // only update style if the mode allows for user changes
    if (/* TODO !taken && !visited && */ mode === ModeConstants.EDITING) {
      console.log('mode = editing');
      // check if should remove this node from any of the redux states
      if (_.isEqual(point, startNode)) {
        setStartNode(null);
        console.log('clicked node was the start node (but no longer!)'); // TODO remove console logs eventually
      }
      if (_.isEqual(point, endNode)) {
        setEndNode(null);
        console.log('clicked node was the end node (but no longer!)');
      }
      // TODO if (bridgeNodes.includes(ref)) /* TODO change this to be in redux */bridgeNodes.remove(ref)

      if (style !== nodeStyles.INACTIVE) {
        console.log('setting the style of clicked node to INACTIVE');
        // toggle inactive
        setStyle(nodeStyles.INACTIVE);
      } else {
        // eslint-disable-next-line default-case
        switch (settingNodeType) {
          case ModeConstants.SETTING_START_NODE:
            // reset previous start node's style (if it exists), and set this node to current start node
            if (startNode) {
              // TODO startNode.setStyle(nodeStyles.INACTIVE);
              console.log(
                'previous start nodes style is being set to INACTIVE',
              );
            }
            console.log('clicked node is being set to start node!');
            setStartNode(point);
            break;

          case ModeConstants.SETTING_END_NODE:
            // reset previous end node's style (if it exists), and set this node to current end node
            // TODO if (endNode) endNode.setStyle(nodeStyles.INACTIVE);
            setEndNode(point);
            break;

          case ModeConstants.SETTING_BRIDGE_NODES:
            // TODO
            break;
        }
        // always set the style to settingNodeType
        setStyle(settingNodeType);
      }
    }
  };

  return (
    <div
      aria-label="Node"
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyPress={(e) => {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
