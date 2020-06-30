import { GraphConstants } from '../constants';
import { NodeData } from '../../constants/constants';

const setStartNode = (startNode: NodeData) => ({
  type: GraphConstants.SET_START_NODE,
  message: startNode,
});

const resetStartNode = () => ({
  type: GraphConstants.SET_START_NODE,
  message: null,
});

const setEndNode = (endNode: NodeData) => ({
  type: GraphConstants.SET_END_NODE,
  message: endNode,
});

const resetEndNode = () => ({
  type: GraphConstants.SET_END_NODE,
  message: null,
});

const graphActions = {
  setStartNode,
  resetStartNode,
  setEndNode,
  resetEndNode,
};

export default graphActions;
