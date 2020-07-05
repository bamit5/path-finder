import { GraphConstants } from '../constants';
import { Point } from '../../constants/constants';

const setStartNode = (startNode: Point | null) => ({
  type: GraphConstants.SET_START_NODE,
  message: startNode,
});

const setEndNode = (endNode: Point | null) => ({
  type: GraphConstants.SET_END_NODE,
  message: endNode,
});

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
  setStartNode,
  setEndNode,
  resetGraph,
  doneResetting,
  setSuccess,
};

export default graphActions;
