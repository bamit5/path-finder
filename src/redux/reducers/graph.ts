import { AnyAction } from 'redux';
import { GraphConstants } from '../constants';
import { NodeData } from '../../constants/constants';

export interface GraphState {
  startNode: NodeData | null;
  endNode: NodeData | null;
}

const initialState: GraphState = {
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

    case GraphConstants.RESET_START_NODE:
      return {
        ...state,
        startNode: null,
      };

    case GraphConstants.SET_END_NODE:
      return {
        ...state,
        endNode: action.message,
      };

    case GraphConstants.RESET_END_NODE:
      return {
        ...state,
        endNode: null,
      };

    default:
      return state;
  }
};

export default graph;
