import { ChangeableNodeData, Point } from '../../constants/constants';
import { GraphConstants } from '../constants';

const setStartNode = (startNode: Point | null) => ({
  type: GraphConstants.SET_START_NODE,
  message: startNode,
});

const setEndNode = (endNode: Point | null) => ({
  type: GraphConstants.SET_END_NODE,
  message: endNode,
});

const initGraph = (width: number, height: number) => ({
  type: GraphConstants.INIT_GRAPH,
  message: { width, height },
});

// can only change type, visited, and taken properties. need x and y to find the node
const changeNode = (node: ChangeableNodeData) => ({
  type: GraphConstants.CHANGE_NODE,
  message: node,
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
  initGraph,
  changeNode,
  resetGraph,
  doneResetting,
  setSuccess,
};

export default graphActions;
