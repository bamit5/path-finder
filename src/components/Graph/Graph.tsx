import React, {
  Dispatch,
  RefObject,
  createRef,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import './Graph.scss';

import {
  ChangeableNodeData,
  ENTER,
  NodeData,
  Point,
  SPACE,
  Graph as StateGraph,
  nodeStyles,
} from '../../constants/constants';
import { RootState } from '../../redux/reducers';
import graphActions from '../../redux/actions/graph';
import { ModeConstants, ModeType, NodeType } from '../../redux/constants';
import Dijkstras from '../../algorithms/Dijkstras';

interface GraphProps {
  width: number;
  height: number;
}

interface StateProps {
  mode: ModeType;
  graph: StateGraph;
  startNode: Point | null;
  endNode: Point | null;
  settingNodeType: NodeType;
}

interface DispatchProps {
  initGraph: (width: number, height: number) => void;
  changeNode: (change: ChangeableNodeData) => void;
  setStartNode: (startNode: Point | null) => void;
  setEndNode: (endNode: Point | null) => void;
}

const Graph: React.FC<GraphProps & StateProps & DispatchProps> = forwardRef(
  ({
    width,
    height,
    mode,
    graph,
    startNode,
    endNode,
    settingNodeType,
    initGraph,
    setStartNode,
    setEndNode,
    changeNode,
  }) => {
    // dragging used for drag to select
    const [dragging, setDragging] = useState(false);
    // used for animations
    const [nodeRefs, setNodeRefs] = useState<RefObject<HTMLDivElement>[]>(
      Array(width * height)
        .fill(null)
        .map(() => createRef<HTMLDivElement>()),
    );

    useEffect(() => {
      // create initial graph
      initGraph(width, height);
      // update references
      setNodeRefs(
        Array(width * height)
          .fill(null)
          .map((_, i) => nodeRefs[i] || createRef<HTMLDivElement>()),
      );
    }, [width, height]);

    useEffect(() => {
      if (mode === ModeConstants.SOLVING && startNode && endNode) {
        // solve with dijkstras // TODO change the algorithm type to be dynamic eventually
        const { nodesVisited, nodesTaken } = Dijkstras.solve(
          graph.toJS(),
          startNode,
          endNode,
        );

        console.log('visited:');
        console.log(nodesVisited);
        console.log('taken');
        console.log(nodesTaken);

        console.log('setting visited nodes:');
        nodesVisited.map((node, i) => {
          console.log(node);
          const ref = nodeRefs[node.x * height + node.y].current;
          if (ref) {
            setTimeout(() => {
              console.log(`visited: ${node}`);
              ref.className = 'visited-node';
            }, i * 30);
          }
          return 1;
        });

        console.log('setting taken nodes');
        nodesTaken.map((node, i) => {
          console.log(node);
          const ref = nodeRefs[node.x * height + node.y].current;
          if (ref) {
            setTimeout(() => {
              console.log(`taken: ${node}`);
              ref.className = 'taken-node';
            }, nodesVisited.length * 30 + i * 30);
          }
          return 1;
        });
      }
    }, [mode]);

    const handleClick = ({ x, y, type }: NodeData) => {
      // only update style if the mode allows for user changes
      if (mode === ModeConstants.EDITING) {
        // check if should remove this node from any of the redux states
        if (_.isEqual({ x, y }, startNode)) setStartNode(null);
        if (_.isEqual({ x, y }, endNode)) setEndNode(null);
        // TODO if (bridgeNodes.includes(ref)) /* TODO change this to be in redux */bridgeNodes.remove(ref)

        if (type !== nodeStyles.INACTIVE) {
          // toggle inactive
          changeNode({ x, y, type: nodeStyles.INACTIVE });
        } else {
          // always set the type to settingNodeType
          changeNode({ x, y, type: settingNodeType });
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
              setStartNode({ x, y });
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
              setEndNode({ x, y });
              break;

            case ModeConstants.SETTING_BRIDGE_NODES:
              // TODO
              break;
          }
        }
      }
    };

    return (
      // TODO
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        role="application"
        aria-label="Graph that contains the nodes"
        className="graph-wrapper"
        // TODO check async? might create problems
        onMouseDown={async () => setDragging(true)}
        onMouseUp={async () => setDragging(false)}
      >
        {graph.map((row, x) => (
          <div>
            {row.map((node, y) => (
              // create a node for each index in the 2d array
              <div
                aria-label="Node"
                role="button"
                tabIndex={0}
                ref={nodeRefs[x * height + y]}
                className={node.type}
                onMouseDown={async () => {
                  if (!dragging) handleClick(node);
                }}
                onMouseEnter={async () => {
                  if (dragging) handleClick(node);
                }}
                onKeyPress={async (e) => {
                  if (e.key === ENTER || e.key === SPACE) {
                    handleClick(node);
                  }
                }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  },
);

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
  graph: state.graph.graph,
  startNode: state.graph.startNode,
  endNode: state.graph.endNode,
  settingNodeType: state.mode.settingNodeType,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  initGraph: (width, height) => dispatch(graphActions.initGraph(width, height)),
  changeNode: (change) => dispatch(graphActions.changeNode(change)),
  setStartNode: (startNode) => dispatch(graphActions.setStartNode(startNode)),
  setEndNode: (endNode) => dispatch(graphActions.setEndNode(endNode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
