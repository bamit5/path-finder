import { ModeConstants } from '../constants';
import { ModeType } from '../constants/mode';

const setMode = (mode: ModeType) => ({
  type: mode,
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
  setMode,
  setSolvingAlg,
  settingWallNodes,
  settingStartNode,
  settingEndNode,
  settingBridgeNodes,
};

export default modeActions;
