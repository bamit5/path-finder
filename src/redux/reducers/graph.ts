import { AnyAction } from 'redux';
import { List } from 'immutable';
import { NodeData, defaultNode } from '../../constants/constants';
import { GraphConstants } from '../constants';

export interface GraphState {
  reset: boolean;
  success: boolean;
}

// TODO delete
const initGraph = (width: number, height: number) /* TODO: Graph */ => {
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
  reset: true,
  success: true,
};

const graph = (state = initialState, action: AnyAction) => {
  switch (action.type) {
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

    case GraphConstants.SET_SUCCESS:
      return {
        ...state,
        success: action.message,
      };

    default:
      return state;
  }
};

export default graph;
