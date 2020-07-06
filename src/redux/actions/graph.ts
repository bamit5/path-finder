import { GraphConstants } from '../constants';

const resetGraph = () => ({
  type: GraphConstants.RESET,
});

const doneResetting = () => ({
  type: GraphConstants.DONE_RESETTING,
});

const setSuccess = (success: boolean) => ({
  type: GraphConstants.SET_SUCCESS,
  message: success,
});

const graphActions = {
  resetGraph,
  doneResetting,
  setSuccess,
};

export default graphActions;
