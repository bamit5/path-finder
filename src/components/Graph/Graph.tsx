import React, {
  Dispatch,
  RefObject,
  createRef,
  useEffect,
  useRef,
} from 'react';
import { connect } from 'react-redux';

import './Graph.scss';

import _ from 'underscore';

import { ENTER, Point, SPACE, nodeStyles } from '../../constants/constants';
import { RootState } from '../../redux/reducers';
import graphActions from '../../redux/actions/graph';
import {
  ModeConstants,
  ModeType,
  SpeedType,
  WallNodeType,
} from '../../redux/constants';
import Dijkstras from '../../algorithms/Dijkstras';
import AStar from '../../algorithms/AStar';
import BFS from '../../algorithms/BFS';
import modeActions from '../../redux/actions/mode';
import { SolvingAlgorithmType } from '../../redux/constants/mode';

interface GraphProps {
  width: number;
  height: number;
}

interface StateProps {
  mode: ModeType;
  wallNodeType: WallNodeType;
  reset: boolean;
  clearPath: boolean;
  alg: SolvingAlgorithmType;
  bridgeNodeExists: boolean;
  speedStr: SpeedType;
}

interface DispatchProps {
  setMode: (mode: ModeType) => void;
  doneResetting: () => void;
  doneClearingPath: () => void;
  setGraphSuccess: (s: boolean) => void;
}

