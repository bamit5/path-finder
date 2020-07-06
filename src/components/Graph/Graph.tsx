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

import { ENTER, Point, SPACE, nodeStyles } from '../../constants/constants';
import { RootState } from '../../redux/reducers';
import graphActions from '../../redux/actions/graph';
import { ModeConstants, ModeType, NodeType } from '../../redux/constants';
import Dijkstras from '../../algorithms/Dijkstras';
// import AStar from '../../algorithms/AStar';
// import BFS from '../../algorithms/BFS';
import modeActions from '../../redux/actions/mode';

interface GraphProps {
  width: number;
  height: number;
}

interface StateProps {
  mode: ModeType;
  startNode: Point | null;
  endNode: Point | null;
  settingNodeType: NodeType;
  reset: boolean;
}

interface DispatchProps {
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
    startNode,
    endNode,
    settingNodeType,
    reset,
    setStartNode,
    setEndNode,
    setMode,
    doneResetting,
    setGraphSuccess,
  }) => {
    // dragging used for drag to select
    const [dragging, setDragging] = useState(false);
    // used for animations
    const [nodeRefs, setNodeRefs] = useState<RefObject<HTMLDivElement>[][]>(
      Array(width)
        .fill(null)
        .map(() =>
          Array(height)
            .fill(null)
            .map(() => createRef<HTMLDivElement>()),
        ),
    );

    useEffect(() => {
      // create new graph
      setNodeRefs(
        // TODO have this also be in reset. create a function for this?
        Array(width)
          .fill(null)
          .map((_, x) =>
            Array(height)
              .fill(null)
              .map((__, y) => nodeRefs[x][y] || createRef<HTMLDivElement>()),
          ),
      );
    }, [width, height]);

    useEffect(() => {
      // handle solving and visualzing
      if (mode === ModeConstants.SOLVING && startNode && endNode) {
        // solve with dijkstras // TODO change the algorithm type to be dynamic eventually
        const bridgeNodes: Point[] = [];
        nodeRefs.forEach((row, x) =>
          row.forEach((ref, y) => {
            if (ref.current && ref.current.className === nodeStyles.BRIDGE) {
              bridgeNodes.push({ x, y });
            }
          }),
        );
        const { nodesVisited, nodesTaken } = Dijkstras.solve(
          nodeRefs.map((row) =>
            row.map((ref) =>
              ref.current ? ref.current.className : nodeStyles.INACTIVE,
            ),
          ), // TODO need to setup graph correctly in dijkstras! and change the file accordingly
          startNode,
          endNode,
          bridgeNodes.length > 0 ? bridgeNodes[0] : undefined,
        );

        // set graph success and begin visualizing
        setGraphSuccess(nodesTaken.length > 0);
        setMode(ModeConstants.VISUALIZING);

        // visualizing visited nodes
        const speed = 30; // TODO dynamify
        nodesVisited.forEach((node, i) => {
          const ref = nodeRefs[node.x][node.y].current;
          if (ref) {
            setTimeout(() => {
              ref.className = 'visited-node';
            }, i * speed);
          }
        });

        // visualize taken nodes after visited nodes
        nodesTaken.forEach((node, i) => {
          const ref = nodeRefs[node.x][node.y].current;
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
        nodeRefs.forEach((row) =>
          row.forEach((ref) => {
            if (ref.current) ref.current.className = nodeStyles.INACTIVE;
          }),
        );
        // TODO have default start/end nodes here
        // reset start/end Nodes
        setStartNode(null);
        setEndNode(null);

        doneResetting();
      }
    }, [reset]);

    const handleClick = (
      ref: RefObject<HTMLDivElement>,
      x: number,
      y: number,
    ) => {
      // only update style if the mode allows for user changes
      if (mode === ModeConstants.EDITING && ref.current) {
        // check if should remove this node from any of the redux states
        if (_.isEqual({ x, y }, startNode)) setStartNode(null);
        if (_.isEqual({ x, y }, endNode)) setEndNode(null);
        // if (bridgeNodes.includes({ x, y })) /* TODO change this to be in redux */bridgeNodes.remove(ref)

        if (ref.current.className !== nodeStyles.INACTIVE) {
          // toggle inactive
          ref.current.className = nodeStyles.INACTIVE;
        } else {
          // always set the type to settingNodeType
          ref.current.className = settingNodeType;
          // eslint-disable-next-line default-case
          switch (settingNodeType) {
            case ModeConstants.SETTING_START_NODE:
              // reset previous start node's style (if it exists)
              if (startNode && nodeRefs[startNode.x][startNode.y].current) {
                nodeRefs[startNode.x][startNode.y].current!.className =
                  nodeStyles.INACTIVE;
              }
              // set this node to start node
              setStartNode({ x, y });
              break;

            case ModeConstants.SETTING_END_NODE:
              // reset previous end node's style (if it exists)
              if (endNode && nodeRefs[endNode.x][endNode.y].current) {
                nodeRefs[endNode.x][endNode.y].current!.className =
                  nodeStyles.INACTIVE;
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
        {nodeRefs.map((row, x) => (
          <div>
            {row.map((ref, y) => (
              // create a node for each index in the 2d array
              <div
                aria-label="Node"
                role="button"
                tabIndex={0}
                ref={ref}
                className={
                  (ref.current && ref.current.className) || nodeStyles.INACTIVE // TODO
                }
                onMouseDown={async () => {
                  if (!dragging) handleClick(ref, x, y);
                }}
                onMouseEnter={async () => {
                  if (dragging) handleClick(ref, x, y);
                }}
                onKeyPress={async (e) => {
                  if (e.key === ENTER || e.key === SPACE) {
                    handleClick(ref, x, y);
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
  startNode: state.graph.startNode,
  endNode: state.graph.endNode,
  settingNodeType: state.mode.settingNodeType,
  reset: state.graph.reset,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setStartNode: (startNode) => dispatch(graphActions.setStartNode(startNode)),
  setEndNode: (endNode) => dispatch(graphActions.setEndNode(endNode)),
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  doneResetting: () => dispatch(graphActions.doneResetting()),
  setGraphSuccess: (s) => dispatch(graphActions.setSuccess(s)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
