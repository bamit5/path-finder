import { AnyAction } from 'redux';

import { GraphConstants } from '../constants';

export interface GraphState {
  reset: boolean;
  clear: boolean;
  success: boolean;
}

const initialState: GraphState = {
  reset: true,
  clear: false,
  success: true,
};

const graph = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GraphConstants.SET_RESET_BOARD:
      return {
        ...state,
        reset: action.message,
      };

    case GraphConstants.SET_CLEAR_PATH:
      return {
        ...state,
        clear: action.message,
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