const Graph: React.FC<GraphProps & StateProps & DispatchProps> = ({
  width,
  height,
  mode,
  wallNodeType,
  reset,
  clearPath,
  alg,
  bridgeNodeExists,
  speedStr,
  setMode,
  doneResetting,
  doneClearingPath,
  setGraphSuccess,
}) => {
  // Please Note: I'm using useRef instead of useState because it updates faster
  // and rerender doesn't depend on these values (re-render isn't efficient
  // enough for this, so I set the class name directly with refs)

  // used for drag to select
  const selectedType = useRef<string | null>(null);

  // default start/end/bridge node values
  const defaultStartNode = () => ({
    x: Math.floor(width / 4),
    y: Math.floor(height / 2),
  });
  const defaultEndNode = () => ({
    x: Math.floor((width * 3) / 4),
    y: Math.floor(height / 2),
  });
  const defaultBridgeNode = () => ({
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
  });

  // keep track of start, end, and bridge node
  const startNode = useRef<Point>(defaultStartNode());
  const endNode = useRef<Point>(defaultEndNode());
  const bridgeNode = useRef<Point | null>(null);

  // nodeRefs used for animations (not using useState because setState is async and not awaitable)
  const nodeRefs = useRef<RefObject<HTMLDivElement>[][]>(
    Array(width)
      .fill(null)
      .map(() =>
        Array(height)
          .fill(null)
          .map(() => createRef<HTMLDivElement>()),
      ),
  );
  // gets the nodeRefs
  const getNodeRefs = () => nodeRefs.current;
  // sets the nodeRefs
  const setNodeRefs = (newNodeRefs: RefObject<HTMLDivElement>[][]) => {
    nodeRefs.current = newNodeRefs;
  };
  const getNodeRef = (p: Point) => getNodeRefs()[p.x][p.y].current;

  // functions to get current start/end/bridge node
  const getStartRef = () => getNodeRef(startNode.current);
  const getEndRef = () => getNodeRef(endNode.current);
  const getBridgeRef = () =>
    bridgeNode.current ? getNodeRef(bridgeNode.current) : null;

  // functions to set new start/end/bridge nodes (also updates the pre/new ref's)
  const setStartNode = (p: Point) => {
    // reset previous start node
    let startRef = getStartRef();
    if (startRef) startRef.className = nodeStyles.INACTIVE;

    // make new start node
    startNode.current = p;
    startRef = getStartRef();
    if (startRef) startRef.className = nodeStyles.START;
  };

  const setEndNode = (p: Point) => {
    // reset previous end node
    let endRef = getEndRef();
    if (endRef) endRef.className = nodeStyles.INACTIVE;

    // make new end node
    endNode.current = p;
    endRef = getEndRef();
    if (endRef) endRef.className = nodeStyles.END;
  };

  const setBridgeNode = (p: Point | null) => {
    // reset previous bridge node
    let bridgeRef = getBridgeRef();
    if (bridgeRef) bridgeRef.className = nodeStyles.INACTIVE;

    // make new bridge node
    bridgeNode.current = p;
    bridgeRef = getBridgeRef();
    if (bridgeRef) bridgeRef.className = nodeStyles.BRIDGE;
  };

  useEffect(() => {
    // resize graph whenever width or height changes, keeping possible previous values
    setNodeRefs(
      Array(width)
        .fill(null)
        .map((_, x) =>
          Array(height)
            .fill(null)
            .map(
              (__, y) =>
                // use previous value if it exists, otherwise create a new one
                (x < getNodeRefs().length &&
                  y < getNodeRefs()[x].length &&
                  getNodeRefs()[x][y]) ||
                createRef<HTMLDivElement>(),
            ),
        ),
    );

    // reset start/end/bridge node
    setStartNode(defaultStartNode());
    setEndNode(defaultEndNode());
    setBridgeNode(null);
  }, [width, height]);

  useEffect(() => {
    // if the algorithm changes to a non-weighted algorithm, then replace brick/hay nodes with regular wall nodes
    if (mode === ModeConstants.EDITING) {
      if (alg === ModeConstants.BFS) {
        getNodeRefs().forEach((row) => {
          row.forEach((ref) => {
            if (
              ref.current &&
              (ref.current.className === nodeStyles.BRICK_WALL ||
                ref.current.className === nodeStyles.HAY_WALL)
            )
              ref.current.className = nodeStyles.WALL;
          });
        });
      } else {
        getNodeRefs().forEach((row) => {
          row.forEach((ref) => {
            if (ref.current && ref.current.className === nodeStyles.WALL)
              ref.current.className = nodeStyles.BRICK_WALL;
          });
        });
      }
    }
  }, [alg]);

  useEffect(() => {
    // handle solving and visualzing
    if (mode === ModeConstants.SOLVING) {
      // find which algorithm to use for solving
      let solve: Function;
      switch (alg) {
        case ModeConstants.BFS:
          solve = BFS.solve;
          break;

        case ModeConstants.DIJKSTRAS:
          solve = Dijkstras.solve;
          break;

        // A* algorithm is default
        default:
          solve = AStar.solve;
      }

      // solve with the user chosen algorithm
      const {
        nodesVisitedFirst,
        nodesTakenFirst,
        nodesVisitedSecond,
        nodesTakenSecond,
      } = solve(
        getNodeRefs().map((row) =>
          row.map((ref) =>
            ref.current ? ref.current.className : nodeStyles.INACTIVE,
          ),
        ),
        startNode.current,
        endNode.current,
        bridgeNode.current || undefined,
      );

      // set graph success and begin visualizing
      setGraphSuccess(
        nodesTakenFirst.length > 0 &&
          (!nodesTakenSecond || nodesTakenSecond.length > 0),
      );
      setMode(ModeConstants.VISUALIZING);

      // get the speed of visualizing
      let speed;
      switch (speedStr) {
        case ModeConstants.SLOW:
          speed = 50; // TODO put in constants?
          break;

        case ModeConstants.FAST:
          speed = 30;
          break;

        case ModeConstants.FLASH:
          speed = 5;
          break;

        // immediate case is handled in maps (you shouldn't have any timeouts for immediate case)
        default:
          speed = 0;
      }

      // visualize visited nodes
      const nVFTotalTimeout = nodesVisitedFirst.length * speed;
      nodesVisitedFirst.forEach((node, i) => {
        const ref = getNodeRef({ x: node.x, y: node.y });
        if (ref) {
          if (speed === 0) {
            ref.className = nodeStyles.VISITED_FIRST;
          } else {
            setTimeout(() => {
              ref.className = nodeStyles.VISITED_FIRST;
            }, i * speed);
          }
        }
      });

      // if there was a bridge node, visualize visited from bridge node to end node
      const nVSTotalTimeout = nodesVisitedSecond
        ? nodesVisitedSecond.length * speed
        : 0;
      if (nodesVisitedSecond) {
        nodesVisitedSecond.forEach((node, i) => {
          const ref = getNodeRef({ x: node.x, y: node.y });
          if (ref) {
            if (speed === 0) {
              ref.className = nodeStyles.VISITED_SECOND;
            } else {
              setTimeout(() => {
                ref.className = nodeStyles.VISITED_SECOND;
              }, nVFTotalTimeout + i * speed);
            }
          }
        });
      }

      // visualize taken nodes after visited nodes
      const nTFTotalTimeout = nodesTakenFirst.length * speed;
      nodesTakenFirst.forEach((node, i) => {
        const ref = getNodeRef({ x: node.x, y: node.y });
        if (ref) {
          if (speed === 0) {
            ref.className = nodeStyles.TAKEN_FIRST;
          } else {
            setTimeout(() => {
              ref.className = nodeStyles.TAKEN_FIRST;
            }, nVFTotalTimeout + nVSTotalTimeout + i * speed);
          }
        }
      });

      // if there was a bridge node, visualize taken from bridge node to end node
      const nTSTotalTimeout = nodesTakenSecond
        ? nodesTakenSecond.length * speed
        : 0;
      if (nodesTakenSecond) {
        nodesTakenSecond.forEach((node, i) => {
          const ref = getNodeRef({ x: node.x, y: node.y });
          if (ref) {
            if (speed === 0) {
              ref.className = nodeStyles.TAKEN_SECOND;
            } else {
              setTimeout(() => {
                ref.className = nodeStyles.TAKEN_SECOND;
              }, nVFTotalTimeout + nVSTotalTimeout + nTFTotalTimeout + i * speed);
            }
          }
        });
      }

      // graph is completed when done visualizing all visited and taken nodes
      if (speed === 0) {
        setMode(ModeConstants.COMPLETED);
      } else {
        setTimeout(
          () => setMode(ModeConstants.COMPLETED),
          nVFTotalTimeout + nVSTotalTimeout + nTFTotalTimeout + nTSTotalTimeout,
        );
      }
    }
  }, [mode]);

  useEffect(() => {
    // handle resetting
    if (reset) {
      // reset graph styles
      getNodeRefs().forEach((row) =>
        row.forEach((ref) => {
          if (ref.current) ref.current.className = nodeStyles.INACTIVE;
        }),
      );

      // reset start/end/bridge node
      setStartNode(defaultStartNode());
      setEndNode(defaultEndNode());
      setBridgeNode(null);

      doneResetting();
    }
  }, [reset]);

  useEffect(() => {
    // handle clearing the path
    if (clearPath) {
      // reset only searching/path nodes
      getNodeRefs().forEach((row) =>
        row.forEach((ref) => {
          if (
            ref.current &&
            (ref.current.className === nodeStyles.VISITED_FIRST ||
              ref.current.className === nodeStyles.VISITED_SECOND ||
              ref.current.className === nodeStyles.TAKEN_FIRST ||
              ref.current.className === nodeStyles.TAKEN_SECOND)
          ) {
            ref.current.className = nodeStyles.INACTIVE;
          }
        }),
      );

      doneClearingPath();
    }
  }, [clearPath]);

  // handle adding/removing bridge node
  useEffect(() => {
    // if bridge node should exist, set bridge node to default state, otherwise null
    setBridgeNode(bridgeNodeExists ? defaultBridgeNode() : null);
  }, [bridgeNodeExists]);

  // TODO
  const isChangeableNode = (point: Point) =>
    !(
      _.isEqual(point, startNode.current) ||
      _.isEqual(point, endNode.current) ||
      _.isEqual(point, bridgeNode.current)
    );

  const handleClick = (ref: RefObject<HTMLDivElement>, point: Point) => {
    // only update style if the mode allows for user changes and the clicked node has a ref
    if (mode === ModeConstants.EDITING && ref.current) {
      switch (selectedType.current) {
        case nodeStyles.START:
          // if clicked node can change, set it to start node
          if (isChangeableNode(point)) setStartNode(point);
          break;

        case nodeStyles.END:
          // if clicked node can change, set it to end node
          if (isChangeableNode(point)) setEndNode(point);
          break;

        case nodeStyles.BRIDGE:
          // clicked node cannot be start or end node (but it can be bridge node)
          if (isChangeableNode(point)) setBridgeNode(point);
          break;

        // wall node case
        default:
          // check if clicked node can change
          if (isChangeableNode(point)) {
            // set to inactive if it was already a wall, otherwise set it to a wall
            if (ref.current.className === nodeStyles.INACTIVE) {
              // if chosen algorithm is non-weighted, use normal wall nodes
              ref.current.className =
                alg === ModeConstants.BFS ? nodeStyles.WALL : wallNodeType;
            } else {
              ref.current.className = nodeStyles.INACTIVE;
            }
          }
          break;
      }
    }
  };

  return (
    <div
      role="application"
      aria-label="Graph that contains the nodes"
      className="graph-wrapper"
    >
      {getNodeRefs().map((row, x) => (
        <div>
          {row.map((ref, y) => (
            // create a node for each index in the 2d array
            <div
              aria-label="Node"
              role="button"
              tabIndex={0}
              ref={ref}
              className={
                (ref.current && ref.current.className) || nodeStyles.INACTIVE
              }
              onMouseDown={async () => {
                // update which type of node to drag on
                selectedType.current =
                  ref.current && ref.current.className !== nodeStyles.INACTIVE
                    ? ref.current.className
                    : wallNodeType;
                handleClick(ref, { x, y });
              }}
              onMouseUp={async () => {
                // turn off dragging
                selectedType.current = null;
              }}
              onMouseEnter={async () => {
                // when dragging into a node
                if (selectedType.current) handleClick(ref, { x, y });
              }}
              onKeyPress={async (e) => {
                if (e.key === ENTER || e.key === SPACE) {
                  selectedType.current = null;
                  handleClick(ref, { x, y });
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
  wallNodeType: state.mode.wallNodeType,
  reset: state.graph.reset,
  clearPath: state.graph.clear,
  alg: state.mode.solvingAlg,
  bridgeNodeExists: state.mode.bridgeNodeExists,
  speedStr: state.mode.speed,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  setMode: (mode) => dispatch(modeActions.setMode(mode)),
  doneResetting: () => dispatch(graphActions.setResetBoard(false)),
  doneClearingPath: () => dispatch(graphActions.setClearPath(false)),
  setGraphSuccess: (s) => dispatch(graphActions.setSuccess(s)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Graph);
