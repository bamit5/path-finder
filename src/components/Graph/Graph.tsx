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
import modeActions from '../../redux/actions/mode';

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
  reset: boolean;
}

interface DispatchProps {
  initGraph: (width: number, height: number) => void;
  changeNode: (change: ChangeableNodeData) => void;
  setStartNode: (startNode: Point | null) => void;
  setEndNode: (endNode: Point | null) => void;
  setMode: (mode: ModeType) => void;
  doneResetting: () => void;
  setGraphSuccess: (s: boolean) => void;
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
    reset,
    initGraph,
    changeNode,
    setStartNode,
    setEndNode,
    setMode,
    doneResetting,
    setGraphSuccess,
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
      // handle solving and visualzing
      if (mode === ModeConstants.SOLVING && startNode && endNode) {
        // solve with dijkstras // TODO change the algorithm type to be dynamic eventually
        const { nodesVisited, nodesTaken } = Dijkstras.solve(
          graph.toJS(),
          startNode,
          endNode,
        );

        // set graph success and begin visualizing
        setGraphSuccess(nodesTaken.length > 0);
        setMode(ModeConstants.VISUALIZING);

        // visualizing visited nodes
        const speed = 30; // TODO
        nodesVisited.forEach((node, i) => {
          const ref = nodeRefs[node.x * height + node.y].current;
          if (ref) {
            setTimeout(() => {
              ref.className = 'visited-node';
            }, i * speed);
          }
        });

        // visualize taken nodes after visited nodes
        nodesTaken.forEach((node, i) => {
          const ref = nodeRefs[node.x * height + node.y].current;
          if (ref) {
            setTimeout(() => {
              ref.className = 'taken-node';
            }, nodesVisited.length * speed + i * speed);
          }
        });

        // graph is completed when done visualizing visited and taken nodes
        setTimeout(
          () => setMode(ModeConstants.COMPLETED),
          nodesVisited.length * speed + nodesTaken.length * speed,
        );
      }
    }, [mode]);

    useEffect(() => {
      // handle resetting
      if (reset) {
        // reset graph styles
        nodeRefs.forEach((node) => {
          if (node.current) node.current.className = nodeStyles.INACTIVE;
        });
        // get new graph // TODO is this needed? can you just have nodes be represented by their current className?
        initGraph(width, height);

        // reset start/end/bridge Nodes
        setStartNode(null);
        setEndNode(null);

        doneResetting();
      }
    }, [reset]);

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
  reset: state.graph.reset,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  initGraph: (width, height) => dispatch(graphActions.initGraph(width, height)),
  changeNode: (change) => dispatch(graphActions.changeNode(change)),
  setStartNode: (startNode) => dispatch(graphActions.setStartNode(startNode)),
  setEndNode: (endNode) => dispatch(graphActions.setEndNode(endNode)),
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  doneResetting: () => dispatch(graphActions.doneResetting()),
  setGraphSuccess: (s) => dispatch(graphActions.setSuccess(s)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
