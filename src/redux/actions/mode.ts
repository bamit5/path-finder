import { ModeConstants } from '../constants';

const editing = () => ({
  type: ModeConstants.EDITING,
});

const solving = () => ({
  type: ModeConstants.SOLVING,
});

const solvedSuccess = () => ({
  type: ModeConstants.SOLVED_SUCCESS,
});

const solvedFailure = () => ({
  type: ModeConstants.SOLVED_FAILURE,
});

const setSolvingAlg = (alg: string) => ({
  type: ModeConstants.SET_SOLVING_ALG,
  message: alg,
});

const settingWallNodes = () => ({
  type: ModeConstants.SETTING_WALL_NODES,
});

const settingStartNode = () => ({
  type: ModeConstants.SETTING_START_NODE,
});

const settingEndNode = () => ({
  type: ModeConstants.SETTING_END_NODE,
});

const settingBridgeNodes = () => ({
  type: ModeConstants.SETTING_BRIDGE_NODES,
});

const modeActions = {
  editing,
  solving,
  solvedSuccess,
  solvedFailure,
  setSolvingAlg,
  settingWallNodes,
  settingStartNode,
  settingEndNode,
  settingBridgeNodes,
};

export default modeActions;
