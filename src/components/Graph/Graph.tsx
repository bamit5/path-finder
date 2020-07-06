import React, {
  Dispatch,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';

import './Graph.scss';

import _ from 'underscore';

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
  settingNodeType: NodeType;
  reset: boolean;
}

interface DispatchProps {
  setMode: (mode: ModeType) => void;
  doneResetting: () => void;
  setGraphSuccess: (s: boolean) => void;
}

const Graph: React.FC<GraphProps & StateProps & DispatchProps> = ({
  width,
  height,
  mode,
  settingNodeType,
  reset,
  setMode,
  doneResetting,
  setGraphSuccess,
}) => {
  // Please Note: I'm using useRef instead of useState because it updates faster
  // and rerender doesn't depend on these values (re-render isn't efficient
  // enough for this, so I set the class name directly with refs)

  // used for drag to select
  const selectedType = useRef<string | null>(null);

  // default start and end node values
  const defaultStartNode = () => ({
    x: Math.floor(width / 4),
    y: Math.floor(height / 2),
  });
  const defaultEndNode = () => ({
    x: Math.floor((width * 3) / 4),
    y: Math.floor(height / 2),
  });

  // keep track of start, end, and bridge node
  const startNode = useRef<Point>(defaultStartNode());
  const endNode = useRef<Point>(defaultEndNode());
  const bridgeNode = useRef<Point | null>(null);

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

  // resizes graph, keeping previous values (if they exist)
  const resizeGraph = () => {
    // create new graph
    setNodeRefs(
      Array(width)
        .fill(null)
        .map(
          (_, x) =>
            Array(height)
              .fill(null)
              .map((__, y) => nodeRefs[x][y] || createRef<HTMLDivElement>()), // todo is there an error is x/y are out of bounds?
        ),
    );
  };

  useEffect(() => {
    // resize graph whenever width or height changes
    resizeGraph();
  }, [width, height]);

  useEffect(() => {
    // handle solving and visualzing
    if (
      mode === ModeConstants.SOLVING &&
      startNode.current &&
      endNode.current
    ) {
      // solve with dijkstras // TODO change the algorithm type to be dynamic eventually
      const { nodesVisited, nodesTaken } = Dijkstras.solve(
        nodeRefs.map((row) =>
          row.map((ref) =>
            ref.current ? ref.current.className : nodeStyles.INACTIVE,
          ),
        ), // TODO need to setup graph correctly in dijkstras! and change the file accordingly
        startNode.current,
        endNode.current,
        bridgeNode.current || undefined,
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

      // reset start/end Nodes
      startNode.current = defaultStartNode();
      endNode.current = defaultEndNode();

      doneResetting();
    }
  }, [reset]);

  // TODO
  const isChangeableNode = (x, y) =>
    !(
      _.isEqual({ x, y }, startNode.current) ||
      _.isEqual({ x, y }, endNode.current) ||
      _.isEqual({ x, y }, bridgeNode.current)
    );

  const handleClick = (
    ref: RefObject<HTMLDivElement>,
    x: number,
    y: number,
  ) => {
    // only update style if the mode allows for user changes and the clicked node has a ref
    if (mode === ModeConstants.EDITING && ref.current) {
      switch (selectedType.current) {
        case nodeStyles.START: {
          // clicked node needs to change and start node's ref must exist
          const rStartNode = nodeRefs[startNode.current.x][startNode.current.y];
          if (!isChangeableNode(x, y) || !rStartNode.current) break;

          // revert style of previous start node
          rStartNode.current.className = nodeStyles.INACTIVE; // TODO add a previous to keep track of the previous style

          // set new start node
          ref.current.className = nodeStyles.START;
          startNode.current = { x, y };
          break;
        }

        case nodeStyles.END: {
          // clicked node needs to change and end node's ref must exist
          const rEndNode = nodeRefs[endNode.current.x][endNode.current.y];
          if (!isChangeableNode(x, y) || !rEndNode.current) break;

          // revert style of previous end node
          rEndNode.current.className = nodeStyles.INACTIVE; // TODO add a previous to keep track of the previous style

          // set new end node
          ref.current.className = nodeStyles.END;
          endNode.current = { x, y };
          break;
        }

        case nodeStyles.BRIDGE: {
          // clicked node cannot be start or end node
          if (
            _.isEqual({ x, y }, startNode.current) ||
            _.isEqual({ x, y }, endNode.current)
          )
            break;

          if (!bridgeNode.current) {
            // if bridge node doesn't exist yet, then set clicked node to the bridge node
            ref.current.className = nodeStyles.BRIDGE;
            bridgeNode.current = { x, y };
          } else {
            // bridge node's ref must exist
            const rBridgeNode =
              nodeRefs[bridgeNode.current.x][bridgeNode.current.y];
            if (!rBridgeNode || !rBridgeNode.current) break;

            // revert style of previous bridge node
            rBridgeNode.current.className = nodeStyles.INACTIVE;

            // either set clicked node to bridge node or inactive (if it was previously bridge node)
            if (_.isEqual({ x, y }, bridgeNode.current)) {
              rBridgeNode.current.className = nodeStyles.INACTIVE;
              bridgeNode.current = null;
            } else {
              rBridgeNode.current.className = nodeStyles.INACTIVE;
              ref.current.className = nodeStyles.BRIDGE;
              bridgeNode.current = { x, y };
            }
          }
          break;
        }

        // wall node case
        default: {
          // clicked node needs to change
          if (!isChangeableNode(x, y)) break;

          // set to inactive if it was already a wall, otherwise set it to a wall
          ref.current.className =
            ref.current.className === nodeStyles.INACTIVE
              ? nodeStyles.WALL
              : nodeStyles.INACTIVE;
          break;
        }
      }
    }
  };

  return (
    <div
      role="application"
      aria-label="Graph that contains the nodes"
      className="graph-wrapper"
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
                // update which type of node to drag on
                console.log(ref.current ? ref.current.className : ref);
                selectedType.current =
                  ref.current && ref.current.className !== nodeStyles.INACTIVE
                    ? ref.current.className
                    : settingNodeType;
                handleClick(ref, x, y);
              }}
              onMouseUp={async () => {
                // turn off dragging
                selectedType.current = null;
              }}
              onMouseEnter={async () => {
                // when dragging into a node
                if (selectedType.current) handleClick(ref, x, y);
              }}
              onKeyPress={async (e) => {
                if (e.key === ENTER || e.key === SPACE) {
                  selectedType.current = null;
                  handleClick(ref, x, y);
                }
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  mode: state.mode.mode,
  settingNodeType: state.mode.settingNodeType,
  reset: state.graph.reset,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  doneResetting: () => dispatch(graphActions.doneResetting()),
  setGraphSuccess: (s) => dispatch(graphActions.setSuccess(s)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
