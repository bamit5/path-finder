import { GraphConstants } from '../constants';
import { Point } from '../../constants/constants';

const setStartNode = (startNode?: Point) => ({
  type: GraphConstants.SET_START_NODE,
  message: startNode,
});

const setEndNode = (endNode?: Point) => ({
  type: GraphConstants.SET_END_NODE,
  message: endNode,
});

const setBridgeNode = (bridgeNode?: Point) => ({
  type: GraphConstants.SET_BRIDGE_NODE,
  message: bridgeNode,
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
  setBridgeNode,
  resetGraph,
  doneResetting,
  setSuccess,
};

export default graphActions;
