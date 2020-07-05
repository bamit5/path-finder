import { AnyAction } from 'redux';
import { List } from 'immutable';
import { Graph, NodeData, Point, defaultNode } from '../../constants/constants';
import { GraphConstants } from '../constants';

export interface GraphState {
  graph: Graph;
  startNode: Point | null;
  endNode: Point | null;
  reset: boolean;
}

// TODO delete
const initGraph = (width: number, height: number): Graph => {
  const initArr = Array(width).fill(width);
  for (let x = 0; x < initArr.length; x++) {
    initArr[x] = Array(height);
    for (let y = 0; y < initArr[x].length; y++) {
      initArr[x][y] = {
        ...defaultNode,
        x,
        y,
      };
    }
  }

  const init = List<List<NodeData>>(
    initArr,
    // Array(width).fill(Array(height).fill(defaultNode)),
    // TODO add an option to set a node to be the original node's type
  );
  return init;
};

const initialState: GraphState = {
  graph: initGraph(0, 0),
  startNode: null,
  endNode: null,
  reset: false,
};

const graph = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GraphConstants.SET_START_NODE:
      return {
        ...state,
        startNode: action.message,
      };

    case GraphConstants.SET_END_NODE:
      return {
        ...state,
        endNode: action.message,
      };

    case GraphConstants.RESET:
      return {
        ...state,
        reset: true,
      };

    case GraphConstants.DONE_RESETTING:
      return {
        ...state,
        reset: false,
      };

    default:
      return state;
  }
};

export default graph;
