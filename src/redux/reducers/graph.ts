import { AnyAction } from 'redux';

import { GraphConstants } from '../constants';

export interface GraphState {
  reset: boolean;
  success: boolean;
}

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
