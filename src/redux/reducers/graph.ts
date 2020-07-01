import { List } from 'immutable';
import { AnyAction } from 'redux';
import { GraphConstants } from '../constants';
import {
  ChangeableNodeData,
  Graph,
  NodeData,
  Point,
  defaultNode,
} from '../../constants/constants';

export interface GraphState {
  graph: Graph;
  startNode: Point | null;
  endNode: Point | null;
}

const initGraph = (width: number, height: number): Graph => {
  const init = List<List<NodeData>>(
    Array(width).fill(Array(height).fill(defaultNode)),
  );
  return init;
};

const initialState: GraphState = {
  graph: initGraph(0, 0),
  startNode: null,
  endNode: null,
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

    case GraphConstants.INIT_GRAPH: {
      const { width, height } = action.message;
      return {
        ...state,
        graph: initGraph(width, height),
      };
    }

    case GraphConstants.CHANGE_NODE: {
      const change: ChangeableNodeData = action.message;
      return {
        ...state,
        graph: state.graph.updateIn(
          [change.x, change.y],
          (original): NodeData => ({
            // can't change
            x: original.x,
            y: original.y,
            dist: original.dist,
            prev: original.prev,
            // can change
            type: change.type ? change.type : original.type,
            visited: change.visited ? change.visited : original.visited,
            taken: change.taken ? change.taken : original.taken,
          }),
        ),
      };
    }

    default:
      return state;
  }
};

export default graph;