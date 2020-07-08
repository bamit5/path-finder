import { GraphConstants } from '../constants';

const setResetBoard = (reset: boolean) => ({
  type: GraphConstants.SET_RESET_BOARD,
  message: reset,
});

const setClearPath = (clear: boolean) => ({
  type: GraphConstants.SET_CLEAR_PATH,
  message: clear,
});

const setSuccess = (success: boolean) => ({
  type: GraphConstants.SET_SUCCESS,
  message: success,
});

const graphActions = {
  setResetBoard,
  setClearPath,
  setSuccess,
};

export default graphActions;
